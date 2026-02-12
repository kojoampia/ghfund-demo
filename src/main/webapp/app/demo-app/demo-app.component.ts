import { Component, signal, computed, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DemoService } from './demo-app.service';
import { UserRole, DashboardView, Project } from './demo-app.model';

@Component({
  selector: 'jhi-demo-app',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './demo-app.component.html',
  styleUrl: './demo-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DemoService],
})
export class DemoAppComponent implements OnInit {

  // --- UI STATE ---
  roles: UserRole[] = ['PUBLIC', 'INVESTOR', 'ADMIN', 'REGULATOR'];
  showCircles = signal(true);
  currentView = signal<DashboardView>('OVERVIEW');

  demoService: DemoService = inject(DemoService);
  // Signals from Service
  role = this.demoService.role;
  projects = this.demoService.projects;
  circles = this.demoService.circles;
  myCircles = this.demoService.myCircles;
  investments = this.demoService.investments;
  insights = this.demoService.insights;
  totalFundValue = this.demoService.totalFundValue;
  userPortfolio = this.demoService.userPortfolio;

  userName = computed(() => {
    switch (this.role()) {
      case 'INVESTOR':
        return 'Kwame Mensah';
      case 'ADMIN':
        return 'Officer J. Boateng';
      case 'REGULATOR':
        return 'Director K. Osei - BoG';
      default:
        return 'Guest Patriot';
    }
  });

  vettingCount = computed(() => this.projects().filter((p: Project) => p.status === 'VETTING').length);

  ngOnInit(): void {
    this.injectBranding();
  }

  setRole(newRole: UserRole): void {
    this.demoService.setRole(newRole);
    // Reset view to overview when switching roles
    this.currentView.set('OVERVIEW');
  }

  setView(view: DashboardView): void {
    this.currentView.set(view);
  }

  toggleCircles(): void {
    this.showCircles.update(v => !v);
  }

  approve(id: string): void {
    this.demoService.approveProject(id);
  }

  reject(id: string): void {
    this.demoService.rejectProject(id);
  }

  private injectBranding(): void {
    const icons = document.createElement('link');
    icons.rel = 'stylesheet';
    icons.href = 'https://fonts.googleapis.com/icon?family=Material+Icons&display=swap';
    document.head.appendChild(icons);

    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href =
      'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&family=Roboto+Mono:wght@400;700&family=Playfair+Display:wght@700&display=swap';
    document.head.appendChild(fonts);
  }
}

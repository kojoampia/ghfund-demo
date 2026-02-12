import { 
  Component, 
  signal, 
  computed, 
  inject, 
  OnInit,
  ChangeDetectionStrategy
} from '@angular/core';
import { 
  CommonModule, 
  CurrencyPipe, 
  DatePipe, 
  DecimalPipe 
} from '@angular/common';
import { DemoService } from './demo-service.service';
import { UserRole, DashboardView } from './demo-app.model';

@Component({
  selector: 'jhi-demo-app',
  standalone: true,
  imports: [
    CommonModule,
    CurrencyPipe,
    DatePipe,
    DecimalPipe
  ],
  templateUrl: './demo-app.component.html',
  styleUrl: './demo-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DemoAppComponent implements OnInit {
  private service = inject(DemoService);

  // --- UI STATE ---
  roles: UserRole[] = ['PUBLIC', 'INVESTOR', 'ADMIN', 'REGULATOR'];
  showCircles = signal(true); 
  currentView = signal<DashboardView>('OVERVIEW');

  // Signals from Service
  role = this.service.role;
  projects = this.service.projects;
  circles = this.service.circles;
  myCircles = this.service.myCircles;
  investments = this.service.investments;
  insights = this.service.insights;
  totalFundValue = this.service.totalFundValue;
  userPortfolio = this.service.userPortfolio;

  userName = computed(() => {
    switch (this.role()) {
      case 'INVESTOR': return 'Kwame Mensah';
      case 'ADMIN': return 'Officer J. Boateng';
      case 'REGULATOR': return 'Director K. Osei - BoG';
      default: return 'Guest Patriot';
    }
  });

  vettingCount = computed(() => this.projects().filter(p => p.status === 'VETTING').length);

  ngOnInit() {
  }

  setRole(newRole: UserRole) {
    this.service.setRole(newRole);
    // Reset view to overview when switching roles
    this.currentView.set('OVERVIEW');
  }

  setView(view: DashboardView) {
    this.currentView.set(view);
  }

  toggleCircles() {
    this.showCircles.update(v => !v);
  }

  approve(id: string) {
    this.service.approveProject(id);
  }

  reject(id: string) {
    this.service.rejectProject(id);
  }
}
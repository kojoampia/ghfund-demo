import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

// Layout Components
import { DashboardHeaderComponent } from './header/header.component';
import { DashboardSideNavComponent } from './sidenav/sidenav.component';
import { DashboardFooterComponent } from './footer/footer.component';

// Feature Components
import { AdminDashboardComponent } from './admin/admin.component';
import { DashboardView, UserRole } from './dashboard.model';
import { DashboardService } from './dashboard.service';
import { InvestorDashboardComponent } from './investor/investor.component';
import { PublicDashboardComponent } from './public/public.component';
import { RegulatorDashboardComponent } from './regulator/regulator.component';

@Component({
  selector: 'jhi-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    DashboardHeaderComponent,
    DashboardSideNavComponent,
    DashboardFooterComponent,
    PublicDashboardComponent,
    InvestorDashboardComponent,
    AdminDashboardComponent,
    RegulatorDashboardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  providers: [DashboardService],
})
export default class DashboardComponent {
  service = inject(DashboardService);

  // UI State
  isNavOpen = signal(true);
  currentView = signal<DashboardView>('OVERVIEW');

  // Service Signals
  role = this.service.role;

  // Computed User Name Logic
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

  setRole(newRole: UserRole): void {
    this.service.setRole(newRole);
    this.currentView.set('OVERVIEW');
  }

  setView(view: DashboardView): void {
    this.currentView.set(view);
  }

  toggleNav(): void {
    this.isNavOpen.update(v => !v);
  }
}

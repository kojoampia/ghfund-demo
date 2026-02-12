import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardView, UserRole } from '../dashboard.model';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'jhi-dashboard-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss',
  providers: [DashboardService],
})
export class DashboardSideNavComponent {
  isVisible = input.required<boolean>();
  role = input.required<UserRole>();
  currentView = input.required<DashboardView>();
  changeView = output<DashboardView>();

  service: DashboardService = inject(DashboardService);
  // Data from service
  circles = this.service.circles;
  vettingCount = this.service.vettingCount;
  showCircles = signal(true);

  toggleCircles(): void {
    this.showCircles.update(selected => !selected);
  }
}

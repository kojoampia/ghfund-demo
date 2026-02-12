import { Component, inject, input } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { DashboardService } from '../dashboard.service';
import { DashboardView } from '../dashboard.model';

@Component({
  selector: 'jhi-investor-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './investor.component.html',
  styleUrl: './investor.component.scss',
  providers: [DashboardService],
})
export class InvestorDashboardComponent {
  service = inject(DashboardService);
  // Receives the current view state from the shell
  currentView = input.required<DashboardView>();
}

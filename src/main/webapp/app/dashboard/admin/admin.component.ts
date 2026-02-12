import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'jhi-admin-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
  providers: [DashboardService],
})
export class AdminDashboardComponent {
  service = inject(DashboardService);
}

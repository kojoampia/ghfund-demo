import { Component, inject, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'jhi-public-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './public.component.html',
  styleUrl: './public.component.scss',
  providers: [DashboardService],
})
export class PublicDashboardComponent {
  service = inject(DashboardService);
}

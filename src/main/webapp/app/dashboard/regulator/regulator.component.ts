import { Component, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DashboardService } from '../dashboard.service';
@Component({
  selector: 'jhi-regulator-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './regulator.component.html',
  styleUrl: './regulator.component.scss',
  providers: [DashboardService],
})
export class RegulatorDashboardComponent {
  service = inject(DashboardService);
}

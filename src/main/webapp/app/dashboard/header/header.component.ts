import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRole } from '../dashboard.model';

@Component({
  selector: 'jhi-dashboard-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHeaderComponent {
  role = input.required<UserRole>();
  userName = input.required<string>();
  toggleNav = output();
  changeRole = output<UserRole>();

  roles: UserRole[] = ['PUBLIC', 'INVESTOR', 'ADMIN', 'REGULATOR'];

  onToggle(): void {
    this.toggleNav.emit();
  }
}

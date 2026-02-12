import { Injectable, signal, computed } from '@angular/core';
import { Circle, Investment, Project, UserRole } from './dashboard.model';

// --- SOVEREIGN STATE SERVICE ---
@Injectable({ providedIn: 'root' })
export class DashboardService {
  role = signal<UserRole>('PUBLIC');
  projects = signal<Project[]>([
    {
      id: 'PRJ-01',
      name: 'Northern Solar Grid',
      sector: 'Infrastructure',
      status: 'ACTIVE',
      targetAmount: 50000000,
      currentRaised: 39000000,
      impactScore: 94,
    },
    {
      id: 'PRJ-02',
      name: 'Accra Tech Hub',
      sector: 'Tech',
      status: 'VETTING',
      targetAmount: 25000000,
      currentRaised: 12000000,
      impactScore: 88,
    },
    {
      id: 'PRJ-03',
      name: 'Kumasi Agro-Plex',
      sector: 'Agriculture',
      status: 'ACTIVE',
      targetAmount: 15000000,
      currentRaised: 7000000,
      impactScore: 91,
    },
    {
      id: 'PRJ-04',
      name: 'Volta Digital Backbone',
      sector: 'Tech',
      status: 'VETTING',
      targetAmount: 10000000,
      currentRaised: 0,
      impactScore: 82,
    },
  ]);

  vettingCount = computed(() => this.projects().filter((p: Project) => p.status === 'VETTING').length);
  circles = signal<Circle[]>([
    { id: 'C-01', name: 'London Techies for Volta', members: 52, impact: 85, focus: 'Tech' },
    { id: 'C-03', name: 'Toronto Agro Alliance', members: 64, impact: 72, focus: 'Agriculture' },
  ]);

  myCircles = signal<Circle[]>([{ id: 'C-02', name: 'Chicago Med Diaspora', members: 128, impact: 98, focus: 'Health' }]);

  investments = signal<Investment[]>([
    {
      id: 'INV-101',
      project: 'Northern Solar Grid',
      amount: 5000,
      date: new Date(2025, 10, 12),
      roi: 8.4,
      status: 'ACTIVE',
      hash: 'sha256_b3a2...',
    },
    {
      id: 'INV-102',
      project: 'Kumasi Agro-Plex',
      amount: 2500,
      date: new Date(2025, 11, 5),
      roi: 9.2,
      status: 'ACTIVE',
      hash: 'sha256_f8e1...',
    },
    {
      id: 'INV-103',
      project: 'Accra Tech Hub',
      amount: 1200,
      date: new Date(2026, 0, 15),
      roi: 0,
      status: 'PENDING',
      hash: 'sha256_c2d4...',
    },
  ]);

  insights = signal([
    'Predictive Yield: Agriculture projects in Bono region expected to rise 12% in Q3.',
    'Risk Alert: Infrastructure liquidity buffer adjusted for inflation resilience.',
    'Circle Success: Chicago Med Diaspora reached #1 National Impact rank.',
  ]);

  totalFundValue = computed(() => this.projects().reduce((acc, p) => acc + p.currentRaised, 0));
  userPortfolio = computed(() => this.investments().reduce((acc, i) => acc + i.amount, 0));

  setRole(newRole: UserRole): void {
    this.role.set(newRole);
  }

  approveProject(id: string): void {
    this.projects.update(projects => projects.map(p => (p.id === id ? { ...p, status: 'ACTIVE' as const } : p)));
    this.insights.update(i => [`System Log: Project ${id} approved.`, ...i.slice(0, 2)]);
  }

  rejectProject(id: string): void {
    this.projects.update(projects => projects.map(p => (p.id === id ? { ...p, status: 'CLOSED' as const } : p)));
    this.insights.update(i => [`Security Alert: Project ${id} vetting failed.`, ...i.slice(0, 2)]);
  }
}

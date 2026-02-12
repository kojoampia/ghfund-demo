import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'authority',
    data: { pageTitle: 'appDemoApp.adminAuthority.home.title' },
    loadChildren: () => import('./admin/authority/authority.routes'),
  },
  {
    path: 'project',
    data: { pageTitle: 'appDemoApp.project.home.title' },
    loadChildren: () => import('./project/project.routes'),
  },
  {
    path: 'circle',
    data: { pageTitle: 'appDemoApp.circle.home.title' },
    loadChildren: () => import('./circle/circle.routes'),
  },
  {
    path: 'investment',
    data: { pageTitle: 'appDemoApp.investment.home.title' },
    loadChildren: () => import('./investment/investment.routes'),
  },
  /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
];

export default routes;

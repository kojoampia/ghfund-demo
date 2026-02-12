import { Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { ASC } from 'app/config/navigation.constants';
import CircleResolve from './route/circle-routing-resolve.service';

const circleRoute: Routes = [
  {
    path: '',
    loadComponent: () => import('./list/circle.component').then(m => m.CircleComponent),
    data: {
      defaultSort: `id,${ASC}`,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    loadComponent: () => import('./detail/circle-detail.component').then(m => m.CircleDetailComponent),
    resolve: {
      circle: CircleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    loadComponent: () => import('./update/circle-update.component').then(m => m.CircleUpdateComponent),
    resolve: {
      circle: CircleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./update/circle-update.component').then(m => m.CircleUpdateComponent),
    resolve: {
      circle: CircleResolve,
    },
    canActivate: [UserRouteAccessService],
  },
];

export default circleRoute;

import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { ICircle } from '../circle.model';
import { CircleService } from '../service/circle.service';

const circleResolve = (route: ActivatedRouteSnapshot): Observable<null | ICircle> => {
  const id = route.params.id;
  if (id) {
    return inject(CircleService)
      .find(id)
      .pipe(
        mergeMap((circle: HttpResponse<ICircle>) => {
          if (circle.body) {
            return of(circle.body);
          }
          inject(Router).navigate(['404']);
          return EMPTY;
        }),
      );
  }
  return of(null);
};

export default circleResolve;

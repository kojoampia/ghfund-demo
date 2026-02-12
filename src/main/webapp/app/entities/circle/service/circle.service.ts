import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { ICircle, NewCircle } from '../circle.model';

export type PartialUpdateCircle = Partial<ICircle> & Pick<ICircle, 'id'>;

export type EntityResponseType = HttpResponse<ICircle>;
export type EntityArrayResponseType = HttpResponse<ICircle[]>;

@Injectable({ providedIn: 'root' })
export class CircleService {
  protected readonly http = inject(HttpClient);
  protected readonly applicationConfigService = inject(ApplicationConfigService);

  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/circles');

  create(circle: NewCircle): Observable<EntityResponseType> {
    return this.http.post<ICircle>(this.resourceUrl, circle, { observe: 'response' });
  }

  update(circle: ICircle): Observable<EntityResponseType> {
    return this.http.put<ICircle>(`${this.resourceUrl}/${this.getCircleIdentifier(circle)}`, circle, { observe: 'response' });
  }

  partialUpdate(circle: PartialUpdateCircle): Observable<EntityResponseType> {
    return this.http.patch<ICircle>(`${this.resourceUrl}/${this.getCircleIdentifier(circle)}`, circle, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICircle>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICircle[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  getCircleIdentifier(circle: Pick<ICircle, 'id'>): number {
    return circle.id;
  }

  compareCircle(o1: Pick<ICircle, 'id'> | null, o2: Pick<ICircle, 'id'> | null): boolean {
    return o1 && o2 ? this.getCircleIdentifier(o1) === this.getCircleIdentifier(o2) : o1 === o2;
  }

  addCircleToCollectionIfMissing<Type extends Pick<ICircle, 'id'>>(
    circleCollection: Type[],
    ...circlesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const circles: Type[] = circlesToCheck.filter(isPresent);
    if (circles.length > 0) {
      const circleCollectionIdentifiers = circleCollection.map(circleItem => this.getCircleIdentifier(circleItem));
      const circlesToAdd = circles.filter(circleItem => {
        const circleIdentifier = this.getCircleIdentifier(circleItem);
        if (circleCollectionIdentifiers.includes(circleIdentifier)) {
          return false;
        }
        circleCollectionIdentifiers.push(circleIdentifier);
        return true;
      });
      return [...circlesToAdd, ...circleCollection];
    }
    return circleCollection;
  }
}

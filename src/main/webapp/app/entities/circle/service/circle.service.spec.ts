import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { ICircle } from '../circle.model';
import { sampleWithFullData, sampleWithNewData, sampleWithPartialData, sampleWithRequiredData } from '../circle.test-samples';

import { CircleService } from './circle.service';

const requireRestSample: ICircle = {
  ...sampleWithRequiredData,
};

describe('Circle Service', () => {
  let service: CircleService;
  let httpMock: HttpTestingController;
  let expectedResult: ICircle | ICircle[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    expectedResult = null;
    service = TestBed.inject(CircleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a Circle', () => {
      const circle = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(circle).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Circle', () => {
      const circle = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(circle).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Circle', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Circle', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Circle', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCircleToCollectionIfMissing', () => {
      it('should add a Circle to an empty array', () => {
        const circle: ICircle = sampleWithRequiredData;
        expectedResult = service.addCircleToCollectionIfMissing([], circle);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(circle);
      });

      it('should not add a Circle to an array that contains it', () => {
        const circle: ICircle = sampleWithRequiredData;
        const circleCollection: ICircle[] = [
          {
            ...circle,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCircleToCollectionIfMissing(circleCollection, circle);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Circle to an array that doesn't contain it", () => {
        const circle: ICircle = sampleWithRequiredData;
        const circleCollection: ICircle[] = [sampleWithPartialData];
        expectedResult = service.addCircleToCollectionIfMissing(circleCollection, circle);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(circle);
      });

      it('should add only unique Circle to an array', () => {
        const circleArray: ICircle[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const circleCollection: ICircle[] = [sampleWithRequiredData];
        expectedResult = service.addCircleToCollectionIfMissing(circleCollection, ...circleArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const circle: ICircle = sampleWithRequiredData;
        const circle2: ICircle = sampleWithPartialData;
        expectedResult = service.addCircleToCollectionIfMissing([], circle, circle2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(circle);
        expect(expectedResult).toContain(circle2);
      });

      it('should accept null and undefined values', () => {
        const circle: ICircle = sampleWithRequiredData;
        expectedResult = service.addCircleToCollectionIfMissing([], null, circle, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(circle);
      });

      it('should return initial array if no Circle is added', () => {
        const circleCollection: ICircle[] = [sampleWithRequiredData];
        expectedResult = service.addCircleToCollectionIfMissing(circleCollection, undefined, null);
        expect(expectedResult).toEqual(circleCollection);
      });
    });

    describe('compareCircle', () => {
      it('should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCircle(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('should return false if one entity is null', () => {
        const entity1 = { id: 18078 };
        const entity2 = null;

        const compareResult1 = service.compareCircle(entity1, entity2);
        const compareResult2 = service.compareCircle(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey differs', () => {
        const entity1 = { id: 18078 };
        const entity2 = { id: 9600 };

        const compareResult1 = service.compareCircle(entity1, entity2);
        const compareResult2 = service.compareCircle(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('should return false if primaryKey matches', () => {
        const entity1 = { id: 18078 };
        const entity2 = { id: 18078 };

        const compareResult1 = service.compareCircle(entity1, entity2);
        const compareResult2 = service.compareCircle(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});

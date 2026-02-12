import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../circle.test-samples';

import { CircleFormService } from './circle-form.service';

describe('Circle Form Service', () => {
  let service: CircleFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CircleFormService);
  });

  describe('Service methods', () => {
    describe('createCircleFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCircleFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            members: expect.any(Object),
            impact: expect.any(Object),
            focus: expect.any(Object),
          }),
        );
      });

      it('passing ICircle should create a new form with FormGroup', () => {
        const formGroup = service.createCircleFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            name: expect.any(Object),
            members: expect.any(Object),
            impact: expect.any(Object),
            focus: expect.any(Object),
          }),
        );
      });
    });

    describe('getCircle', () => {
      it('should return NewCircle for default Circle initial value', () => {
        const formGroup = service.createCircleFormGroup(sampleWithNewData);

        const circle = service.getCircle(formGroup) as any;

        expect(circle).toMatchObject(sampleWithNewData);
      });

      it('should return NewCircle for empty Circle initial value', () => {
        const formGroup = service.createCircleFormGroup();

        const circle = service.getCircle(formGroup) as any;

        expect(circle).toMatchObject({});
      });

      it('should return ICircle', () => {
        const formGroup = service.createCircleFormGroup(sampleWithRequiredData);

        const circle = service.getCircle(formGroup) as any;

        expect(circle).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICircle should not enable id FormControl', () => {
        const formGroup = service.createCircleFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCircle should disable id FormControl', () => {
        const formGroup = service.createCircleFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { CircleService } from '../service/circle.service';
import { ICircle } from '../circle.model';
import { CircleFormService } from './circle-form.service';

import { CircleUpdateComponent } from './circle-update.component';

describe('Circle Management Update Component', () => {
  let comp: CircleUpdateComponent;
  let fixture: ComponentFixture<CircleUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let circleFormService: CircleFormService;
  let circleService: CircleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CircleUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CircleUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CircleUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    circleFormService = TestBed.inject(CircleFormService);
    circleService = TestBed.inject(CircleService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('should update editForm', () => {
      const circle: ICircle = { id: 9600 };

      activatedRoute.data = of({ circle });
      comp.ngOnInit();

      expect(comp.circle).toEqual(circle);
    });
  });

  describe('save', () => {
    it('should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICircle>>();
      const circle = { id: 18078 };
      jest.spyOn(circleFormService, 'getCircle').mockReturnValue(circle);
      jest.spyOn(circleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ circle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: circle }));
      saveSubject.complete();

      // THEN
      expect(circleFormService.getCircle).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(circleService.update).toHaveBeenCalledWith(expect.objectContaining(circle));
      expect(comp.isSaving).toEqual(false);
    });

    it('should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICircle>>();
      const circle = { id: 18078 };
      jest.spyOn(circleFormService, 'getCircle').mockReturnValue({ id: null });
      jest.spyOn(circleService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ circle: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: circle }));
      saveSubject.complete();

      // THEN
      expect(circleFormService.getCircle).toHaveBeenCalled();
      expect(circleService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICircle>>();
      const circle = { id: 18078 };
      jest.spyOn(circleService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ circle });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(circleService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});

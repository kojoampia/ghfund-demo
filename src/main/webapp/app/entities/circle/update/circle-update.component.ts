import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICircle } from '../circle.model';
import { CircleService } from '../service/circle.service';
import { CircleFormGroup, CircleFormService } from './circle-form.service';

@Component({
  selector: 'jhi-circle-update',
  templateUrl: './circle-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CircleUpdateComponent implements OnInit {
  isSaving = false;
  circle: ICircle | null = null;

  protected circleService = inject(CircleService);
  protected circleFormService = inject(CircleFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CircleFormGroup = this.circleFormService.createCircleFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ circle }) => {
      this.circle = circle;
      if (circle) {
        this.updateForm(circle);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const circle = this.circleFormService.getCircle(this.editForm);
    if (circle.id !== null) {
      this.subscribeToSaveResponse(this.circleService.update(circle));
    } else {
      this.subscribeToSaveResponse(this.circleService.create(circle));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICircle>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(circle: ICircle): void {
    this.circle = circle;
    this.circleFormService.resetForm(this.editForm, circle);
  }
}

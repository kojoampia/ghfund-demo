import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICircle, NewCircle } from '../circle.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICircle for edit and NewCircleFormGroupInput for create.
 */
type CircleFormGroupInput = ICircle | PartialWithRequiredKeyOf<NewCircle>;

type CircleFormDefaults = Pick<NewCircle, 'id'>;

type CircleFormGroupContent = {
  id: FormControl<ICircle['id'] | NewCircle['id']>;
  name: FormControl<ICircle['name']>;
  members: FormControl<ICircle['members']>;
  impact: FormControl<ICircle['impact']>;
  focus: FormControl<ICircle['focus']>;
};

export type CircleFormGroup = FormGroup<CircleFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CircleFormService {
  createCircleFormGroup(circle: CircleFormGroupInput = { id: null }): CircleFormGroup {
    const circleRawValue = {
      ...this.getFormDefaults(),
      ...circle,
    };
    return new FormGroup<CircleFormGroupContent>({
      id: new FormControl(
        { value: circleRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      name: new FormControl(circleRawValue.name, {
        validators: [Validators.required],
      }),
      members: new FormControl(circleRawValue.members),
      impact: new FormControl(circleRawValue.impact),
      focus: new FormControl(circleRawValue.focus),
    });
  }

  getCircle(form: CircleFormGroup): ICircle | NewCircle {
    return form.getRawValue() as ICircle | NewCircle;
  }

  resetForm(form: CircleFormGroup, circle: CircleFormGroupInput): void {
    const circleRawValue = { ...this.getFormDefaults(), ...circle };
    form.reset(
      {
        ...circleRawValue,
        id: { value: circleRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CircleFormDefaults {
    return {
      id: null,
    };
  }
}

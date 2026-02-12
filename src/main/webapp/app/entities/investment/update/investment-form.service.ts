import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { IInvestment, NewInvestment } from '../investment.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IInvestment for edit and NewInvestmentFormGroupInput for create.
 */
type InvestmentFormGroupInput = IInvestment | PartialWithRequiredKeyOf<NewInvestment>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends IInvestment | NewInvestment> = Omit<T, 'date'> & {
  date?: string | null;
};

type InvestmentFormRawValue = FormValueOf<IInvestment>;

type NewInvestmentFormRawValue = FormValueOf<NewInvestment>;

type InvestmentFormDefaults = Pick<NewInvestment, 'id' | 'date'>;

type InvestmentFormGroupContent = {
  id: FormControl<InvestmentFormRawValue['id'] | NewInvestment['id']>;
  project: FormControl<InvestmentFormRawValue['project']>;
  amount: FormControl<InvestmentFormRawValue['amount']>;
  date: FormControl<InvestmentFormRawValue['date']>;
  roi: FormControl<InvestmentFormRawValue['roi']>;
  status: FormControl<InvestmentFormRawValue['status']>;
  hash: FormControl<InvestmentFormRawValue['hash']>;
};

export type InvestmentFormGroup = FormGroup<InvestmentFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class InvestmentFormService {
  createInvestmentFormGroup(investment: InvestmentFormGroupInput = { id: null }): InvestmentFormGroup {
    const investmentRawValue = this.convertInvestmentToInvestmentRawValue({
      ...this.getFormDefaults(),
      ...investment,
    });
    return new FormGroup<InvestmentFormGroupContent>({
      id: new FormControl(
        { value: investmentRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      project: new FormControl(investmentRawValue.project, {
        validators: [Validators.required],
      }),
      amount: new FormControl(investmentRawValue.amount),
      date: new FormControl(investmentRawValue.date),
      roi: new FormControl(investmentRawValue.roi),
      status: new FormControl(investmentRawValue.status),
      hash: new FormControl(investmentRawValue.hash),
    });
  }

  getInvestment(form: InvestmentFormGroup): IInvestment | NewInvestment {
    return this.convertInvestmentRawValueToInvestment(form.getRawValue() as InvestmentFormRawValue | NewInvestmentFormRawValue);
  }

  resetForm(form: InvestmentFormGroup, investment: InvestmentFormGroupInput): void {
    const investmentRawValue = this.convertInvestmentToInvestmentRawValue({ ...this.getFormDefaults(), ...investment });
    form.reset(
      {
        ...investmentRawValue,
        id: { value: investmentRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): InvestmentFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      date: currentTime,
    };
  }

  private convertInvestmentRawValueToInvestment(
    rawInvestment: InvestmentFormRawValue | NewInvestmentFormRawValue,
  ): IInvestment | NewInvestment {
    return {
      ...rawInvestment,
      date: dayjs(rawInvestment.date, DATE_TIME_FORMAT),
    };
  }

  private convertInvestmentToInvestmentRawValue(
    investment: IInvestment | (Partial<NewInvestment> & InvestmentFormDefaults),
  ): InvestmentFormRawValue | PartialWithRequiredKeyOf<NewInvestmentFormRawValue> {
    return {
      ...investment,
      date: investment.date ? investment.date.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}

import dayjs from 'dayjs/esm';

import { IInvestment, NewInvestment } from './investment.model';

export const sampleWithRequiredData: IInvestment = {
  id: 18893,
  project: 'well-made a brr',
};

export const sampleWithPartialData: IInvestment = {
  id: 1843,
  project: 'overdue',
  amount: 7818.15,
  date: dayjs('2026-01-22T02:37'),
  status: 'overproduce but',
  hash: 'ideal disconnection around',
};

export const sampleWithFullData: IInvestment = {
  id: 20614,
  project: 'poetry',
  amount: 8291.31,
  date: dayjs('2026-01-22T07:24'),
  roi: 7103.31,
  status: 'whoever yesterday',
  hash: 'qua gerbil proselytise',
};

export const sampleWithNewData: NewInvestment = {
  project: 'entire',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

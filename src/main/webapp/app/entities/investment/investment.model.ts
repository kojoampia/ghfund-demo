import dayjs from 'dayjs/esm';

export interface IInvestment {
  id: number;
  project?: string | null;
  amount?: number | null;
  date?: dayjs.Dayjs | null;
  roi?: number | null;
  status?: string | null;
  hash?: string | null;
}

export type NewInvestment = Omit<IInvestment, 'id'> & { id: null };

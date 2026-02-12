export interface ICircle {
  id: number;
  name?: string | null;
  members?: number | null;
  impact?: number | null;
  focus?: string | null;
}

export type NewCircle = Omit<ICircle, 'id'> & { id: null };

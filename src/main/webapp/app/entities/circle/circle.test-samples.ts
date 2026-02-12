import { ICircle, NewCircle } from './circle.model';

export const sampleWithRequiredData: ICircle = {
  id: 27670,
  name: 'er',
};

export const sampleWithPartialData: ICircle = {
  id: 16626,
  name: 'tomorrow state excitedly',
  members: 17974,
  impact: 31856,
};

export const sampleWithFullData: ICircle = {
  id: 14166,
  name: 'swing',
  members: 25507,
  impact: 9054,
  focus: 'orient zowie intelligent',
};

export const sampleWithNewData: NewCircle = {
  name: 'private inconsequential',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

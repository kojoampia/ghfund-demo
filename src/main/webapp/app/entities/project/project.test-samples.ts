import { IProject, NewProject } from './project.model';

export const sampleWithRequiredData: IProject = {
  id: 22823,
  name: 'anxiously',
};

export const sampleWithPartialData: IProject = {
  id: 12852,
  name: 'likewise',
  status: 'ACTIVE',
};

export const sampleWithFullData: IProject = {
  id: 1375,
  name: 'tray pack hydrolyze',
  sector: 'as',
  status: 'ACTIVE',
  targetAmount: 31211.11,
  currentRaised: 9208.83,
  impactScore: 29006,
};

export const sampleWithNewData: NewProject = {
  name: 'zowie vice',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);

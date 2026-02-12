import { ProjectStatus } from 'app/entities/enumerations/project-status.model';

export interface IProject {
  id: number;
  name?: string | null;
  sector?: string | null;
  status?: keyof typeof ProjectStatus | null;
  targetAmount?: number | null;
  currentRaised?: number | null;
  impactScore?: number | null;
}

export type NewProject = Omit<IProject, 'id'> & { id: null };

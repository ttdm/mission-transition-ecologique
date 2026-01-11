import { ProjectType } from './shared'

export interface DataProject
  extends Omit<
    ProjectType,
    'themes' | 'mainTheme' | 'linkedProjects' | 'programs' | 'countEligiblePrograms' | 'redirection-vers' | 'Statut'
  > {
  themes: string[]
  mainTheme: string
  linkedProjects: number[]
  programs: string[]
  redirectTo?: number
  status: ProjectStatus
  Nom: string
  priorite?: number
  code_naf?: string[]
}

export enum ProjectStatus {
  InProd = 'En prod',
  Archived = 'Remplacé',
  Others = 'autre'
}

export const sortProjectsByPriority = (projects: DataProject[]): DataProject[] => {
  return [...projects].sort((a, b) => {
    const prioA = typeof a.priorite === 'number' ? a.priorite : 999
    const prioB = typeof b.priorite === 'number' ? b.priorite : 999
    return prioA - prioB
  })
}

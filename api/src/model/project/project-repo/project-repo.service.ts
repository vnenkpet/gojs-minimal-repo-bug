import { Injectable } from '@nestjs/common';
import { IdentityService } from 'src/shared/identity/identity/identity.service';
import { v4 } from 'uuid';
import { ProjectIdentityService } from 'src/shared/identity/project-identity/project-identity.service';

export enum UserRole {
  owner = 'owner',
  admin = 'admin',
  viewer = 'viewer',
}

const collection: IProject[] = [
  {
    // access info
    id: 'testProjectId',
    dsn: 'testProjectDsn',
    name: 'Test Project',
    createdAt: new Date(),

    // access info
    users: [{ id: '346', role: UserRole.owner }],

    // core data
    nodes: [],
    edges: [],
    isPublic: true,
  },
];

export interface ProjectDto {
  name: string;
}

export interface IProject {
  // access info
  id: string;
  dsn: string;
  name: string;
  createdAt: Date;

  // access info
  users: IProjectUser[];

  // core data
  nodes: IProjectNode[];
  edges: IProjectEdge[];

  isPublic: boolean;
}

export interface IProjectUser {
  id: string; // user id
  role: UserRole;
}

export interface IProjectNode {
  uniqueName: string;
  displayName?: string;
  description?: string;
}
export interface IProjectEdge {
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
}

@Injectable()
export class ProjectRepoService {
  constructor(
    private readonly identity: IdentityService,
    private readonly projectIdentity: ProjectIdentityService,
  ) {}

  async create(dto: ProjectDto): Promise<IProject> {
    const project: IProject = {
      id: v4(),
      dsn: v4(),
      name: dto.name,
      createdAt: new Date(),
      users: [{ id: this.identity.user.id, role: UserRole.owner }],
      nodes: [],
      edges: [],
      isPublic: false,
    };

    collection.push(project);
    return project;
  }

  async getByDsn(dsn: string): Promise<IProject> {
    return collection.find(project => project.dsn === dsn);
  }

  async captureRequest(data: { from: string; to: string }): Promise<void> {
    const project = this.projectIdentity.project;

    const existingEdge = project.edges.find(
      edge => edge.sourceNodeId === data.from && edge.targetNodeId === data.to,
    );

    // todo push update;

    if (existingEdge) return;

    project.edges.push({
      id: v4(),
      sourceNodeId: data.from,
      targetNodeId: data.to,
    });

    // add missing nodes
    !project.nodes.find(node => node.uniqueName === data.from) &&
      project.nodes.push({ uniqueName: data.from });

    !project.nodes.find(node => node.uniqueName === data.to) &&
      project.nodes.push({ uniqueName: data.to });
  }
}

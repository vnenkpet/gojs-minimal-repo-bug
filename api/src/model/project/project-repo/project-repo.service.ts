import { Injectable } from '@nestjs/common';
import { IdentityService } from 'src/shared/identity/identity/identity.service';
import { v4 } from 'uuid';
import { ProjectIdentityService } from 'src/shared/identity/project-identity/project-identity.service';
import { IProject, UserRole } from '../interfaces/project.interface';
import { ProjectDto } from 'src/api/rest-api/request/dto/project.dto';

const collection: IProject[] = [
  {
    // access info
    id: 'sampleProjectId',
    dsn: 'sampleProjectDsn',
    name: 'Sample Project',
    createdAt: new Date(),

    // access info
    users: [{ id: '346', role: UserRole.owner }],

    // core data
    nodes: [
      { uniqueName: 'service-a' },
      { uniqueName: 'service-b' },
      { uniqueName: 'service-c' },
    ],
    edges: [
      { id: '123', sourceNodeId: 'service-a', targetNodeId: 'service-b' },
      { id: '346', sourceNodeId: 'service-a', targetNodeId: 'service-c' },
      { id: '789', sourceNodeId: 'service-b', targetNodeId: 'service-a' },
      { id: '012', sourceNodeId: 'service-a', targetNodeId: 'service-a' },
    ],
    isPublic: true,
  },
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

  async getById(id: string): Promise<IProject> {
    return collection.find(project => project.id === id);
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

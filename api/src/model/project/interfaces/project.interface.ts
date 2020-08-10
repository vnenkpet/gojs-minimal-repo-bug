export enum UserRole {
    owner = 'owner',
    admin = 'admin',
    viewer = 'viewer',
  }
  
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
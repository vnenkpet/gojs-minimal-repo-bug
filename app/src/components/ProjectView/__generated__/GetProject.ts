/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { UserRole } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: GetProject
// ====================================================

export interface GetProject_project_edges {
  __typename: "ProjectEdge";
  id: string;
  sourceNodeId: string;
  targetNodeId: string;
}

export interface GetProject_project_nodes {
  __typename: "ProjectNode";
  uniqueName: string;
}

export interface GetProject_project_users {
  __typename: "ProjectUser";
  id: string;
  role: UserRole;
}

export interface GetProject_project {
  __typename: "Project";
  id: string;
  name: string;
  createdAt: any;
  edges: GetProject_project_edges[];
  nodes: GetProject_project_nodes[];
  users: GetProject_project_users[];
}

export interface GetProject {
  project: GetProject_project;
}

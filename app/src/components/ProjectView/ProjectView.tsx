import React from "react";

import { useQuery, gql } from "@apollo/client";
import { GetProject } from "./__generated__/GetProject";
import { ProjectDiagram } from "../ProjectDiagram/ProjectDiagram";

const GET_PROJECT = gql`
  query GetProject {
    project(id: "testProjectId") {
      id
      name
      createdAt
      edges {
        id
        sourceNodeId
        targetNodeId
      }
      nodes {
        uniqueName
      }
      users {
        id
        role
      }
    }
  }
`;

export function ProjectView() {
  const { loading, error, data } = useQuery<GetProject>(GET_PROJECT);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { name } = data!.project;
  return (
    <>
      <h1>{name}</h1>
      <ProjectDiagram project={data!.project} />
    </>
  );
}

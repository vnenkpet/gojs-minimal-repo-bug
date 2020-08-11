import React from "react";

import { useQuery, gql } from "@apollo/client";
import { GetProject } from "./__generated__/GetProject";
import { ProjectDiagram } from "../ProjectDiagram/ProjectDiagram";
import { CaptureRequestForm } from "../CaptureRequestForm/CaptureRequestForm";

export const GET_PROJECT = gql`
  query GetProject($id: String!) {
    project(id: $id) {
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
  const { loading, error, data } = useQuery<GetProject>(GET_PROJECT, {
    variables: { id: "sampleProjectId" },
    pollInterval: 500,
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  if (data) {
    console.log("Received data");
    console.log(data);
  }
  const { name } = data!.project;
  return (
    <>
      <h1>{name}</h1>
      <CaptureRequestForm />
      <ProjectDiagram project={data!.project} />
    </>
  );
}

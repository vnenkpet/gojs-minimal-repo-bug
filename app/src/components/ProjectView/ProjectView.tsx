import React, { useState } from "react";
import { ProjectDiagram } from "../ProjectDiagram/ProjectDiagram";

export type Project = {
  nodes: { uniqueName: string }[];
  edges: { id: string; sourceNodeId: string; targetNodeId: string }[];
};

export function ProjectView() {
  const [project, setProject] = useState<Project>({
    nodes: [{ uniqueName: "a" }, { uniqueName: "b" }],
    edges: [{ id: "1", sourceNodeId: "a", targetNodeId: "b" }],
  });

  return (
    <>
      <h1>Test</h1>
      <button
        onClick={() => {
          setProject({
            nodes: [
              { uniqueName: "a" },
              { uniqueName: "b" },
              { uniqueName: "c" },
            ],
            edges: [
              { id: "1", sourceNodeId: "a", targetNodeId: "b" },
              { id: "2", sourceNodeId: "b", targetNodeId: "a" },
            ],
          });
        }}
      >
        Add node
      </button>

      <ProjectDiagram project={project} />
    </>
  );
}

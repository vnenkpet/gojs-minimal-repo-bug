// App.js
import React from "react";

import * as go from "gojs";
import { ReactDiagram } from "gojs-react";
import { GetProject } from "../ProjectView/__generated__/GetProject";

// ...

/**
 * Diagram initialization method, which is passed to the ReactDiagram component.
 * This method is responsible for making the diagram and initializing the model and any templates.
 * The model's data should not be set here, as the ReactDiagram component handles that via the other props.
 */
function initDiagram() {
  const $ = go.GraphObject.make;
  // set your license key here before creating the diagram: go.Diagram.licenseKey = "...";
  const diagram = $(go.Diagram, {
    "undoManager.isEnabled": true, // must be set to allow for model change listening
    // 'undoManager.maxHistoryLength': 0,  // uncomment disable undo/redo functionality
    autoScale: go.Diagram.Uniform,
    layout: $(go.ForceDirectedLayout, {
      defaultSpringLength: 40, // forces nodes closer together (default: 50)
      defaultSpringStiffness: 0.05, // forces nodes closer together (default: 0.05)
      isOngoing: false,
      isRealtime: false,
    }),
    model: $(go.GraphLinksModel, {
      linkKeyProperty: "key", // IMPORTANT! must be defined for merges and data sync when using GraphLinksModel
    }),
  });

  diagram.linkTemplate = $(
    go.Link,
    {
      opacity: 0.8,
      routing: go.Link.AvoidsNodes,
      corner: 15,
    },
    $(go.Shape, { stroke: "white" }),
    $(go.Shape, { stroke: "white", toArrow: "OpenTriangle" }),
    {
      selectionAdornmentTemplate: $(
        go.Adornment,
        $(go.Shape, { isPanelMain: true, stroke: "whie", strokeWidth: 2 }),
        $(go.Shape, {
          toArrow: "OpenTriangle",
          fill: "white",
          stroke: "white",
        })
      ), // end Adornment
    }
  );

  // define a simple Node template
  diagram.nodeTemplate = $(
    go.Node,
    "Auto", // the Shape will go around the TextBlock
    new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
      go.Point.stringify
    ),
    $(
      go.Shape,
      "RoundedRectangle",
      { name: "SHAPE", fill: "transparent", strokeWidth: 1, stroke: "white" },
      // Shape.fill is bound to Node.data.color
      new go.Binding("fill", "color")
    ),
    $(
      go.TextBlock,
      { margin: 8, editable: true, stroke: "white" }, // some room around the text
      new go.Binding("text").makeTwoWay()
    ),
    {
      selectionAdornmentTemplate: $(
        go.Adornment,
        "Auto",
        $(go.Shape, "RoundedRectangle", {
          fill: "white",
          opacity: 0.1,
        }),
        $(go.Placeholder)
      ), // end Adornment
    }
  );

  return diagram;
}

/**
 * This function handles any changes to the GoJS model.
 * It is here that you would make any updates to your React state, which is dicussed below.
 */
function handleModelChange(changes: any) {
  console.log(changes);
  //   alert("GoJS model changed!");
}

// render function...
export function ProjectDiagram(props: GetProject) {
  return (
    <div>
      <ReactDiagram
        skipsDiagramUpdate={false}
        initDiagram={initDiagram}
        divClassName="diagram-component"
        nodeDataArray={props.project.nodes.map((node) => ({
          key: node.uniqueName,
          text: node.uniqueName,
        }))}
        linkDataArray={props.project.edges.map((edge) => ({
          key: edge.id,
          from: edge.sourceNodeId,
          to: edge.targetNodeId,
        }))}
        onModelChange={handleModelChange}
      />
    </div>
  );
}

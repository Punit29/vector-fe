import React from "react";
import BaseNode from "./BaseNode";
import { Handle, Position } from "reactflow";

// Example NewNode1
export const NewNode1 = (props) => {
  const customFields = [
    { label: "Custom Field", type: "text", name: "customField" },
  ];
  const customHandles = [
    { type: "source", position: Position.Right, id: "customOutput" },
  ];
  return (
    <BaseNode
      {...props}
      type="NewNode1"
      customFields={customFields}
      customHandles={customHandles}
    />
  );
};

// Repeat similar pattern for other new nodes...

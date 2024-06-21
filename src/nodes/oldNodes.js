import React from "react";
import BaseNode from "./BaseNode";
import { Handle, Position } from "reactflow";

// InputNode
export const InputNode = (props) => {
  const customFields = [
    { label: "Name", type: "text", name: "inputName" },
    {
      label: "Type",
      type: "select",
      name: "inputType",
      options: [
        { value: "Text", label: "Text" },
        { value: "File", label: "File" },
      ],
    },
  ];
  const customHandles = [
    { type: "source", position: Position.Right, id: "value" },
  ];
  return (
    <BaseNode
      {...props}
      type="Input"
      customFields={customFields}
      customHandles={customHandles}
    />
  );
};

// TextNode
export const TextNode = (props) => {
  const customFields = [{ label: "Text", type: "text", name: "text" }];
  const customHandles = [
    { type: "source", position: Position.Right, id: "output" },
  ];
  return (
    <BaseNode
      {...props}
      type="Text"
      customFields={customFields}
      customHandles={customHandles}
    />
  );
};

// OutputNode
export const OutputNode = (props) => {
  const customFields = [
    { label: "Name", type: "text", name: "outputName" },
    {
      label: "Type",
      type: "select",
      name: "outputType",
      options: [
        { value: "Text", label: "Text" },
        { value: "Image", label: "Image" },
      ],
    },
  ];
  const customHandles = [
    { type: "target", position: Position.Left, id: "value" },
  ];
  return (
    <BaseNode
      {...props}
      type="Output"
      customFields={customFields}
      customHandles={customHandles}
    />
  );
};

// LLMNode
export const LLMNode = (props) => {
  const customFields = [
    { label: "Description", type: "text", name: "description" },
  ];
  const customHandles = [
    {
      type: "target",
      position: Position.Left,
      id: "system",
      style: { top: `${100 / 3}%` },
    },
    {
      type: "target",
      position: Position.Left,
      id: "prompt",
      style: { top: `${200 / 3}%` },
    },
    { type: "source", position: Position.Right, id: "response" },
  ];
  return (
    <BaseNode
      {...props}
      type="LLM"
      customFields={customFields}
      customHandles={customHandles}
    />
  );
};

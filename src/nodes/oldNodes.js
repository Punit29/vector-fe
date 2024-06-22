import React, { useState, useEffect } from "react";
import BaseNode from "./BaseNode";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";

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
export const TextNode = ({ id, data }) => {
  console.log("id", id, "data ", data)

  const { text, setText } = useStore((state) => ({
    text: state.text,
    setText: state.setText,
  }));

  useEffect(() => {
    findVariables(text)
  }, [text]);


  const findVariables = (text) => {
    console.log("text", text)
    const regex = /{{(.*?)}}/g;
    let match;
    const variables = [];
    while ((match = regex.exec(text)) !== null) {
      variables.push(match[1]);
    }
    return variables;
  };

  const variables = findVariables(text);
  console.log("variables", variables)

  return (
    <BaseNode
      id={id}
      type="Text"
      data={{ text }}
      customFields={[{ label: 'Text', type: 'textarea', name: 'text' }]}
      // customHandles={[{ type: 'target', position: Position.Left, id: 'work' }]}
      customHandles={variables.map((variable, index) => (

        //   {
        //   type: 'source',
        //   position: Position.Left,
        //   id: `text-${id}-${index}`, // Unique handle ID
        // }

        { type: 'source', position: Position.Left, id: "text-1-input" }

        // {type: 'target', position: 'left', id: 'prompt', style: {…}}
        // 2
        // : 
        // {type: 'source', position: 'right', id: 'response'}


      ))}
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

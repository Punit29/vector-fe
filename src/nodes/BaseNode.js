import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { useStore } from "../store";


const BaseNode = ({ id, data, type, customFields, customHandles }) => {


  console.log("id", id, "data", data, " type, customFields, customHandles", type, customFields, customHandles)

  const [state, setState] = useState(data || {});


  const { text, setText } = useStore((state) => ({
    text: state.text,
    setText: state.setText,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setText(value)
    console.log("data", data)
  };



  return (
    <div className="box">
      <div style={{ textAlign: "center", fontWeight: 500 }}>
        <span>{type}</span>
      </div>
      <div>
        {customFields &&
          customFields.map((field, index) => (
            <label key={index}>
              {field.label}:
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={state[field.name] || ""}
                  onChange={handleChange}
                >
                  {field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={state[field.name] || ""}
                  onChange={handleChange}
                />
              )}
            </label>
          ))}
      </div>
      {customHandles &&
        customHandles.map((handle, index) => (
          <Handle
            key={index}
            type={handle.type}
            position={handle.position}
            id={`${id}-${handle.id}`}
            style={handle.style}
            isConnectable={true}
          />
        ))}
    </div>
  );
};

export default BaseNode;


import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';

const BaseNode = ({ id, data, type, customFields, customHandles }) => {
  const [state, setState] = useState(data || {});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    // Update data when state changes
    // if (data) {
    //   data.updateState(state);
    // }
  }, [state, data]);

  return (
    <div style={{ width: 200, height: 80, border: '1px solid black' }}>
      <div>
        <span>{type}</span>
      </div>
      <div>
        {customFields && customFields.map((field, index) => (
          <label key={index}>
            {field.label}:
            {field.type === 'select' ? (
              <select name={field.name} value={state[field.name] || ''} onChange={handleChange}>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
              <input 
                type={field.type} 
                name={field.name} 
                value={state[field.name] || ''} 
                onChange={handleChange} 
              />
            )}
          </label>
        ))}
      </div>
      {customHandles && customHandles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={handle.style}
        />
      ))}
    </div>
  );
};

export default BaseNode;

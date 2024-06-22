// submit.js

import { useReactFlow } from "reactflow";

export const SubmitButton = () => {
  const { getNodes, getEdges } = useReactFlow();

  const handleSubmit = async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const payload = {
      nodes: nodes.map((node) => ({ id: node.id })),
      edges: edges.map((edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };

    try {
      const response = await fetch("http://localhost:8000/pipelines/parse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert(
        `Number of Nodes: ${result.num_nodes}, Number of Edges: ${result.num_edges}, Is DAG: ${result.is_dag}`
      );
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit the pipeline. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

import React, { useEffect, useState } from "react";
import { useGraph } from "./context/GraphContext";
import { Button, Dialog, Flex } from "@radix-ui/themes";

const GraphVisualizer: React.FC = () => {
  const { state, dispatch } = useGraph();
  const { steps, currentStep, showVisualizer } = state;

  const [isPlaying, setIsPlaying] = useState(true);

  const step = steps[currentStep];

  useEffect(() => {
    if (!showVisualizer || !isPlaying) return;

    const timer = setTimeout(() => {
      dispatch({ type: "NEXT_STEP" });
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentStep, dispatch, showVisualizer, isPlaying]);

  if (!showVisualizer || !step) return null;

  // Use total nodes from graph adjacency list length
  const nodeCount = step.graph.length;
  const nodePositions = Array.from({ length: nodeCount }, (_, i) => {
    const angle = (2 * Math.PI * i) / nodeCount;
    const radius = 120;
    const cx = 200 + radius * Math.cos(angle);
    const cy = 200 + radius * Math.sin(angle);
    return { x: cx, y: cy };
  });

  return (
    <Dialog.Root open={showVisualizer} onOpenChange={() => dispatch({ type: "CLOSE_VISUALIZER" })}>
      <Dialog.Content maxWidth="600px">
        <Dialog.Title className="text-xl font-bold">Graph Traversal</Dialog.Title>
        <Dialog.Description className="mb-2 text-sm text-gray-500">
          Step {currentStep + 1} of {steps.length}
        </Dialog.Description>

        <div className="relative w-full h-[450px] flex justify-center items-center bg-gray-100 rounded-lg">
          <svg width="100%" height="100%" viewBox="0 0 400 400">
            {/* Edges */}
            {step.graph.map((neighbors, i) =>
              neighbors.map((neighbor) => {
                if (i < neighbor) {
                  const pos1 = nodePositions[i];
                  const pos2 = nodePositions[neighbor];
                  return (
                    <line
                      key={`${i}-${neighbor}`}
                      x1={pos1.x}
                      y1={pos1.y}
                      x2={pos2.x}
                      y2={pos2.y}
                      stroke="#ccc"
                      strokeWidth={2}
                    />
                  );
                }
                return null;
              })
            )}

            {/* Nodes */}
            {nodePositions.map((pos, idx) => (
              <circle
                key={idx}
                cx={pos.x}
                cy={pos.y}
                r={20}
                fill={step.visited.includes(idx) ? "#3b82f6" : "#e5e7eb"}
                stroke={step.currentNode === idx ? "#ef4444" : "#333"}
                strokeWidth={step.currentNode === idx ? 4 : 2}
              />
            ))}

            {/* Labels */}
            {nodePositions.map((pos, idx) => (
              <text
                key={`label-${idx}`}
                x={pos.x}
                y={pos.y + 5}
                textAnchor="middle"
                fontSize={14}
                fill="#000"
                pointerEvents="none"
              >
                {idx}
              </text>
            ))}
          </svg>
        </div>

        <Flex mt="4" gap="3" justify="between" align="center">
          <Flex gap="3">
            <Button variant="soft" color="blue" onClick={() => dispatch({ type: "NEXT_STEP" })}>
              Next Step
            </Button>
            <Button
              variant="soft"
              color={isPlaying ? "gray" : "green"}
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? "Pause" : "Resume"}
            </Button>
          </Flex>
          <Button variant="solid" color="red" onClick={() => dispatch({ type: "CLOSE_VISUALIZER" })}>
            Close
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default GraphVisualizer;

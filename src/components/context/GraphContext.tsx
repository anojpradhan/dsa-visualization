import React, {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from "react";
import { dfsSteps } from "../utils/DFS";
import  type { GraphAlgorithm } from "../utils/graphtypes";
import type { GraphStep } from "../utils/graphtypes";
// Example graph
const DEFAULT_GRAPH = {
  0: [1, 2],
  1: [0, 3],
  2: [0],
  3: [1],
};

// Utility switch to get steps
function getGraphSteps(
  algorithm: GraphAlgorithm,
  graph: Record<number, number[]>,
  startNode: number
): GraphStep[] {
  switch (algorithm) {
    case "dfs":
      return dfsSteps(graph, startNode);
    // You can add bfsSteps, dijkstraSteps, etc. here
    default:
      return [];
  }
}

// --- TYPES ---

interface GraphState {
  algorithm: GraphAlgorithm | null;
  graph: Record<number, number[]>;
  startNode: number;
  steps: GraphStep[];
  currentStep: number;
  showVisualizer: boolean;
}

type GraphAction =
  | {
      type: "START_GRAPH_ALGO";
      algorithm: GraphAlgorithm;
      graph: Record<number, number[]>;
      startNode: number;
    }
  | { type: "NEXT_STEP" }
  | { type: "CLOSE_VISUALIZER" };

const initialState: GraphState = {
  algorithm: null,
  graph: DEFAULT_GRAPH,
  startNode: 0,
  steps: [],
  currentStep: 0,
  showVisualizer: false,
};

// --- REDUCER ---
function reducer(state: GraphState, action: GraphAction): GraphState {
  switch (action.type) {
    case "START_GRAPH_ALGO":
      const steps = getGraphSteps(
        action.algorithm,
        action.graph,
        action.startNode
      );
      return {
        ...state,
        algorithm: action.algorithm,
        graph: action.graph,
        startNode: action.startNode,
        steps,
        currentStep: 0,
        showVisualizer: true,
      };
    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.steps.length - 1),
      };
    case "CLOSE_VISUALIZER":
      return { ...state, showVisualizer: false };
    default:
      return state;
  }
}

// --- CONTEXT ---
const GraphContext = createContext<{
  state: GraphState;
  dispatch: React.Dispatch<GraphAction>;
} | null>(null);

export const GraphProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GraphContext.Provider value={{ state, dispatch }}>
      {children}
    </GraphContext.Provider>
  );
};

export const useGraph = () => {
  const context = useContext(GraphContext);
  if (!context) throw new Error("useGraph must be inside GraphProvider");
  return context;
};

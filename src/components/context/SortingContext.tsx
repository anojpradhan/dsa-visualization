import React, { createContext, useReducer, useContext, type ReactNode } from 'react';
import { bubbleSortSteps } from '../utils/BubbleSort';
import { insertionSortSteps } from '../utils/InsertionSort';
import type { SortingType } from '../utils'; // "bubble" | "insertion" etc.

const DEFAULT_DATA = [5, 3, 8, 1, 2];

// Step type shared across algorithms
interface SortStep {
  array: number[];
  compared: [number, number] | null;
  sortedBoundary: number;
}

// Step generator function for each algorithm
function getSortingSteps(algorithm: string, data: number[]): SortStep[] {
  switch (algorithm) {
    case "bubble":
      return bubbleSortSteps(data);
    case "insertion":
      return insertionSortSteps(data);
    default:
      return [];
  }
}

// Context state type
interface SortingState {
  algorithm: SortingType | null;
  data: number[];
  steps: SortStep[];
  currentStep: number;
  showVisualizer: boolean;
}

// Actions
type SortingAction =
  | { type: 'START_SORTING'; algorithm: SortingType }
  | { type: 'NEXT_STEP' }
  | { type: 'CLOSE_VISUALIZER' };

// Initial state
const initialState: SortingState = {
  algorithm: null,
  data: DEFAULT_DATA,
  steps: [],
  currentStep: 0,
  showVisualizer: false,
};

// Reducer
function reducer(state: SortingState, action: SortingAction): SortingState {
  switch (action.type) {
    case 'START_SORTING': {
      const steps = getSortingSteps(action.algorithm, state.data);
      return {
        ...state,
        algorithm: action.algorithm,
        steps,
        currentStep: 0,
        showVisualizer: true,
      };
    }
    case 'NEXT_STEP': {
      const nextStep = state.currentStep + 1;
      return {
        ...state,
        currentStep: Math.min(nextStep, state.steps.length - 1),
      };
    }
    case 'CLOSE_VISUALIZER':
      return { ...state, showVisualizer: false };
    default:
      return state;
  }
}

// Context creation
const SortingContext = createContext<{
  state: SortingState;
  dispatch: React.Dispatch<SortingAction>;
} | null>(null);

// Provider
export const SortingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SortingContext.Provider value={{ state, dispatch }}>
      {children}
    </SortingContext.Provider>
  );
};

// Hook
export const useSorting = () => {
  const context = useContext(SortingContext);
  if (!context) throw new Error('SortingContext must be used inside provider');
  return context;
};

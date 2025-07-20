import React, { createContext, useReducer, useContext, type ReactNode } from 'react';
import { sortingAlgorithms } from '../utils';
import type { SortingType } from '../utils';


const DEFAULT_DATA = [5, 3, 8, 1, 2];

interface BubbleSortStep {
  array: number[];
  compared: [number, number] | null;
  sortedBoundary: number;
}

interface SortingState {
  algorithm: SortingType | null;
  data: number[];
  steps: BubbleSortStep[];
  currentStep: number;
  showVisualizer: boolean;
}


type SortingAction =
  | { type: 'START_SORTING'; algorithm: SortingType }
  | { type: 'NEXT_STEP' }
  | { type: 'CLOSE_VISUALIZER' };

const initialState: SortingState = {
  algorithm: null,
  data: DEFAULT_DATA,
  steps: [],
  currentStep: 0,
  showVisualizer: false,
};

function reducer(state: SortingState, action: SortingAction): SortingState {
  switch (action.type) {
    case 'START_SORTING': {
      const steps = sortingAlgorithms[action.algorithm](state.data);
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

const SortingContext = createContext<{
  state: SortingState;
  dispatch: React.Dispatch<SortingAction>;
} | null>(null);

export const SortingProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SortingContext.Provider value={{ state, dispatch }}>
      {children}
    </SortingContext.Provider>
  );
};

export const useSorting = () => {
  const context = useContext(SortingContext);
  if (!context) throw new Error('SortingContext must be used inside provider');
  return context;
};

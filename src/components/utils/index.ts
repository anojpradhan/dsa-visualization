import { bubbleSortSteps } from './BubbleSort';
// import { insertionSortSteps } from './insertionSortSteps';

export const sortingAlgorithms = {
  bubble: bubbleSortSteps,
  // insertion: insertionSortSteps,
};

export type SortingType = keyof typeof sortingAlgorithms;

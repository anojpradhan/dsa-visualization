export type BubbleSortStep = {
  array: number[];
  compared: [number, number] | null;
  sortedBoundary: number;
};

export function bubbleSortSteps(arr: number[]): BubbleSortStep[] {
  const steps: BubbleSortStep[] = [];
  const array = [...arr];

  const n = array.length;

  steps.push({ array: [...array], compared: null, sortedBoundary: n }); // initial

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      steps.push({
        array: [...array],
        compared: [j, j + 1],
        sortedBoundary: n - i,
      });

      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        swapped = true;

        steps.push({
          array: [...array],
          compared: [j, j + 1],
          sortedBoundary: n - i,
        });
      }
    }
    if (!swapped) break;
  }

  // Final step: all sorted
  steps.push({ array: [...array], compared: null, sortedBoundary: 0 });

  return steps;
}

type InsertionStep = {
  array: number[];
  compared: [number, number] | null;
  sortedBoundary: number;
};

export function insertionSortSteps(arr: number[]): InsertionStep[] {
  const steps: InsertionStep[] = [];
  const a = [...arr];

  steps.push({
    array: [...a],
    compared: null,
    sortedBoundary: 0,
  });

  for (let i = 1; i < a.length; i++) {
    let key = a[i];
    let j = i - 1;

    // Compare key with each element on its left until smaller is found
    while (j >= 0 && a[j] > key) {
      steps.push({
        array: [...a],
        compared: [j, j + 1],
        sortedBoundary: i,
      });

      a[j + 1] = a[j];
      j--;
    }

    a[j + 1] = key;

    steps.push({
      array: [...a],
      compared: [j + 1, i],
      sortedBoundary: i,
    });
  }

  // Final sorted state
  steps.push({
    array: [...a],
    compared: null,
    sortedBoundary: a.length,
  });

  return steps;
}

import type { GraphStep } from "./graphtypes";

export function dfsSteps(
  graph: Record<number, number[]>,
  startNode: number
): GraphStep[] {
  const visited = new Set<number>();
  const steps: GraphStep[] = [];
  const stack: number[] = [startNode];

  // Convert graph Record to adjacency list array for visualization
  const adjacencyList = Object.keys(graph)
    .map(Number)
    .sort((a, b) => a - b)
    .map((key) => graph[key]);

  while (stack.length > 0) {
    const current = stack.pop()!;
    if (!visited.has(current)) {
      visited.add(current);
      steps.push({
        visited: Array.from(visited),
        currentNode: current,
        graph: adjacencyList,
      });

      // Push neighbors in reverse to maintain DFS order
      const neighbors = graph[current] || [];
      for (let i = neighbors.length - 1; i >= 0; i--) {
        const neighbor = neighbors[i];
        if (!visited.has(neighbor)) {
          stack.push(neighbor);
        }
      }
    }
  }

  // Final step to show traversal complete
  steps.push({
    visited: Array.from(visited),
    currentNode: null,
    graph: adjacencyList,
  });

  return steps;
}

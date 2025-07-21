export type GraphAlgorithm = "dfs" | "bfs"; // Extendable

export interface GraphStep {
  visited: number[];
  currentNode: number | null;
  graph: number[][]; // 👈 add this line
}


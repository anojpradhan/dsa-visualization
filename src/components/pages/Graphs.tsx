import { GraphProvider, useGraph } from "../context/GraphContext";
import GraphVisualizer from "../../components/GraphVisualizer";
import Navbar from "../Navbar";
import { Sparkles, GitBranch } from "lucide-react";
import { motion } from "framer-motion";

function GraphCard({
  name,
  description,
  onClick,
}: {
  name: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer p-5 bg-white rounded-xl shadow-md border hover:shadow-blue-300 transition duration-300 w-full max-w-xs"
    >
      <div className="flex items-center gap-2 text-blue-600 font-bold text-xl mb-2">
        <GitBranch size={20} />
        {name}
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
    </motion.div>
  );
}

function GraphControls() {
  const { dispatch } = useGraph();

  const sampleGraph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0],
    3: [1],
    4: [1],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10">
      <h1 className="text-4xl font-bold text-center text-blue-700 flex items-center justify-center gap-2 mb-8">
        <Sparkles className="text-yellow-500 animate-pulse" /> Graph Algorithms
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
        <GraphCard
          name="DFS Traversal"
          description="Visualize Depth First Search"
          onClick={() =>
            dispatch({
              type: "START_GRAPH_ALGO",
              algorithm: "dfs",
              graph: sampleGraph,
              startNode: 0,
            })
          }
        />

        <GraphCard
          name="BFS Traversal"
          description="Visualize Breadth First Search"
          onClick={() =>
            dispatch({
              type: "START_GRAPH_ALGO",
              algorithm: "bfs",
              graph: sampleGraph,
              startNode: 0,
            })
          }
        />
      </div>
    </div>
  );
}

export default function Graph() {
  return (
    <>
      <Navbar />
      <GraphProvider>
        <GraphControls />
        <GraphVisualizer />
      </GraphProvider>
    </>
  );
}

import { useSorting } from "./context/SortingContext";

export default function SortingVisualizer() {
  const { state, dispatch } = useSorting();
  const { steps, currentStep, showVisualizer, algorithm } = state;

  if (!showVisualizer || !algorithm) return null;

  const step = steps[currentStep];
  const currentArray = step.array;
  const compared = step.compared;
  const sortedBoundary = step.sortedBoundary;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md text-center shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 capitalize">{algorithm} Sort</h2>

        <div className="flex justify-center gap-2 mb-4">
          {currentArray.map((num, idx) => {
            let bgColor = "bg-blue-200";

            if (idx >= sortedBoundary) {
              bgColor = "bg-green-400 text-white font-semibold"; // sorted
            } else if (compared && (idx === compared[0] || idx === compared[1])) {
              bgColor = "bg-red-400 text-white font-semibold"; // currently compared
            }

            return (
              <div
                key={idx}
                className={`${bgColor} w-10 h-10 flex items-center justify-center rounded-lg font-mono text-lg transition-colors duration-300`}
              >
                {num}
              </div>
            );
          })}
        </div>

        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition mr-3 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => dispatch({ type: "NEXT_STEP" })}
          disabled={currentStep >= steps.length - 1}
        >
          Next Step
        </button>

        <button
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition"
          onClick={() => dispatch({ type: "CLOSE_VISUALIZER" })}
        >
          Close
        </button>
      </div>
    </div>
  );
}


import Card from '../Card';
import SortingVisualizer from '../SortingVisualizer';
import { useSorting } from '../context/SortingContext';
import Navbar from '../Navbar';

const sortingAlgorithms = [
  {
    name: 'Bubble Sort',
    description: 'Repetitively swaps adjacent elements if they are in wrong order.',
    key: 'bubble',
  },
  {
    name: 'Insertion Sort',
    description: 'Builds the sorted array one item at a time.',
    key: 'insertion',
  },
];

export default function Sorting() {
  const { dispatch } = useSorting();

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Sorting Algorithms</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortingAlgorithms.map((algo) => (
          <Card
          key={algo.key}
            name={algo.name}
            description={algo.description}
            onClick={() => dispatch({ type: 'START_SORTING', algorithm: algo.key as any })}
            />
          ))}
      </div>

      <SortingVisualizer />
    </div>
          </>
  );
}

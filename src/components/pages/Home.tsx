import Navbar from "../Navbar";


export default function Home() {
  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to DSA Visualizer</h1>
      <p className="text-gray-700">Explore various Data Structures and Algorithms visually!</p>
    </div>
    </>
  );
}

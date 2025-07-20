import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Graph from "./components/pages/Graphs";
import Trees from "./components/pages/Trees";
import Sorting from "./components/pages/Sorting";
import { SortingProvider } from "./components/context/SortingContext";

const App = () => {
  return (
      <SortingProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/graphs" element={<Graph />} />
          <Route path="/trees" element={<Trees />} />
          <Route path="/sorting" element={<Sorting />} />
        </Routes>
      </SortingProvider>
  );
};

export default App;

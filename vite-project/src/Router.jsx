import { Routes, Route } from "react-router-dom";
import Graph from "./Pages/Graph.jsx";
import Home from "./Pages/Home.jsx";
import Results from "./Pages/results.jsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/results" element={<Results />} />
      </Routes>
  );
};

export default AppRoutes;

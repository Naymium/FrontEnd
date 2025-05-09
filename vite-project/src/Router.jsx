import { BrowserRouter, Routes, Route } from "react-router-dom";
import Graph from "./Pages/Graph.jsx";
import Home from "./Pages/Home.jsx";

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/graph" element={<Graph />} />
      </Routes>
  );
};

export default AppRoutes;

import { Routes, Route } from "react-router-dom";
import Graph from "./Pages/Graph.jsx";
import Home from "./Pages/Home.jsx";
import Results from "./Pages/results.jsx";
import AbnormalGraph from "./Pages/AbnormalGraph.jsx";
import EntireData from "./Pages/EntireData.jsx";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/abnormal-graph" element={<AbnormalGraph />} />
      <Route path="/results" element={<Results />} />
      <Route path="/entire-data" element={<EntireData />} />
    </Routes>
  );
};

export default AppRoutes;

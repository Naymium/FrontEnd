import { Routes, Route } from "react-router-dom";
import Graph from "./Pages/Graph.jsx";
import Home from "./Pages/Home.jsx";
import Results from "./Pages/results.jsx";
import FileData from "./Pages/FileData.jsx";
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
      <Route path="/filedata" element={<FileData />} />
    </Routes>
  );
};

export default AppRoutes;

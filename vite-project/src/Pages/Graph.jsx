import React from "react";
import "../CSS/Graph.css";

const Graph = () => {
  return (
    <div className="graph-container">
      <div className="graph-header">
        <h2 className="graph-title">Ranging Error Graph (정상 데이터)</h2>
        <button className="graph-save-button">저장하기</button>
      </div>

      <div className="graph-info">
        <span className="sample-count">샘플 개수: 00000000</span>
      </div>

      <div className="graph-image-wrapper">
        {/* <img className="image" alt="Image" src={image4} /> */}
        <img
          src="/assets/graph-image.png"
          alt="Ranging Error Graph"
          className="graph-image"
        />
      </div>
    </div>
  );
};

export default Graph;

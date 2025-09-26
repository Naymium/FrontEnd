import "../CSS/Graph.css";
import { Link } from "react-router-dom";
import rightArrow from "../assets/free-icon-right-arrow-271228.png";

const Graph = () => {
  return (
    <div className="graph-container">
      <div className="graph-section-divider" />

      <div className="graph-section-title">
        Ranging Error Graph (정상 데이터)
      </div>

      <div className="graph-sample-save-wrapper">
        <div className="sample-count">샘플 개수: 00000000</div>
        <button className="save-button">저장하기</button>
      </div>

      <div className="graph-box">{/* graphImage */}</div>

      <div className="arrow-button-container">
        <Link to="/abnormal-graph">
          <img className="arrow-button" src={rightArrow} alt="Next page" />
        </Link>
      </div>
    </div>
  );
};

export default Graph;

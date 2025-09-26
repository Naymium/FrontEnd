import "../CSS/AbnormalGraph.css";
import { Link } from "react-router-dom";
import leftArrow from "../assets/free-icon-left-arrow-271220.png"; // 왼쪽 화살표 이미지

const AbnormalGraph = () => {
  return (
    <div className="abnormal-graph-container">

      <div className="abnormal-section-title">
        Ranging Error Graph (비정상 데이터)
      </div>

      <div className="abnormal-sample-save-wrapper">
        <div className="sample-count">샘플 개수: 00000000</div>
        <button className="save-button">저장하기</button>
      </div>

      <div className="abnormal-graph-box">{/* 비정상 그래프 이미지 등 */}</div>

      {/* 🔽 왼쪽 화살표 */}
      <div className="left-arrow-button-container">
        <Link to="/graph">
          <img className="arrow-button" src={leftArrow} alt="Back to graph" />
        </Link>
      </div>
    </div>
  );
};

export default AbnormalGraph;

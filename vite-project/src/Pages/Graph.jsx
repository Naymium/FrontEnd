import "../CSS/Graph.css";

const Graph = () => {
  return (
    <div className="graph-container">
      <div className="graph-section-title">
        Ranging Error Graph (정상 데이터)
      </div>

      <div className="graph-sample-save-wrapper">
        <div className="sample-count">샘플 개수: 00000000</div>
        <button className="save-button">저장하기</button>
      </div>

      <div className="graph-box">
        {/* 여기에 그래프 이미지나 컴포넌트 삽입 */}
        {/* <img src={image4} alt="Ranging Error Graph" /> */}
      </div>
    </div>
  );
};

export default Graph;

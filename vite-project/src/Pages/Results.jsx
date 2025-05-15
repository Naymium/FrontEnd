import "../CSS/Results.css";

const Results = () => {
  return (
    <div className="results-container">
      <div className="result-save-export-nest">
        <div className="result-text">결과</div>
        <div className="button-nest">
          <button className="save-button">저장하기</button>
          <button className="export-button">내보내기</button>
        </div>
      </div>
      <div className="sample-nest">
        <div className="sample-instance">
          <span>샘플 1</span>
          <div className="output"></div>
        </div>
        <div className="sample-instance">
          <span>샘플 2</span>
          <div className="output"></div>
        </div>
        <div className="sample-instance">
          <span>샘플 3</span>
          <div className="output"></div>
        </div>
        <div className="sample-instance">
          <span>샘플 4</span>
          <div className="output"></div>
        </div>
        <div className="sample-instance">
          <span>샘플 5</span>
          <div className="output"></div>
        </div>
      </div>
    </div>
  );
};

export default Results;

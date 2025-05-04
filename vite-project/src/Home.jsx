import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="container">
      <h1 className="main-title">딥러닝 기반 PRN 코드 이상 탐지</h1>

      <p className="input-or-file">입력 or 파일첨부 택1</p>
      <label className="input-label" htmlFor="input-textarea">
        &lt;입력값&gt;
      </label>
      <textarea id="input-textarea" className="input-textarea" />

      <label className="checkbox-label" htmlFor="checkbox">
        <input type="checkbox" id="checkbox" className="checkbox" />
        Checkbox Label
      </label>

      <p className="file-label">&lt;파일첨부&gt;</p>
      <div className="file-box">
        <p className="drag-drop-text">첨부파일을 마우스로 끌어 놓으세요</p>
      </div>

      <div className="gray-box-1">{/* Content inside gray box */}</div>

      <label className="label-e1" htmlFor="input-box">
        E1
      </label>
      <div className="input-box" id="input-box" />

      <button className="submit-button">
        <span className="submit-button-text">입력</span>
      </button>
    </div>
  );
}

export default Home;

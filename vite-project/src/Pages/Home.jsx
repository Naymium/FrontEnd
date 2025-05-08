import React from "react";
import "../CSS/Home.css";

import CheckBoxToggle from "../Components/CheckBoxToggle.jsx";
import upload from "../assets/upload.svg";

const Home = () => {
  const handleToggle = () => {};
  return (
    <div className="home">
      <div className="text-input-or-file">입력 or 파일첨부 택1</div>
      <div className="text-bracket-input-button">
        <div className="text-bracket">입력값</div>
        <button className="input-confirm">입력하기</button>
      </div>
      <div className="input-nest">
        <div
          className="input-subnest"
          id="left-subnest"
          style={{ borderRight: "2px #ddd solid" }}
        >
          <div className="input-instance">
            E1
            <input className="input_box" id="E1"></input>
          </div>
          <div className="input-instance">
            E2
            <input className="input_box" id="E2"></input>
          </div>
          <div className="input-instance">
            E3
            <input className="input_box" id="E3"></input>
          </div>
          <div className="input-instance">
            E4
            <input className="input_box" id="E4"></input>
          </div>
          <div className="input-instance">
            L1
            <input className="input_box" id="L1"></input>
          </div>
          <div className="input-instance">
            L2
            <input className="input_box" id="L2"></input>
          </div>
          <div className="input-instance">
            L3
            <input className="input_box" id="L3"></input>
          </div>
          <div className="input-instance">
            L4
            <input className="input_box" id="L4"></input>
          </div>
          <div className="input-instance">
            <span style={{ width: "200px" }}>Ranging Error</span>
            <input className="input_box"></input>
          </div>
        </div>
        <div className="input-subnest" id="right-subnest">
          <div className="distortion-text">
            왜곡값 입력 <span style={{ color: "#8a8a8a" }}>(선택사항)</span>
          </div>
          <div className="input-instance">
            <CheckBoxToggle onToggle={handleToggle} />
            <div className="distortion-variable">𝚫</div>
            <input className="input_box"></input>
          </div>
          <div className="input-instance">
            <CheckBoxToggle onToggle={handleToggle} />
            <div className="distortion-variable">
              𝒇
              <sub>
                <sub>𝒅</sub>
              </sub>
            </div>
            <input className="input_box"></input>
          </div>
          <div className="input-instance">
            <CheckBoxToggle onToggle={handleToggle} />
            <div className="distortion-variable">𝝈</div>
            <input className="input_box"></input>
          </div>
        </div>
      </div>
      <div style={{ height: "29px", borderBottom: "2px solid #ddd" }} />
      <div className="text-bracket-input-button">
        <div className="text-bracket">파일첨부</div>
        <button className="input-confirm">입력하기</button>
      </div>
      <div className="drag-drop-nest">
        <div className="file-info-text">일반파일 0KB/ 최대10MB</div>
        <div className="drag-drop-text">
          <img className="upload" src={upload} alt="upload" />
          첨부파일을 마우스로 끌어 놓으세요
        </div>
      </div>
      <div className="input-confirm-nest">
        <button className="input-confirm">입력</button>
      </div>
    </div>
  );
};

export default Home;

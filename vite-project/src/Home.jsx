import React from "react";
import "./Home.css";

import CheckBoxToggle from "./CheckBoxToggle.jsx";
import upload from "./assets/upload.svg";

const Home = () => {
  const handleToggle = () => {};
  return (
      <div className="main-container">
        <div className="text-left-nest">
          <div className="text-input-or-file">입력 or 파일첨부 택1</div>
          <div className="text-bracket">&lt;입력값&gt;</div>
        </div>
        <div className="input-nest">
          <div
            className="input-subnest"
            style={{ borderRight: "1px #1639B9 solid" }}
          >
            <div className="input-instance">
              E1
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              E2
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              E3
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              E4
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              L1
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              L2
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              L3
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              L4
              <input className="input_box"></input>
            </div>
            <div className="input-instance" id="ranging-error">
              Ranging Error
              <input className="input_box"></input>
            </div>
          </div>
          <div className="input-subnest">
            <div className="text-left-nest" id="distortion">
              왜곡값 입력 (선택사항, 입력 희망 시 체크박스 체크 후 입력)
            </div>
            <div className="input-instance">
              <CheckBoxToggle onToggle={handleToggle} />
              <div className="distortion-variable">𝚫</div>
              <input className="input_box"></input>
            </div>
            <div className="input-instance">
              <CheckBoxToggle onToggle={handleToggle} />
              <div className="distortion-variable">
                𝒇<sub>𝒅</sub>
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
        <div style={{ height: "47px" }} />
        <div className="text-left-nest">
          <div className="text-bracket">&lt;파일첨부&gt;</div>
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

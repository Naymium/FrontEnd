import React from "react";
import "./Home.css";

import logo from "./assets/lab_logo.png";
import contacts from "./assets/contacts.png";
import upload from "./assets/upload.svg";

const Home = () => {
  return (
    <div className="container">
      <div className="lab-logo-nest">
        <button
          style={{
            marginTop: "25px",
            marginLeft: "22px",
          }}
        >
          <img className="lab-logo" src={logo} alt="lab logo" />
        </button>
      </div>
      <div className="main-container">
        <div className="confirm-input-button" />
        <div className="title-main">딥러닝 기반 PRN 코드 이상 탐지</div>
        <div className="redirection-nest">
          <button className="redirection" a="">
            최신 Ranging Error 그래프 보기 &gt;
          </button>
          <button className="redirection" a="">
            파일 데이터 확인하기 &gt;
          </button>
          <button className="redirection" a="">
            전체 데이터 확인하기 &gt;
          </button>
        </div>
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
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              E2
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              E3
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              E4
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              L1
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              L2
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              L3
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              L4
              <div className="stringbox"></div>
            </div>
            <div className="input-instance" id="ranging-error">
              Ranging Error
              <div className="stringbox"></div>
            </div>
          </div>
          <div className="input-subnest">
            <div className="text-left-nest" id="distortion">
              왜곡값 입력 (선택사항)
            </div>
            <div className="input-instance">
              <div className="checkbox"></div>
              <div className="input-text-box">𝚫</div>
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              <div className="checkbox"></div>
              <div className="input-text-box">
                𝒇<sub>𝒅</sub>
              </div>
              <div className="stringbox"></div>
            </div>
            <div className="input-instance">
              <div className="checkbox"></div>
              <div className="input-text-box">𝝈</div>
              <div className="stringbox"></div>
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
      <div className="contacts-Nest">
        <img className="contacts" src={contacts} alt="contacts" />
      </div>
    </div>
  );
};

export default Home;

import React from "react";
// import frame13213178492 from "./frame-1321317849-2.svg";
// import frame1321317849 from "./frame-1321317849.svg";
// import frame1321317850 from "./frame-1321317850.svg";
// import image4 from "./image-4.png";
// import image from "./image.svg";
import "./graph.css";
// import vector4609 from "./vector-4609.svg";
// import vector from "./vector.svg";

const Graph = () => {
  return (
    <div className="ranging-error">
      <div className="div">
        <div className="flexcontainer">
          <div className="main-container">
            <div className="confirm-input-button" />
            <div className="title-main">딥러닝 기반 PRN 코드 이상 탐지</div>
          </div>
        </div>

        <p className="p">Ranging Error Graph (정상 데이터)</p>

        <div className="frame">
          <div className="text-wrapper-2">최신 Ranging Error 그래프</div>

          <div className="arrow">
            {/* <img className="img" alt="Frame" src={frame1321317849} /> */}
          </div>
        </div>

        <div className="div-wrapper">
          <div className="text-wrapper-3">저장하기</div>
        </div>

        <div className="frame-2">
          <div className="text-wrapper-4">파일 데이터 확인</div>

          <div className="arrow">
            {/* <img className="img" alt="Frame" src={image} /> */}
          </div>
        </div>

        <div className="frame-3">
          <div className="text-wrapper-4">전체 데이터 확인</div>

          <div className="arrow">
            {/* <img className="img" alt="Frame" src={frame13213178492} /> */}
          </div>
        </div>

        <header className="header">
          <div className="div-2">
            {/* <img className="frame-4" alt="Frame" src={frame1321317850} /> */}

            {/* <img className="vector" alt="Vector" src={vector} /> */}
          </div>
        </header>

        <div className="text-wrapper-5">샘플 개수: 00000000</div>

        {/* <img className="vector-2" alt="Vector" src={vector4609} /> */}

        <footer className="footer">
          <div className="frame-5">
            <div className="group">
              <p className="text-wrapper-6">
                04066 서울특별시 마포구 와우산로 94 (상수동) 홍익대학교 제
                1공학관
              </p>

              <p className="text-wrapper-7">
                Hongik University, 94, Wausan-ro, Mapo-gu, Seoul, 04066,
                Republic of Korea
              </p>
            </div>

            <div className="group-2">
              <div className="text-wrapper-6">K124 - Laboratoy</div>

              <div className="text-wrapper-8">K515 - Office</div>
            </div>
          </div>
        </footer>

        <div className="image-wrapper">
          {/* <img className="image" alt="Image" src={image4} /> */}
        </div>
      </div>
    </div>
  );
};

export default Graph;

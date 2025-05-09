import { Link } from "react-router-dom";

import "../CSS/Header.css";
import logo from "../assets/lab_logo.svg";
import arrow from "../assets/redirection_arrow.svg";

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <button style={{ border: "none" }}>
          <img className="lab-logo" src={logo} alt="lab logo" />
        </button>
      </Link>
      <div className="title-button-nest">
        <div className="title-main">
          딥러닝 기반
          <br />
          PRN 코드 이상 탐지
        </div>
        <div className="button-nest">
          <Link to="/graph">
            <button className="redirection" style={{ width: "300px" }}>
              최신 ranging error 그래프 보기
              <img className="arrow" src={arrow} />
            </button>
          </Link>
          <Link to="">
            <button className="redirection" style={{ width: "200px" }}>
              파일 데이터 확인
              <img className="arrow" src={arrow} />
            </button>
          </Link>
          <Link to="">
            <button className="redirection" style={{ width: "200px" }}>
              전체 데이터 확인
              <img className="arrow" src={arrow} />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;

import { NavLink, useLocation } from "react-router-dom";

import "../CSS/Header.css";
import logo from "../assets/lab_logo.svg";
import arrow from "../assets/redirection_arrow.svg";

const Header = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isResults = location.pathname === "/results";
  return (
    <div className="header">
      <NavLink to="/">
        <button style={{ border: "none" }}>
          <img className="lab-logo" src={logo} alt="lab logo" />
        </button>
      </NavLink>
      <div className="title-button-nest">
        <NavLink to="/">
          <div className="title-main">
            딥러닝 기반
            <br />
            PRN 코드 이상 탐지
          </div>
        </NavLink>
        <div className="button-nest">
          <NavLink
            to="/graph"
            className={({ isActive }) =>
              `redirection ${isHome || isResults ? "active" : isActive ? "active" : ""}`
            }
          >
            최신 ranging error 그래프 보기
            <img className="arrow" src={arrow} />
          </NavLink>

          <NavLink
            to="/filedata"
            className={({ isActive }) =>
              `redirection ${isHome || isResults ? "active" : isActive ? "active" : ""}`
            }
          >
            파일 데이터 확인
            <img className="arrow" src={arrow} />
          </NavLink>

          <NavLink
            to="/entire-data"
            className={({ isActive }) =>
              `redirection ${isHome || isResults ? "active" : isActive ? "active" : ""}`
            }
          >
            전체 데이터 확인
            <img className="arrow" src={arrow} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Header;

import "./Header.css";
import logo from "./assets/lab_logo.png";

const Header = () => {
  return (
    <div className="header">
      <button style={{ border: "none" }}>
        <img className="lab-logo" src={logo} alt="lab logo" />
      </button>
      <div className="title-button-nest">
        <div className="title-main">
          딥러닝 기반
          <br />
          PRN 코드 이상 탐지
        </div>
        <div className="button-nest">
          <button className="redirection">
            최신 ranging error 그래프 보기
          </button>
          <button className="redirection">파일 데이터 확인</button>
          <button className="redirection">전체 데이터 확인</button>
        </div>
      </div>
    </div>
  );
};

export default Header;

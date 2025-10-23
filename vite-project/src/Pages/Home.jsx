import { Link } from "react-router-dom";
import { useState } from "react";

import "../CSS/Home.css";

import CheckBoxToggle from "../Components/CheckBoxToggle.jsx";
import upload from "../assets/upload.svg";

const Home = () => {
  const [formData, setFormData] = useState({
    E1: 0,
    E2: 0,
    E3: 0,
    E4: 0,
    L1: 0,
    L2: 0,
    L3: 0,
    L4: 0,
    RangingError: 0,
    delta: 0,
    sigma: 0,
    fd: 0,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value, // update specific field
    });
  };

  // Send request to server
  const handleSubmit = async () => {
    try {
      const response = await fetch("https://your-server.com/api/endpoint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          // ensure numbers instead of strings
          e1: Number(formData.e1),
          e2: Number(formData.e2),
          e3: Number(formData.e3),
          e4: Number(formData.e4),
          l1: Number(formData.l1),
          l2: Number(formData.l2),
          l3: Number(formData.l3),
          l4: Number(formData.l4),
          rangingError: Number(formData.rangingError),
          delta: Number(formData.delta),
          sigma: Number(formData.sigma),
          fd: Number(formData.fd),
        }),
      });

      const data = await response.json();
      console.log("Server Response:", data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleToggle = () => {};
  return (
    <div className="home">
      <div className="text-input-or-file">입력 or 파일첨부 택1</div>
      <div className="text-bracket-input-button">
        <div className="text-bracket">입력값</div>
        <Link to="/results">
          <button className="input-confirm" onClick={handleSubmit}>
            입력하기
          </button>
        </Link>
      </div>
      <div className="input-nest">
        <div
          className="input-subnest"
          id="left-subnest"
          style={{ borderRight: "2px #ddd solid" }}
        >
          {["E1", "E2", "E3", "E4", "L1", "L2", "L3", "L4", "RangingError"].map(
            (field) => (
              <div className="input-instance" key={field}>
                {field}
                <input
                  className="input_box"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            )
          )}
        </div>
        <div className="input-subnest" id="right-subnest">
          <div className="distortion-text">
            왜곡값 입력 <span style={{ color: "#8a8a8a" }}>(선택사항)</span>
          </div>
          {["delta", "sigma", "fd"].map(
            (field) => (
              <div className="input-instance" key={field}>
                <CheckBoxToggle onToggle={handleToggle} />
                {field}
                <input
                  className="input_box"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                />
              </div>
            )
          )}

          <div className="input-instance">
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
        <div className="file-info-text">일반파일 0KB/최대 10MB</div>
        <Link to="/results">
          <button className="input-confirm">입력하기</button>
        </Link>
      </div>
      <div className="drag-drop-nest">
        <div className="drag-drop-text">
          <img className="upload" src={upload} alt="upload" />
          첨부파일을 마우스로 끌어 놓으세요
        </div>
      </div>
    </div>
  );
};

export default Home;

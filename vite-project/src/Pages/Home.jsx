import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../CSS/Home.css"; // Ensure Shared.css is imported inside here
import CheckBoxToggle from "../Components/CheckBoxToggle.jsx";
import upload from "../assets/upload.svg";

const Home = () => {
  // --- States ---
  const [formData, setFormData] = useState({
    E1: "",
    E2: "",
    E3: "",
    E4: "",
    L1: "",
    L2: "",
    L3: "",
    L4: "",
    RangingError: "",
    delta: "",
    sigma: "",
    fd: "",
  });

  const [activeFields, setActiveFields] = useState({
    delta: false,
    sigma: false,
    fd: false,
  });

  const [uploadFileName, setUploadFileName] = useState("");

  // ✅ NEW: Loading State
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const apiURL = "http://43.203.173.135:8080";

  // --- Handlers ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const safeNumber = (value) => (value === "" ? 0 : Number(value));
  const handleToggle = (field) => {
    setActiveFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // --- Submit Logic (Manual) ---
  const handleSubmit = async () => {
    // ✅ Start Loading
    setIsLoading(true);

    try {
      const endpoint = "/predict/data";
      const payload = {
        e1: safeNumber(formData.E1),
        e2: safeNumber(formData.E2),
        e3: safeNumber(formData.E3),
        e4: safeNumber(formData.E4),
        l1: safeNumber(formData.L1),
        l2: safeNumber(formData.L2),
        l3: safeNumber(formData.L3),
        l4: safeNumber(formData.L4),
        rangingError: safeNumber(formData.RangingError),
        delta: activeFields.delta ? safeNumber(formData.delta) : 0,
        fd: activeFields.fd ? safeNumber(formData.fd) : 0,
        sigma: activeFields.sigma ? safeNumber(formData.sigma) : 0,
        createdAt: new Date().toISOString(),
      };

      const response = await fetch(apiURL + endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("Server Response:", data);

      // Navigate to results
      navigate("/results", { state: { resultData: data } });
    } catch (error) {
      console.error("Error:", error);
      alert("서버와 통신 중 오류가 발생했습니다.");
      setIsLoading(false); // ✅ Stop loading only on error
    }
    // Note: If success, we navigate away, so no need to set loading false
  };

  // --- File Upload Logic ---
  const handleFileDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }

    setUploadFileName(file.name);

    // ✅ Start Loading
    setIsLoading(true);

    const fileFormData = new FormData();
    fileFormData.append("file", file);
    fileFormData.append("createdAt", new Date().toISOString());

    try {
      const response = await fetch(`${apiURL}/predict/file-data`, {
        method: "POST",
        body: fileFormData,
      });
      const data = await response.json();

      navigate("/results", { state: { resultData: data } });
    } catch (error) {
      console.error("File upload error:", error);
      alert("파일 업로드 실패");
      setIsLoading(false); // ✅ Stop loading on error
    }
  };

  return (
    <div className="home">
      {/* ✅ Loading Overlay Component */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <div className="loading-text">
            데이터 분석 중입니다... <br />
            잠시만 기다려주세요.
          </div>
        </div>
      )}

      <div className="text-input-or-file">입력 or 파일첨부 택1</div>

      {/* --- Manual Input Section --- */}
      <div className="text-bracket-input-button">
        <div className="text-bracket">입력값</div>
        <button
          className="input-confirm"
          onClick={handleSubmit}
          disabled={isLoading} // ✅ Disable button while loading
        >
          {isLoading ? "처리중..." : "입력하기"}
        </button>
      </div>

      <div className="input-nest">
        {/* Left Subnest */}
        <div
          className="input-subnest"
          id="left-subnest"
          style={{ borderRight: "2px #ddd solid" }}
        >
          <div className="distortion-text">PARAMETER 입력 (필수)</div>
          {["E1", "E2", "E3", "E4", "L1", "L2", "L3", "L4", "RangingError"].map(
            (field) => (
              <div className="input-instance" key={field}>
                <div className="input-instance-label">{field}</div>
                <input
                  className="input_box"
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  disabled={isLoading} // Optional: block input while loading
                />
              </div>
            )
          )}
        </div>

        {/* Right Subnest */}
        <div className="input-subnest" id="right-subnest">
          <div className="distortion-text">
            왜곡값 입력 <span style={{ color: "#8a8a8a" }}>(선택사항)</span>
          </div>

          <div className="input-instance">
            <CheckBoxToggle
              checked={activeFields.delta}
              onToggle={() => handleToggle("delta")}
            />
            𝚫
            <input
              className="input_box"
              name="delta"
              value={formData.delta}
              onChange={handleChange}
              disabled={!activeFields.delta || isLoading}
            />
          </div>

          <div className="input-instance" style={{ gap: "41px" }}>
            <CheckBoxToggle
              checked={activeFields.fd}
              onToggle={() => handleToggle("fd")}
            />
            <div>
              𝒇<sub>𝒅</sub>
            </div>
            <input
              className="input_box"
              name="fd"
              value={formData.fd}
              onChange={handleChange}
              disabled={!activeFields.fd || isLoading}
            />
          </div>

          <div className="input-instance">
            <CheckBoxToggle
              checked={activeFields.sigma}
              onToggle={() => handleToggle("sigma")}
            />
            𝝈
            <input
              className="input_box"
              name="sigma"
              value={formData.sigma}
              onChange={handleChange}
              disabled={!activeFields.sigma || isLoading}
            />
          </div>
        </div>
      </div>

      <div style={{ height: "29px", borderBottom: "2px solid #ddd" }} />

      {/* --- File Upload Section --- */}
      <div className="text-bracket-input-button">
        <div className="text-bracket">파일첨부{" (.json)"}</div>
        <div className="file-info-text">
          {uploadFileName ? uploadFileName : "일반파일 0KB / 최대 10MB"}
        </div>
      </div>

      <div
        className="drag-drop-nest"
        onDrop={!isLoading ? handleFileDrop : null} // Disable drop while loading
        onDragOver={(e) => e.preventDefault()}
        style={{ opacity: isLoading ? 0.5 : 1 }} // Visual cue
      >
        <div className="drag-drop-text">
          <img className="upload" src={upload} alt="upload" />
          {isLoading
            ? "업로드 처리 중..."
            : "첨부파일을 마우스로 끌어 놓으세요"}
        </div>
      </div>
    </div>
  );
};

export default Home;

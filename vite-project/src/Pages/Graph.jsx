import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Graph.css";

import rightArrow from "../assets/free-icon-right-arrow-271228.png";
import leftArrow from "../assets/free-icon-left-arrow-271220.png";

async function saveImage(imageUrl, filename) {
  try {
    if (!imageUrl) throw new Error("No image to save.");
    const resp = await fetch(imageUrl, { mode: "cors" });
    if (!resp.ok) throw new Error("Network response was not ok");
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error(e);
    if (window.confirm("이미지 저장 실패(CORS). 새 탭에서 여시겠습니까?")) {
      window.open(imageUrl, "_blank");
    }
  }
}

const API_BASE = "http://43.203.173.135:8080";

export const Graph = () => {
  const [mode, setMode] = useState("normal");

  // Initial state: loading is TRUE
  const [normal, setNormal] = useState({
    sampleCount: 0,
    imageUrl: "",
    loading: true,
    errorMsg: "",
  });

  const [abnormal, setAbnormal] = useState({
    sampleCount: 0,
    imageUrl: "",
    loading: true,
    errorMsg: "",
  });

  useEffect(() => {
    const endpoint = "/graph";

    const fetchData = async () => {
      try {
        console.log("Fetching data from:", `${API_BASE}/graph`);

        const res = await axios.get(`${API_BASE}/graph`);

        console.log("Response received:", res.data);

        if (res.data?.isSuccess && res.data?.result) {
          const result = res.data.result;

          setNormal({
            sampleCount: result.normalDataNum || 0,
            imageUrl: result.normalDataUrl || "",
            loading: false, // Success: Stop loading
            errorMsg: "",
          });

          setAbnormal({
            sampleCount: result.abnormalDataNum || 0,
            imageUrl: result.abnormalDataUrl || "",
            loading: false, // Success: Stop loading
            errorMsg: "",
          });
        } else {
          throw new Error(res.data?.message || "Invalid Data Format");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        const errMsg = err.message || "서버 연결 실패";

        // ✅ FIX 2: Ensure error state is set if something goes wrong
        setNormal((prev) => ({ ...prev, loading: false, errorMsg: errMsg }));
        setAbnormal((prev) => ({ ...prev, loading: false, errorMsg: errMsg }));
      }
    };

    fetchData();
  }, []);

  const goNext = () => setMode("abnormal");
  const goPrev = () => setMode("normal");

  // --- Render Sections ---

  if (mode === "normal") {
    return (
      <div className="graph-container">
        <div className="graph-section-divider" />
        <div className="graph-section-title">
          Ranging Error Graph (정상 데이터)
        </div>

        <div className="graph-sample-save-wrapper">
          <div className="sample-count">
            샘플 개수: {String(normal.sampleCount)}
          </div>
          <button
            className="save-button"
            onClick={() => saveImage(normal.imageUrl, "normal_graph.png")}
            disabled={!normal.imageUrl}
          >
            저장하기
          </button>
        </div>

        <div className="graph-box">
          {normal.loading ? (
            <div className="result-loading">데이터를 불러오는 중입니다...</div>
          ) : normal.errorMsg ? (
            <div style={{ color: "red", textAlign: "center" }}>
              ⚠️ {normal.errorMsg} <br />
              <button onClick={() => window.location.reload()}>새로고침</button>
            </div>
          ) : normal.imageUrl ? (
            <img
              className="graph-image"
              src={normal.imageUrl}
              alt="Normal Graph"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          ) : (
            <div className="result-empty-message">그래프가 없습니다.</div>
          )}
        </div>

        <div className="arrow-button-container">
          <button className="arrow-button" onClick={goNext}>
            <img src={rightArrow} alt="Next" />
          </button>
        </div>
      </div>
    );
  }

  // Abnormal Mode
  return (
    <div className="abnormal-graph-container">
      <div className="abnormal-section-title">
        Ranging Error Graph (비정상 데이터)
      </div>

      <div className="abnormal-sample-save-wrapper">
        <div className="sample-count">
          샘플 개수: {String(abnormal.sampleCount)}
        </div>
        <button
          className="save-button"
          onClick={() => saveImage(abnormal.imageUrl, "abnormal_graph.png")}
          disabled={!abnormal.imageUrl}
        >
          저장하기
        </button>
      </div>

      <div className="abnormal-graph-box">
        {abnormal.loading ? (
          <div className="result-loading">데이터를 불러오는 중입니다...</div>
        ) : abnormal.errorMsg ? (
          <div style={{ color: "red", textAlign: "center" }}>
            ⚠️ {abnormal.errorMsg}
          </div>
        ) : abnormal.imageUrl ? (
          <img
            src={abnormal.imageUrl}
            alt="Abnormal Graph"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        ) : (
          <div className="result-empty-message">그래프가 없습니다.</div>
        )}
      </div>

      <div className="left-arrow-button-container">
        <button className="arrow-button" onClick={goPrev}>
          <img src={leftArrow} alt="Prev" />
        </button>
      </div>
    </div>
  );
};

export default Graph;

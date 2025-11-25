import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Graph.css";

import rightArrow from "../assets/free-icon-right-arrow-271228.png";
import leftArrow from "../assets/free-icon-left-arrow-271220.png";

/** Common Save Function */
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
    if (window.confirm("이미지 저장에 실패했습니다 (CORS). 새 탭에서 이미지를 여시겠습니까?")) {
      window.open(imageUrl, "_blank");
    }
  }
}

/** Helper to get YYYYMMDD_HHMMSS timestamp */
const getFormattedTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}_${hours}${minutes}${seconds}`;
};

const API_BASE = "http://52.78.10.86:8080";

export const Graph = () => {
  const [mode, setMode] = useState("normal"); // 'normal' or 'abnormal'

  // State for Normal Data
  const [normal, setNormal] = useState({
    sampleCount: 0,
    imageUrl: "",
    loading: true,
    errorMsg: "",
  });

  // State for Abnormal Data
  const [abnormal, setAbnormal] = useState({
    sampleCount: 0,
    imageUrl: "",
    loading: true,
    errorMsg: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Single Call to fetch all data with a 5s timeout
        const res = await axios.get(`${API_BASE}/graph`, { timeout: 5000 });
        
        if (res.data?.isSuccess && res.data?.result) {
          const result = res.data.result;

          // Update Normal State
          setNormal({
            sampleCount: result.normalDataNum || 0,
            imageUrl: result.normalDataUrl || "",
            loading: false,
            errorMsg: "",
          });

          // Update Abnormal State
          setAbnormal({
            sampleCount: result.abnormalDataNum || 0,
            imageUrl: result.abnormalDataUrl || "",
            loading: false,
            errorMsg: "",
          });
        } else {
          throw new Error(res.data?.message || "데이터를 불러올 수 없습니다.");
        }
      } catch (err) {
        console.error("Fetch Error:", err);
        const errMsg = err.message || "서버 연결 실패";
        
        // Set error for both states since they come from the same source
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
        <div className="graph-section-title">Ranging Error Graph (정상 데이터)</div>

        <div className="graph-sample-save-wrapper">
          <div className="sample-count">
            샘플 개수: {String(normal.sampleCount).padStart(8, "0")}
          </div>
          <button
            className="save-button"
            // ✅ Change 2: Use dynamic date+time in filename
            onClick={() => saveImage(normal.imageUrl, `normal_graph_${getFormattedTimestamp()}.png`)}
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
              ⚠️ {normal.errorMsg} <br/>
              <button onClick={() => window.location.reload()}>새로고침</button>
            </div>
          ) : normal.imageUrl ? (
            // ✅ Change 1: Added styles to fit image to frame
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
      <div className="abnormal-section-title">Ranging Error Graph (비정상 데이터)</div>

      <div className="abnormal-sample-save-wrapper">
        <div className="sample-count">
          샘플 개수: {String(abnormal.sampleCount).padStart(8, "0")}
        </div>
        <button
          className="save-button"
          // ✅ Change 2: Use dynamic date+time in filename
          onClick={() => saveImage(abnormal.imageUrl, `abnormal_graph_${getFormattedTimestamp()}.png`)}
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
            // This already had the correct styles, kept for consistency
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
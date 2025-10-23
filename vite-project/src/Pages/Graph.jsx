// src/Pages/Graph.jsx
import { useEffect, useState } from "react";
import axios from "axios";

// ✅ CSS는 통합된 Graph.css 하나만 쓰는 중 (너가 합친 파일)
import "../CSS/Graph.css";

import rightArrow from "../assets/free-icon-right-arrow-271228.png";
import leftArrow from "../assets/free-icon-left-arrow-271220.png";

/** 공통 저장 함수 */
async function saveImage(imageUrl, filename) {
  try {
    if (!imageUrl) throw new Error("저장할 이미지가 없습니다.");
    const resp = await fetch(imageUrl, { mode: "cors" });
    const blob = await resp.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  } catch (e) {
    alert("이미지 저장 실패: " + (e.message || "알 수 없는 오류"));
  }
}

const API_BASE = "http://3.39.225.132:8080";

export const Graph = () => {
  // 어떤 화면을 보여줄지 (normal | abnormal)
  const [mode, setMode] = useState("normal");

  // 정상 데이터
  const [normal, setNormal] = useState({
    sampleCount: 0,
    imageUrl: "",
    loading: true,
    errorMsg: "",
  });

  // 비정상 데이터
  const [abnormal, setAbnormal] = useState({
    sampleCount: 0,
    imageUrl: "",
    loading: true,
    errorMsg: "",
  });

  // 최초 1회: 두 엔드포인트를 동시에 불러와서 캐싱
  useEffect(() => {
    const fetchNormal = axios
      .get(`${API_BASE}/graph/normal`)
      .then((res) => {
        if (res.data?.isSuccess && res.data?.result) {
          setNormal({
            sampleCount: res.data.result.dataNum ?? 0,
            imageUrl: res.data.result.imageUrl ?? "",
            loading: false,
            errorMsg: "",
          });
        } else {
          setNormal((prev) => ({
            ...prev,
            loading: false,
            errorMsg: res.data?.message || "데이터가 없습니다.",
          }));
        }
      })
      .catch((err) =>
        setNormal((prev) => ({
          ...prev,
          loading: false,
          errorMsg:
            "요청 실패: " +
            (err?.response?.data?.message || err.message || "알 수 없는 오류"),
        }))
      );

    const fetchAbnormal = axios
      .get(`${API_BASE}/graph/abnormal/`)
      .then((res) => {
        if (res.data?.isSuccess && res.data?.result) {
          setAbnormal({
            sampleCount: res.data.result.dataNum ?? 0,
            imageUrl: res.data.result.imageUrl ?? "",
            loading: false,
            errorMsg: "",
          });
        } else {
          setAbnormal((prev) => ({
            ...prev,
            loading: false,
            errorMsg: res.data?.message || "데이터가 없습니다.",
          }));
        }
      })
      .catch((err) =>
        setAbnormal((prev) => ({
          ...prev,
          loading: false,
          errorMsg:
            "요청 실패: " +
            (err?.response?.data?.message || err.message || "알 수 없는 오류"),
        }))
      );

    // 병렬 호출
    Promise.allSettled([fetchNormal, fetchAbnormal]);
  }, []);

  // 화면 전환 (페이지 로드 없이)
  const goNext = () => setMode("abnormal");
  const goPrev = () => setMode("normal");

  // =========================
  //  정상 섹션 (class 유지)
  // =========================
  const NormalSection = (
    <div className="graph-container">
      <div className="graph-section-divider" />

      <div className="graph-section-title">Ranging Error Graph (정상 데이터)</div>

      <div className="graph-sample-save-wrapper">
        <div className="sample-count">
          샘플 개수: {String(normal.sampleCount).padStart(8, "0")}
        </div>
        <button
          className="save-button"
          onClick={() => saveImage(normal.imageUrl, "normal_graph.png")}
        >
          저장하기
        </button>
      </div>

      <div className="graph-box">
        {normal.loading ? (
          <div>불러오는 중...</div>
        ) : normal.errorMsg ? (
          <div style={{ color: "red" }}>{normal.errorMsg}</div>
        ) : normal.imageUrl ? (
          <img
            className="graph-image"
            src={normal.imageUrl}
            alt="Normal Graph"
            style={{ display: "block" }}
          />
        ) : (
          <div>그래프가 없습니다.</div>
        )}
      </div>

      {/* ▶ 오른쪽 화살표: 비정상으로 전환 */}
      <div className="arrow-button-container">
        <button
          className="arrow-button"
          onClick={goNext}
          style={{ background: "none", border: "none", padding: 0 }}
          aria-label="Go to abnormal graph"
          title="비정상 데이터 보기"
        >
          <img src={rightArrow} alt="" />
        </button>
      </div>
    </div>
  );

  // =========================
  //  비정상 섹션 (class 유지)
  // =========================
  const AbnormalSection = (
    <div className="abnormal-graph-container">
      <div className="abnormal-section-title">
        Ranging Error Graph (비정상 데이터)
      </div>

      <div className="abnormal-sample-save-wrapper">
        <div className="sample-count">
          샘플 개수: {String(abnormal.sampleCount).padStart(8, "0")}
        </div>
        <button
          className="save-button"
          onClick={() => saveImage(abnormal.imageUrl, "abnormal_graph.png")}
        >
          저장하기
        </button>
      </div>

      <div className="abnormal-graph-box">
        {abnormal.loading ? (
          <div>불러오는 중...</div>
        ) : abnormal.errorMsg ? (
          <div style={{ color: "red" }}>{abnormal.errorMsg}</div>
        ) : abnormal.imageUrl ? (
          <img
            src={abnormal.imageUrl}
            alt="Abnormal Graph"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        ) : (
          <div>그래프가 없습니다.</div>
        )}
      </div>

      {/* ◀ 왼쪽 화살표: 정상으로 전환 */}
      <div className="left-arrow-button-container">
        <button
          className="arrow-button"
          onClick={goPrev}
          style={{ background: "none", border: "none", padding: 0 }}
          aria-label="Back to normal graph"
          title="정상 데이터 보기"
        >
          <img src={leftArrow} alt="" />
        </button>
      </div>
    </div>
  );

  // 현재 모드에 따라 한 섹션만 표시 (페이지 이동 없음)
  return mode === "normal" ? NormalSection : AbnormalSection;
};

// (원래 파일처럼 named export 유지 – 컴포넌트/클래스명 변경 없음)
export const AbnormalGraph = () => null; // 라우팅은 안 쓰지만 export는 남김(호환용)
export default Graph;

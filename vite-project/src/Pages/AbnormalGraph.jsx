import "../CSS/AbnormalGraph.css";
import { Link } from "react-router-dom";
import leftArrow from "../assets/free-icon-left-arrow-271220.png"; // 왼쪽 화살표 이미지
import axios from "axios";
import { useEffect, useState } from "react";

const AbnormalGraph = () => {
  const [sampleCount, setSampleCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
  const apiURL = "http://3.39.225.132:8080";
  const endpoint = "/graph/abnormal";

  axios
    .get(apiURL + endpoint)
    .then((res) => {
      if (res.data?.isSuccess && res.data?.result) {
        setSampleCount(res.data.result.dataNum ?? 0);
        setImageUrl(res.data.result.imageUrl ?? "");
      } else {
        setErrorMsg(res.data?.message || "데이터가 없습니다.");
      }
    })
    .catch((err) => {
      setErrorMsg("요청 실패: " + (err?.response?.data?.message || err.message || "알 수 없는 오류"));
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  // 이미지 저장
  const handleSaveImage = async () => {
    try {
      const resp = await fetch(imageUrl, { mode: "cors" });
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "abnormal_graph.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("이미지 저장 실패: " + (e.message || "알 수 없는 오류"));
    }
  };

  return (
    <div className="abnormal-graph-container">

      <div className="abnormal-section-title">
        Ranging Error Graph (비정상 데이터)
      </div>

      <div className="abnormal-sample-save-wrapper">
        <div className="sample-count">샘플 개수:{String(sampleCount).padStart(8, "0")}0</div>
        <button className="save-button" onClick={handleSaveImage}>저장하기</button>
      </div>

      <div className="abnormal-graph-box">
                {loading ? (
          <div>불러오는 중...</div>
        ) : errorMsg ? (
          <div style={{ color: "red" }}>{errorMsg}</div>
        ) : imageUrl ? (
          <img
            src={imageUrl}
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

      {/* 왼쪽 화살표 */}
      <div className="left-arrow-button-container">
        <Link to="/graph">
          <img className="arrow-button" src={leftArrow} alt="Back to graph" />
        </Link>
      </div>
    </div>
  );
};

export default AbnormalGraph;

import "../CSS/Graph.css";
import { Link } from "react-router-dom";
import rightArrow from "../assets/free-icon-right-arrow-271228.png";
import axios from "axios";
import { useEffect, useState } from "react";

const Graph = () => {
  const [sampleCount, setSampleCount] = useState(0);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const apiURL = "http://3.39.225.132:8080";
    const endpoint = "/graph/normal";
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
        setErrorMsg(
          "요청 실패: " +
            (err?.response?.data?.message || err.message || "알 수 없는 오류")
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSaveImage = async () => {
    try {
      const resp = await fetch(imageUrl, { mode: "cors" });
      const blob = await resp.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "normal_graph.png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      alert("이미지 저장 실패: " + (e.message || "알 수 없는 오류"));
    }
  };

  return (
    <div className="graph-container">
      <div className="graph-section-divider" />

      <div className="graph-section-title">
        Ranging Error Graph (정상 데이터)
      </div>

      <div className="graph-sample-save-wrapper">
        <div className="sample-count">샘플 개수: 00000000</div>
        <button className="save-button">저장하기</button>
      </div>

      <div className="graph-box">{/* graphImage */}</div>

      <div className="arrow-button-container">
        <Link to="/abnormal-graph">
          <img className="arrow-button" src={rightArrow} alt="Next page" />
        </Link>
      </div>
    </div>
  );
};

export default Graph;

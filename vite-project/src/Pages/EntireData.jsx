import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../CSS/EntireData.css";

const EntireData = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const apiURL = "http://52.78.10.86:8080";

  useEffect(() => {
    const endpoint = "/data/get";
    // Added ?_t timestamp to prevent browser caching
    axios
      .get(`${apiURL}${endpoint}?_t=${Date.now()}`)
      .then((res) => {
        let dataListInstance = res.data?.result?.getAllDataResponseDTO || [];
        
        // Optional: Sort by newest first (descending)
        dataListInstance.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setDataList(dataListInstance);
      })
      .catch((err) => {
        alert(
          err.response?.data?.message ||
            "데이터를 불러오는 중 오류가 발생했습니다."
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm(`정말로 Data ${id}를 삭제하시겠습니까?`)) return;

    try {
      setDeletingId(id);
      const res = await axios.delete(`${apiURL}/data/${id}`);
      if (res.data?.isSuccess) {
        setDataList((prev) => prev.filter((item) => item.id !== id));
        alert(`Data ${id}가 성공적으로 삭제되었습니다.`);
      } else {
        alert(`삭제 실패: ${res.data?.message || "원인을 알 수 없습니다."}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="ed-loading">데이터를 불러오는 중...</div>;

  return (
    <div className="ed-container">
      <div className="ed-head">
        <div className="ed-head-text">전체 데이터 확인 ({dataList.length}건)</div>
        <div className="ed-head-button-nest">
          <Link to="/">
            <button className="ed-button-save">저장하기</button>
          </Link>
          <Link to="/">
            <button className="ed-button-export">내보내기</button>
          </Link>
        </div>
      </div>

      <div className="ed-item-nest">
        {dataList.length === 0 ? (
          <div className="ed-empty-message">저장된 데이터가 없습니다.</div>
        ) : (
          <ul className="ed-item-list">
            {dataList.map((item, index) => (
              <li key={item.id} className="ed-data-item">
                <div className="ed-data-item-label">Data {index + 1}</div>
                <div className="ed-data-item-content">
                  <div className="ed-data-label-nest">
                    <div className="ed-data-label">
                      <div className="ed-data-param-label">입력값</div>
                      <div className="ed-data-divider">|</div>
                    </div>
                    <div style={{ height: "65px" }}> </div>
                    <div className="ed-data-label">
                      <div className="ed-data-prediction-label">예측결과</div>
                      <div className="ed-data-divider">|</div>
                    </div>
                  </div>

                  <div className="ed-data-nest">
                    <div className="ed-data-param" id="row-1">
                      <div className="ed-data">E1: {item.e1?.toFixed(4)}</div>
                      <div className="ed-data">E2: {item.e2?.toFixed(4)}</div>
                      <div className="ed-data">E3: {item.e3?.toFixed(4)}</div>
                      <div className="ed-data">E4: {item.e4?.toFixed(4)}</div>
                      <div className="ed-data">L1: {item.l1?.toFixed(4)}</div>
                      <div className="ed-data">L2: {item.l2?.toFixed(4)}</div>
                      <div className="ed-data">L3: {item.l3?.toFixed(4)}</div>
                      <div className="ed-data">L4: {item.l4?.toFixed(4)}</div>
                    </div>

                    <div className="ed-data-param" id="row-2">
                      <div className="ed-data">𝚫 : {item.delta?.toFixed(4)}</div>
                      <div className="ed-data">σ : {item.sigma?.toFixed(4)}</div>
                      <div className="ed-data">
                        <div>
                          𝒇
                          <sub>𝒅</sub>
                        </div>
                        &nbsp;: {item.fd}
                      </div>
                    </div>

                    <div className="ed-data-prediction-button-nest">
                      <div className="ed-data-prediction">
                        <div className="ed-data-prediction-status">
                          {item.prediction} ({(item.probability * 100).toFixed(2)}%)
                        </div>
                        <div className="ed-data-divider"> | </div>
                        <div className="ed-data-ranging-error">
                          Err: {item.rangingError}m
                        </div>
                        
                        {/* ✅ Timestamp Added Here */}
                        <div className="ed-data-divider"> | </div>
                        <div style={{ fontSize: "16px", color: "#666" }}>
                           {new Date(item.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="ed-data-delete-nest">
                        <button
                          className="ed-data-delete-button"
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id
                            ? "삭제 중..."
                            : "데이터 삭제"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EntireData;
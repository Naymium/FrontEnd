import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../CSS/EntireData.css"; // Ensures Shared.css (with spinner styles) is loaded

const EntireData = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const apiURL = "http://43.203.173.135:8080";

  useEffect(() => {
    const endpoint = "/data/get";
    // Add timestamp to prevent caching
    axios
      .get(`${apiURL}${endpoint}?_t=${Date.now()}`)
      .then((res) => {
        let dataListInstance = res.data?.result?.getAllDataResponseDTO || [];
        // Sort by newest first
        dataListInstance.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
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

  const handleSave = () => {
    if (dataList.length === 0) {
      alert("저장할 데이터가 없습니다.");
      return;
    }

    const blob = new Blob([JSON.stringify(dataList, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `entire_data_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExport = () => {
    if (dataList.length > 0) {
      console.log("Exporting all data:", dataList);
      alert(`전체 데이터 ${dataList.length}건을 내보냈습니다. (콘솔 확인)`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`정말로 이 Sample을 삭제하시겠습니까?`)) return;

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

  // ✅ UPDATED: Matching the Home.jsx spinner style
  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <div className="loading-text">
          전체 데이터를 불러오는 중입니다...
        </div>
      </div>
    );
  }

  return (
    <div className="ed-container">
      <div className="ed-head">
        <div className="ed-head-text">
          전체 데이터 확인 ({dataList.length}건)
        </div>
        <div className="ed-head-button-nest">
          <button
            className="ed-button-save"
            onClick={handleSave}
            disabled={dataList.length === 0}
            style={{
              cursor: dataList.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            저장하기
          </button>

          <button
            className="ed-button-export"
            onClick={handleExport}
            disabled={dataList.length === 0}
            style={{
              cursor: dataList.length === 0 ? "not-allowed" : "pointer",
            }}
          >
            내보내기
          </button>
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
                      <div className="ed-data">
                        𝚫 : {item.delta?.toFixed(4)}
                      </div>
                      <div className="ed-data">
                        σ : {item.sigma?.toFixed(4)}
                      </div>
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
                          {item.prediction} (
                          {(item.probability * 100).toFixed(2)}%)
                        </div>
                        <div className="ed-data-divider"> | </div>
                        <div className="ed-data-ranging-error">
                          Ranging Error: {item.rangingError}
                          {" [m]"}
                        </div>
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
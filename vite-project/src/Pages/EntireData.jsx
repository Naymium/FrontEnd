import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../CSS/EntireData.css";

const EntireData = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const apiURL = "http://3.39.225.132:8080";

  useEffect(() => {
    const endpoint = "/data/get";
    axios
      .get(apiURL + endpoint)
      .then((res) => {
        const dataListInstance = res.data?.result?.getAllDataResponseDTO || [];
        setDataList(dataListInstance);
      })
      .catch((err) => {
        alert(err.response?.data?.message || "데이터를 불러오는 중 오류가 발생했습니다.");
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
        <div className="ed-head-text">전체 데이터 확인</div>
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
            {dataList.map((item) => (
              <li key={item.id} className="ed-data-item">
                <div className="ed-data-item-label">Data {item.id}</div>
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
                      <div className="ed-data">E1: {item.e1}</div>
                      <div className="ed-data">E2: {item.e2}</div>
                      <div className="ed-data">E3: {item.e3}</div>
                      <div className="ed-data">E4: {item.e4}</div>
                      <div className="ed-data">L1: {item.l1}</div>
                      <div className="ed-data">L2: {item.l2}</div>
                      <div className="ed-data">L3: {item.l3}</div>
                      <div className="ed-data">L4: {item.l4}</div>
                    </div>

                    <div className="ed-data-param" id="row-2">
                      <div className="ed-data">𝚫: {item.delta}</div>
                      <div className="ed-data">
                        𝒇
                        <sub>
                          <sub>𝒅</sub>
                        </sub>
                        : {item.fd}
                      </div>
                      <div className="ed-data">σ: {item.sigma}</div>
                    </div>

                    <div className="ed-data-prediction-button-nest">
                      <div className="ed-data-prediction">
                        <div className="ed-data-prediction-status">
                          {item.prediction} (확률: {item.probability})
                        </div>
                        <div className="ed-data-divider"> | </div>
                        <div className="ed-data-ranging-error">
                          Ranging Error: {item.rangingError} [m]
                        </div>
                      </div>

                      <div className="ed-data-delete-nest">
                        <button
                          className="ed-data-delete-button"
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                        >
                          {deletingId === item.id ? "삭제 중..." : "데이터 삭제"}
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

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../CSS/EntireData.css";

const EntireData = () => {
  const [dataList, setDataList] = useState([]);

  const localTestData = {
    result: {
      getAllDataResponseDTO: [
        {
          id: 1,
          e1: 0.0,
          e2: 0.0,
          e3: 0.0,
          e4: 0.0,
          l1: 0.0,
          l2: 0.0,
          l3: 0.0,
          l4: 0.0,
          delta: 0.0,
          fd: 0.0,
          sigma: 0.0,
          predictionStatus: "비정상",
          predictionProbability: "00.00%",
          rangingError: "2.15",
        },
        {
          id: 2,
          e1: 0.1234,
          e2: 0.5678,
          e3: 0.9876,
          e4: 0.5432,
          l1: 0.1235,
          l2: 0.5679,
          l3: 0.9877,
          l4: 0.5433,
          delta: 0.1234,
          fd: 0.5678,
          sigma: 0.9876,
          predictionStatus: "정상",
          predictionProbability: "99.99%",
          rangingError: "0.05",
        },
        {
          id: 3,
          e1: 0.101,
          e2: 0.202,
          e3: 0.303,
          e4: 0.404,
          l1: 0.505,
          l2: 0.606,
          l3: 0.707,
          l4: 0.808,
          delta: 0.909,
          fd: 0.1111,
          sigma: 0.2222,
          predictionStatus: "비정상",
          predictionProbability: "85.45%",
          rangingError: "1.50",
        },
      ],
    },
  };

  useEffect(() => {
    // Use the local data directly
    const dataListInstance = localTestData.result.getAllDataResponseDTO;
    setDataList(dataListInstance);
    console.log(dataListInstance);
  }, []);

  // useEffect(() => {
  //   const apiURL = "http://3.39.225.132:8080";
  //   const endpoint = "/data/get";

  //   axios
  //     .get(apiURL + endpoint)
  //     .then((res) => {
  //       const dataListInstance = res.data?.result?.getAllDataResponseDTO || [];
  //       setDataList(dataListInstance);
  //       console.log(dataListInstance);
  //     })

  //     .catch((err) => {
  //       alert(err.response.data.message);
  //     });
  // }, []);

  return (
    <div className="ed-container">
      <div className="ed-line" />
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
        <ul className="ed-item-list">
          {dataList.map((item) => (
            <li key={item.id} className="ed-data-item">
              <div className="ed-data-item-label">샘플 {item.id}</div>
              <div className="ed-data-item-content">
                <div className="ed-data-label-nest">
                  <div className="ed-data-label">
                    <div className="ed-data-param-label">입력값</div>
                    <div className="ed-data-divider">|</div>
                  </div>
                  <div style={{ height: "65px" }}> </div>
                  <div className="ed-data-label">
                    <div className="ed-data-prediction-label">예측결과</div>{" "}
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
                    <div className="ed-data">fd: {item.fd}</div>
                    <div className="ed-data">σ: {item.sigma}</div>
                  </div>
                  <div className="ed-data-prediction-button-nest">
                    <div className="ed-data-prediction">
                      <div className="ed-data-prediction-status">
                        {item.predictionStatus} (확률:{" "}
                        {item.predictionProbability})
                      </div>{" "}
                      <div className="ed-data-divider"> | </div>
                      <div className="ed-data-ranging-error">
                        Ranging Error: {item.rangingError} [m]
                      </div>
                    </div>
                    <div className="ed-data-delete-nest">
                      <button className="ed-data-delete-button">
                        데이터 삭제
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EntireData;

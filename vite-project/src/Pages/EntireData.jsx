import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import "../CSS/EntireData.css";

const EntireData = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    const apiURL = "http://3.39.225.132:8080";
    const endpoint = "/data/get";

    axios
      .get(apiURL + endpoint)
      .then((res) => {
        const dataListInstance = res.data?.result?.getAllDataResponseDTO || [];
        setDataList(dataListInstance);
        console.log(dataListInstance);
      })

      .catch((err) => {
        alert(err.response.data.message);
      });
  }, []);

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
      <div className="ed-sample-nest">
        <ul>
          {dataList.map((item) => (
            <li key={item.id}>
                Prediction: {item.prediction}, FD: {item.fd}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EntireData;

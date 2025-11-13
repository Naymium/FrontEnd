import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../CSS/Results.css";

const Results = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true); // ✅ 로딩 상태 추가
  const location = useLocation();

  const apiURL = "http://3.39.225.132:8080";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // ✅ 데이터 요청 시작 시 true로 설정
      try {
        const endpoint = "/data/get";
        const res = await axios.get(apiURL + endpoint);
        const dataListInstance = res.data?.result?.getAllDataResponseDTO || [];

        if (dataListInstance.length > 0) {
          // createdAt 기준 최신 데이터 선택
          const latest = dataListInstance.reduce((latest, current) =>
            new Date(current.createdAt) > new Date(latest.createdAt)
              ? current
              : latest
          );
          setDataList([latest]); // 최신 데이터만 저장
        } else {
          setDataList([]);
        }
      } catch (err) {
        alert(
          err.response?.data?.message ||
            "데이터를 불러오는 중 오류가 발생했습니다."
        );
      } finally {
        setLoading(false); // ✅ 요청 완료 후 false로 변경
      }
    };

    fetchData();
  }, [location.state]);

  const handleSave = () => {
    const blob = new Blob([JSON.stringify(dataList, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "results.json";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExport = async () => {
    console.log("Exporting results:", dataList);
    alert("결과를 내보냈습니다. (현재는 콘솔 출력)");
  };

  // ✅ 로딩 중일 때 표시
  if (loading) {
    return (
      <div className="results-container">
        <div className="loading-text">데이터를 불러오는 중입니다...</div>
      </div>
    );
  }

  return (
    <div className="results-container">
      <div className="result-save-export-nest">
        <div className="result-text">결과</div>
        <div className="button-nest">
          <button className="save-button" onClick={handleSave}>
            저장하기
          </button>
          <button className="export-button" onClick={handleExport}>
            내보내기
          </button>
        </div>
      </div>

      <div className="sample-nest">
        {dataList.length > 0 ? (
          dataList.map((item, index) => (
            <li key={item.id}>
              <div className="sample-instance">SAMPLE {index + 1}</div>
              <div className="sample-instance-detail">
                <div className="sample-instance-prediction">
                  예측 결과: <b>{item.prediction}</b>
                </div>
                <div className="sample-instance-probability">
                  확률: {item.probability.toFixed(3)}
                </div>
                <div className="sample-instance-ranging-error">
                  Ranging Error: {item.rangingError}
                </div>
                <div className="sample-instance-time">
                  측정 시각: {new Date(item.createdAt).toLocaleString()}
                </div>
              </div>
            </li>
          ))
        ) : (
          <div className="no-result-text">표시할 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default Results;

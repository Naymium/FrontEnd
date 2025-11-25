import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/Results.css";

const Results = () => {
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiURL = "http://52.78.10.86:8080";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // ✅ Fix 1: Add a timestamp query to prevent Browser Caching
        const res = await axios.get(`${apiURL}/data/get?_t=${Date.now()}`);
        let allData = res.data?.result?.getAllDataResponseDTO || [];

        if (allData.length > 0) {
          // ✅ Fix 2: Explicit Sort (Newest Date First)
          // This ensures that index 0 is always the absolute latest
          allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          // 🔍 Debugging: Check the Console (F12) to see what dates were fetched
          console.log("Total items fetched:", allData.length);
          console.log("Newest item date:", allData[0].createdAt);
          console.log("Oldest item date:", allData[allData.length - 1].createdAt);

          // Helper: Convert to seconds timestamp
          const toSeconds = (dateStr) => {
            const d = new Date(dateStr);
            d.setMilliseconds(0);
            return d.getTime();
          };

          // The first item is now guaranteed to be the latest
          const latestTimestamp = toSeconds(allData[0].createdAt);

          // Filter all items that match this latest second
          const recentGroup = allData.filter(
            (item) => toSeconds(item.createdAt) === latestTimestamp
          );

          setDataList(recentGroup);
        } else {
          setDataList([]);
        }
      } catch (err) {
        console.error(err);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSave = () => {
    if (dataList.length === 0) return;
    const blob = new Blob([JSON.stringify(dataList, null, 2)], {
      type: "application/json",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `latest_results_${new Date()
      .toISOString()
      .slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExport = () => {
    if (dataList.length > 0) {
      console.log("Exporting filtered results:", dataList);
      alert(`최신 데이터 ${dataList.length}건을 내보냈습니다.`);
    }
  };

  if (loading)
    return <div className="result-loading">데이터를 불러오는 중...</div>;

  return (
    <div className="result-container">
      {/* Header */}
      <div className="result-head">
        <div className="result-head-text">
          최신 결과 확인 ({dataList.length}건)
        </div>
        <div className="result-head-button-nest">
          <button
            className="result-button-save"
            onClick={handleSave}
            disabled={dataList.length === 0}
          >
            저장하기
          </button>
          <button
            className="result-button-export"
            onClick={handleExport}
            disabled={dataList.length === 0}
          >
            내보내기
          </button>
        </div>
      </div>

      {/* List */}
      <div className="result-item-nest">
        {dataList.length === 0 ? (
          <div className="result-empty-message">
            표시할 최신 데이터가 없습니다.
          </div>
        ) : (
          <ul className="result-item-list">
            {dataList.map((item, index) => (
              <li key={item.id} className="result-data-item">
                <div className="result-data-item-label">Result {index + 1}</div>

                <div className="result-data-item-content">
                  {/* Left Label Column */}
                  <div className="result-data-label-nest">
                    <div className="result-data-label">
                      <div className="result-data-param-label">입력값</div>
                      <div className="result-data-divider">|</div>
                    </div>
                    {/* Spacer */}
                    <div style={{ height: "65px" }}> </div>
                    <div className="result-data-label">
                      <div className="result-data-prediction-label">
                        예측결과
                      </div>
                      <div className="result-data-divider">|</div>
                    </div>
                  </div>

                  {/* Right Data Column */}
                  <div className="result-data-nest">
                    {/* Row 1: 8 Inputs */}
                    <div className="result-data-param" id="row-1">
                      <div className="result-data">
                        E1: {item.e1?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        E2: {item.e2?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        E3: {item.e3?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        E4: {item.e4?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        L1: {item.l1?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        L2: {item.l2?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        L3: {item.l3?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        L4: {item.l4?.toFixed(4)}
                      </div>
                    </div>

                    {/* Row 2: Calculated Params */}
                    <div className="result-data-param" id="row-2">
                      <div className="result-data">
                        𝚫 : {item.delta?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        σ : {item.sigma?.toFixed(4)}
                      </div>
                      <div className="result-data">
                        <div>
                          𝒇<sub>𝒅</sub>
                        </div>
                        &nbsp;: {item.fd}
                      </div>
                    </div>

                    {/* Bottom Row: Prediction & Time */}
                    <div className="result-data-prediction-button-nest">
                      <div className="result-data-prediction">
                        <div className="result-data-prediction-status">
                          {item.prediction} (
                          {(item.probability * 100).toFixed(2)}%)
                        </div>
                        <div className="result-data-divider"> | </div>
                        <div className="result-data-ranging-error">
                          Err: {item.rangingError}m
                        </div>
                      </div>

                      <div className="result-data-timestamp">
                        {new Date(item.createdAt).toLocaleString()}
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

export default Results;
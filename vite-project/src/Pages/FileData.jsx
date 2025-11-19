import { useEffect, useState } from "react";
import "../CSS/FileData.css";
import { getAllFiles, deleteFile } from "../services/fileService";

const FileData = () => {
  const [dataList, setDataList] = useState([]); // 전체 파일 목록
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [confirmId, setConfirmId] = useState(null);

  // ✅ 1) 파일 목록 불러오기
useEffect(() => {
  (async () => {
    try {
      const files = await getAllFiles();
      setDataList(files);
    } catch (e) {
      console.error("📛 getAllFiles error:", e);
      // 여기가 추가 포인트
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "파일 목록을 불러오는 데 실패했습니다.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  })();
}, []);


  // ✅ 2) 파일 열기 (백엔드가 fileUrl 제공)
  const onOpen = (row) => {
    if (!row.fileUrl) return alert("파일 URL이 없습니다.");
    window.open(row.fileUrl, "_blank");
  };

  // ✅ 3) 삭제 모달 열기
  const onDelete = (row) => setConfirmId(row.id);

  // ✅ 4) 삭제 확정
  const onConfirmDelete = async () => {
    try {
      const res = await deleteFile(confirmId);
      if (res?.isSuccess) {
        alert("삭제 완료!");
        // 목록 새로고침
        const updated = dataList.filter((f) => f.id !== confirmId);
        setDataList(updated);
      } else {
        alert(res?.message || "삭제 실패");
      }
    } catch (e) {
      alert("삭제 중 오류 발생");
    } finally {
      setConfirmId(null);
    }
  };

  const onCancelDelete = () => setConfirmId(null);

  // ✅ 페이지네이션
  const pageCount = Math.ceil(dataList.length / pageSize);
  const start = (page - 1) * pageSize;
  const rows = dataList.slice(start, start + pageSize);

  if (loading) return <div className="loading">로딩 중...</div>;
  if (errorMsg) return <div className="error">{errorMsg}</div>;

  return (
    <div className="filedata-container">
      <h2 className="title">저장된 파일 데이터 확인</h2>

      <div className="table">
        <div className="thead">
          <div>No.</div>
          <div>파일명</div>
          <div>데이터 개수</div>
          <div>저장 날짜</div>
          <div>열기</div>
          <div>삭제</div>
        </div>

        <div className="tbody">
          {rows.map((row, idx) => (
            <div className="tr" key={row.id}>
              <div>{start + idx + 1}</div>
              <div>{row.fileName}</div>
              <div>{row.dataNum}</div>
              <div>{new Date(row.createdAt).toLocaleDateString()}</div>
              <div>
                <button className="open-btn" onClick={() => onOpen(row)}>
                  열기
                </button>
              </div>
              <div>
                <button className="delete-btn" onClick={() => onDelete(row)}>
                  데이터 삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 페이지네이션 */}
      <div className="pagination">
        <button
          className="nav"
          disabled={page === 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          〈
        </button>

        {Array.from({ length: pageCount }).map((_, i) => (
          <button
            key={i}
            className={`page ${page === i + 1 ? "active" : ""}`}
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}

        <button
          className="nav"
          disabled={page === pageCount}
          onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
        >
          〉
        </button>
      </div>

      {/* 삭제 모달 */}
      {confirmId !== null && (
        <div className="modal-backdrop" onClick={onCancelDelete}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <p>
              해당 파일 내 데이터들이 모두 삭제됩니다.
              <br />
              삭제하시겠습니까?
            </p>
            <div className="modal-actions">
              <button onClick={onCancelDelete}>취소</button>
              <button onClick={onConfirmDelete}>확인</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileData;

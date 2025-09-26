import { useState, useMemo } from "react";
import "../CSS/FileData.css";

const FileData = () => {
  // 더미 데이터 (API 연동 전까지 사용)
  const mock = useMemo(
    () =>
      Array.from({ length: 42 }).map((_, i) => ({
        id: i + 1,
        filename: `dataset_${i + 1}.csv`,
        count: Math.floor(Math.random() * 1000),
        savedAt: "2025-08-17",
      })),
    []
  );

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const pageCount = Math.ceil(mock.length / pageSize);
  const start = (page - 1) * pageSize;
  const rows = mock.slice(start, start + pageSize);

  // 삭제 모달 상태
  const [confirmId, setConfirmId] = useState(null);

  const onOpen = (row) => {
    alert(`"${row.filename}" 열기`);
  };

  const onDelete = (row) => {
    setConfirmId(row.id);
  };

  const onConfirmDelete = () => {
    alert(`${confirmId}번 파일 삭제 완료 (데모)`);
    setConfirmId(null);
  };

  const onCancelDelete = () => setConfirmId(null);

  return (
    <div className="filedata-container">
      {/* 제목 */}
      <h2 className="title">저장된 파일 데이터 확인</h2>

      {/* 테이블 */}
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
              <div>{row.filename}</div>
              <div>{row.count}</div>
              <div>{row.savedAt}</div>
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

      {/* 삭제 확인 모달 */}
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

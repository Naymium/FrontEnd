import axios from "axios";

const BASE = "http://43.203.173.135:8080";

// 전체 파일 목록 가져오기
export async function getAllFiles() {
  const { data } = await axios.get(`${BASE}/file/get`);
  // Swagger 구조에 맞게 result.getAllFileResponseDTO 추출
  return data?.result?.getAllFileResponseDTO || [];
}

// 특정 파일 삭제하기

export async function deleteFile(fileId) {
  const { data } = await axios.delete(`${BASE}/file/${fileId}`);
  return data;
}
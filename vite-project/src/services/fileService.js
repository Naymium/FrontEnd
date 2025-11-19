import axios from "axios";

const BASE = "http://3.39.225.132:8080";

// 전체 파일 목록 가져오기
export async function getAllFiles() {
  const { data } = await axios.get(`${BASE}/file/get`);
  // Swagger 구조에 맞게 result.getAllFileResponseDTO 추출
  return data?.result?.getAllFileResponseDTO || [];
}

// 특정 파일 삭제하기
export async function deleteFile(id) {
  const { data } = await axios.delete(`${BASE}/file/{fildID}`, {
    params: { id }, // Swagger 문서에서 path가 아닌 query로 받을 경우
  });
  return data;
}

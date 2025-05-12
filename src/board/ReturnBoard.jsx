import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ReturnBoard = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/board/list");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();   //응답 데이터를 JSON 형태로 파싱합니다.
      console.log("서버 응답:", data);

      // ✅ 객체를 배열로 변환
      const boardList = Object.entries(data).map(([id, title]) => ({  //배열을 순회하면서 게시판 데이터 형태로 가공합니다.  //
        //당초 예상: data가 배열 또는 data.boards라고 생각
        //실제 서버: key-value 객체였음 → Object.entries()로 변환해야만 map()으로 돌릴 수 있음.

        board_id: id,
        title: title,
        writer: "작성자 없음",       // 서버에서 writer 정보가 없으니 기본값
        date: "날짜 없음"           // 서버에서 date 정보가 없으니 기본값
      }));

      console.log("변환된 boardList:", boardList);
      setBoards(boardList);   //이걸 setBoards()로 넣으면 게시판 목록이 완성됩니다.
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>게시판 목록</h4>
        <Link to="/board/write" className="btn btn-outline-secondary">글쓰기</Link>
      </div>
      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">날짜</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board, idx) => (
            <tr key={board.board_id}>
              <td>{idx + 1}</td>
              <td>
                <Link to={`/component/place{board.board_id}`} className="text-decoration-none">
                  {board.title}
                </Link>
              </td>
              <td>{board.writer}</td>
              <td>{board.date || "시간없음"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReturnBoard;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBoards = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/board/list");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("서버 응답:", data);

      // 서버 응답이 객체 형태일 경우 배열로 변환
      const boardList = Object.entries(data).map(([id, item]) => ({
        board_id: id,
        title: item.title ?? "제목 없음",
        writer: item.memberId ?? "작성자 없음",
        date: item.regDate ?? "날짜 없음"
      }));

      console.log("변환된 boardList:", boardList);
      setBoards(boardList);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  if (loading) return <div className="text-center mt-5">로딩 중...</div>;
  if (error) return <div className="text-danger mt-5">에러 발생: {error.message}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>게시판 목록</h4>
        <Link to="/board/write" className="btn btn-primary">글쓰기</Link>
      </div>

      <table className="table table-hover">
        <thead className="table-light">
          <tr>
            <th scope="col">#</th>
            <th scope="col">제목</th>
            <th scope="col">작성자</th>
            <th scope="col">날짜</th>
            <th scope="col">수정</th> {/* 수정 열 추가 */}
          </tr>
        </thead>
        <tbody>
          {boards.map((board, idx) => (
            <tr key={board.board_id}>
              <td>{idx + 1}</td>
              <td>
                <Link to={`/component/place/${board.board_id}`} className="text-decoration-none">
                  {board.title}
                </Link>
              </td>
              <td>{board.writer}</td>
              <td>{board.date}</td>
              <td>
                <Link to="/component/page/change" className="btn btn-sm btn-outline-primary">
                  수정
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <footer className="text-body-secondary py-4 bg-light">
        <div className="container">
          <p className="float-end mb-1">
            <a href="/">Back to Top</a>
          </p>
          <p className="mb-1">Album example is © Bootstrap, customize it as you like!</p>
          <p className="mb-0">
            New to Bootstrap? <a href="/">Visit the homepage</a> or read the{" "}
            <a href="/docs/5.3/getting-started/introduction/">getting started guide</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BoardList;

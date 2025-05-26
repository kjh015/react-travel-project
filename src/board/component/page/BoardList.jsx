import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../../common/Navbar";
import BoardApiClient from "../../service/BoardApiClient";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getBoardList = async () => {
    setLoading(true);
    try {
      BoardApiClient.getBoardList().then(
        res => {
          if (res.ok) {
            res.json().then(data => {
              console.log(data);
              setBoards(data);
              console.log("get success");
            });
          } else {
            console.log("response error");
          }
        }
      )
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.substring(0, 16).replace("T", " ");
  };

  useEffect(() => {
    getBoardList();
  }, []);

  if (loading) return <div className="text-center mt-5">로딩 중...</div>;
  if (error) return <div className="text-danger mt-5">에러 발생: {error.message}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 style={{ marginTop: '80px' }}>게시판 목록</h4>
        <Link to="/board/write" className="btn btn-primary">글쓰기</Link>
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
          {boards.map((board) => (
            <tr key={board.id}>
              <td>{board.id}</td>
              <td>
                <Link to={`/board/detail?no=${board.id}`} className="text-decoration-none">
                  {board.title}
                </Link>
              </td>
              <td>{board.memberNickname}</td>
              <td>{formatDate(board.modifiedDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardList;

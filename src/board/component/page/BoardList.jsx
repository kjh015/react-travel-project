import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardApiClient from "../../service/BoardApiClient";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getBoardList = async () => {
    setLoading(true);
    try {
      BoardApiClient.getBoardList().then(res => {
        if (res.ok) {
          res.json().then(data => {
            setBoards(data);
          });
        } else {
          console.log("response error");
        }
      });
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

  const goToWrite = () => {
    if (localStorage.getItem('accessToken') != null) {
      navigate("/board/write");
    }
    else {
      alert("로그인 필요");
    }
  }

  const location = useLocation();
  useEffect(() => {
    getBoardList();
  }, []);

  const isLoggedIn = !!localStorage.getItem('accessToken');
  if (loading) return <div className="text-center mt-5">로딩 중...</div>;
  if (error) return <div className="text-danger mt-5">에러 발생: {error.message}</div>;

  // 전체 페이지 배경색 + 내용 카드로 감싸기
  return (
    <div className="bg-opacity-25 min-vh-100 py-5 mt-5"
      style={{
        minHeight: "100vh",           // 최소 높이: 브라우저 창 높이
        width: "100vw",               // 가로폭: 브라우저 창 전체
        overflowX: "hidden",          // 가로 스크롤 방지 (필요시)
        position: "relative"          // 하위 요소 레이아웃 보호
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="mb-0">게시판 목록</h4>
              {isLoggedIn && (   // <-- 여기 조건만 바뀜
                <>
                  <button className="btn btn-primary" onClick={goToWrite}>글쓰기</button>
                </>
              )}
            </div>
            <div className="card shadow-sm">
              <div className="card-body p-4">
                <table className="table table-hover mx-auto" style={{ width: "90%" }}>
                  <thead className="table-light">
                    <tr>
                      <th scope="col" className="text-center" style={{ width: "8%" }}>#</th>
                      <th scope="col" className="text-center">제목</th>
                      <th scope="col" className="text-center" style={{ width: "15%" }}>작성자</th>
                      <th scope="col" className="text-center" style={{ width: "20%" }}>날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    {boards.map((board) => (
                      <tr key={board.id}>
                        <td className="text-center">{board.id}</td>
                        <td>
                          <Link to={`/board/detail?no=${board.id}`} className="text-decoration-none">
                            {board.title}
                          </Link>
                        </td>
                        <td className="text-center">{board.memberNickname}</td>
                        <td className="text-center">{formatDate(board.modifiedDate)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;

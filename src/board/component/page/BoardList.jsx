import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardApiClient from "../../service/BoardApiClient";
import BoardSearch from "./BoardSearch";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [sort, setSort] = useState("ratingAvg");
  const [direction, setDirection] = useState("desc");
  const [page, setPage] = useState(0);


  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "";
  const region = params.get("region") || "";
  const keyword = params.get("keyword") || "";
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');

  useEffect(() => {
    setSearched(true);
    getBoardList();
  }, [location.search, sort, direction, page]);

  const goToWrite = () => {
    if (isLoggedIn) {
      navigate("/board/write");
    } else {
      alert("로그인 필요");
    }
  };

  const getBoardListAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await BoardApiClient.getBoardList();
      if (res.ok) {
        const data = await res.json();
        setBoards(data);
      } else {
        setError(new Error("서버 응답 에러"));
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const getBoardList = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await BoardApiClient.getBoardListBySearch({ category, region, keyword, sort, direction, page });
      if (res.ok) {
        const data = await res.json();
        setBoards(data);
      } else {
        setError(new Error("서버 응답 에러"));
      }
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

  const handleSort = (type) => {
    if (type === sort) {
      direction === "asc" ? setDirection("desc") : setDirection("asc")
    }
    else {
      setDirection("desc");
      setSort(type);
      setPage(0);
    }
  }

  const handleNextPage = () => {
    setPage(p => p + 1);
  }
  const handlePrevPage = () => {
    setPage(p => p - 1);
  }

  if (loading) return <div className="text-center mt-5" style={{ paddingTop: 80 }}>로딩 중...</div>;
  if (error) return <div className="text-danger mt-5" style={{ paddingTop: 80 }}>!!!!에러 발생: {error.message}</div>;

  // 전체 페이지 배경색 + 내용 카드로 감싸기
  return (
    <div
      className="bg-light min-vh-100 py-4"
      style={{ overflowX: "hidden" }}
    >
      <div className="row justify-content-center mt-3" style={{ margin: 0 }}>
        <div className="col-lg-10 col-md-12" style={{ padding: 0 }}>
          <div
            className="card border-1 mb-5"
            style={{
              borderRadius: "2rem",
              overflow: "hidden",
              background: "#fff",
              width: "100%",            // 3. 카드가 col보다 더 커지는 걸 막음
              maxWidth: "100%",         // 가로폭 절대 넘지 않음
            }}
          >
            <div className="container py-4">
              <BoardSearch />
              <div className="card-header bg-white d-flex justify-content-between align-items-center py-3 px-0 border-0" style={{ background: "none" }}>
                <h4 className="mb-0 fw-bold">게시판 목록</h4>
                <div className="d-flex gap-2 align-items-center">
                  <div className="dropdown">
                    <button
                      className="btn btn-info dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {sort}
                    </button>
                    <ul className="dropdown-menu">
                      <li><button className="dropdown-item" onClick={() => handleSort("popular")}>인기 순</button></li>
                      <li><button className="dropdown-item" onClick={() => handleSort("ratingAvg")}>평점 순</button></li>
                      <li><button className="dropdown-item" onClick={() => handleSort("regDate")}>최신 순</button></li>
                      <li><button className="dropdown-item" onClick={() => handleSort("viewCount")}>조회수 순</button></li>
                      <li><button className="dropdown-item" onClick={() => handleSort("commentCount")}>댓글 순</button></li>
                      <li><button className="dropdown-item" onClick={() => handleSort("favoriteCount")}>찜 순</button></li>
                    </ul>
                  </div>
                  {isLoggedIn && (
                    <button className="btn btn-primary" onClick={goToWrite}>글쓰기</button>
                  )}
                </div>
              </div>
              <div className="card-body p-0">
                <table
                  className="table table-hover align-middle mb-0"
                  style={{
                    borderRadius: "1.2rem",
                    overflow: "hidden"
                  }}
                >
                  <thead className="table-light">
                    <tr>
                      <th className="text-center" style={{ width: "8%" }}>#</th>
                      <th className="text-center">제목</th>
                      <th className="text-center" style={{ width: "15%" }}>작성자</th>
                      <th className="text-center" style={{ width: "20%" }}>날짜</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!searched && (
                      <tr>
                        <td colSpan={4} className="text-center py-5 text-secondary">
                          게시글이 없습니다. 검색해주세요.
                        </td>
                      </tr>
                    )}
                    {searched && !loading && boards.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center py-5 text-secondary">
                          게시글이 없습니다.
                        </td>
                      </tr>
                    )}
                    {searched && !loading && boards.length > 0 && (
                      boards.map((board, idx) => (
                        <tr key={board.id}>
                          <td className="text-center">{idx + 1 + page*10}</td>
                          <td className="text-center">
                            <Link
                              to={`/board/detail?no=${board.id}`}
                              className="text-decoration-none d-inline-block w-100"
                              style={{
                                textAlign: "center",
                                fontWeight: "500"
                              }}
                            >
                              {board.title}
                            </Link>
                          </td>
                          <td className="text-center">{board.memberNickname}</td>
                          <td className="text-center">{formatDate(board.modifiedDate)}</td>
                        </tr>
                      ))
                      
                    )}
                    {loading && (
                      <tr>
                        <td colSpan={4} className="text-center py-5">
                          로딩 중...
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                {error && (
                  <div className="text-danger text-center py-5">
                    에러 발생: {error.message}
                  </div>
                )}
                <button onClick={handlePrevPage}>이전</button>
                <button onClick={handleNextPage}>다음</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoardList;

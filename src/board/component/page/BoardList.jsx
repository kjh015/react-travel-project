import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import BoardApiClient from "../../service/BoardApiClient";
import BoardSearch from "./BoardSearch";
import { Tooltip, Card, Badge, OverlayTrigger, Carousel } from "react-bootstrap";

const BoardList = () => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const [sort, setSort] = useState("popular");
  const [sortName, setSortName] = useState("인기 순");
  const [direction, setDirection] = useState("desc");
  const [docCount, setDocCount] = useState(0);
  const [page, setPage] = useState(0);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const categoryColors = {
    축제: "danger", 공연: "primary", 행사: "success", 체험: "warning",
    쇼핑: "info", 자연: "success", 역사: "secondary", 가족: "dark", 음식: "warning",
  };
  const regionColors = {
    서울: "primary", 부산: "info", 제주: "success", 강원: "danger", 경기: "info", 기타: "warning",
    대구: "secondary", 인천: "dark", 전남: "secondary"
  };

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get("category") || "";
  const region = params.get("region") || "";
  const keyword = params.get("keyword") || "";
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const pageCount = Math.ceil(docCount / 10);
  const pageNumbers = Array.from({ length: pageCount }, (_, i) => i + 1);

  useEffect(() => {
    // setLoading(true);
    // setError(true);
    setSearched(true);
    getBoardList();
  }, [location.search, sort, direction, page]);

  const goToWrite = () => {
    if (isLoggedIn) {
      navigate("/board/write");
    } else {
      setAlert({ show: true, message: "로그인 필요", type: "danger" });
    }
  };

  // 전체 게시판 (테스트용)
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

  // 검색/필터 게시판 (필요시 사용)
  const getBoardList = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await BoardApiClient.getBoardListBySearch({ category, region, keyword, sort, direction, page });
      if (res.ok) {
        const data = await res.json();
        setBoards(data.result);
        setDocCount(data.docCount);
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

  const handleSort = ({ sort, direction, name }) => {
    setDirection(direction);
    setSort(sort);
    setSortName(name);
    setPage(0);
  };

  const handleNextPage = () => {
    setPage(p => p + 1);
  };
  const handlePrevPage = () => {
    setPage(p => (p > 0 ? p - 1 : 0));
  };

  // 전체 페이지 배경색 + 내용 카드로 감싸기
  return (
    <div
      className="bg-light min-vh-100 py-4"
      style={{ overflowX: "hidden" }}
    >
      <div style={{ marginTop: "3rem", }} />

      <BoardSearch selectedCategory={category} selectedRegion={region} />
      <div
        style={{
          height: "3.5px",
          width: "60px",
          margin: "0.7rem auto 1.1rem auto",
          borderRadius: "2rem",
          background: "linear-gradient(90deg,#bdaafc 20%, #92e0f6 90%)",
          opacity: 0.88,
          marginTop: "1rem",
          marginBottom: "5rem"
        }}
      />
      <div className="container py-3" style={{ maxWidth: 850, }}>
        {/* 헤더, 정렬, 글쓰기 */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold mb-1"
              style={{
                color: "#6c45e0",
                fontFamily: "'Montserrat', 'Gowun Dodum', sans-serif",
                fontSize: "2rem"
              }}>
              여행지 목록
            </h3>
            <div className="text-secondary" style={{ fontSize: "1.07rem" }}>
              인기 여행지의 다양한 후기를 만나보세요!
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            <div className="dropdown me-2">
              <button className="btn btn-outline-primary dropdown-toggle px-3 fw-semibold"
                type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {sortName}
              </button>
              <ul className="dropdown-menu">
                <li><button className="dropdown-item" onClick={() => handleSort({ sort: "popular", direction: "desc", name: "인기 순" })}>인기 순</button></li>
                <li><button className="dropdown-item" onClick={() => handleSort({ sort: "modifiedDate", direction: "desc", name: "최신 순" })}>최신 순</button></li>
                <li><button className="dropdown-item" onClick={() => handleSort({ sort: "modifiedDate", direction: "asc", name: "오래된 순" })}>오래된 순</button></li>
                <li><button className="dropdown-item" onClick={() => handleSort({ sort: "ratingAvg", direction: "desc", name: "높은 평점 순" })}>높은 평점 순</button></li>
                <li><button className="dropdown-item" onClick={() => handleSort({ sort: "ratingAvg", direction: "asc", name: "낮은 평점 순" })}>낮은 평점 순</button></li>
                <li><button className="dropdown-item" onClick={() => handleSort({ sort: "viewCount", direction: "desc", name: "조회수 순" })}>조회수 순</button></li>


              </ul>
            </div>
            {isLoggedIn && (
              <button
                className="btn fw-bold px-4"
                style={{
                  background: "linear-gradient(90deg, #a084ee 30%, #7c3aed 100%)",
                  color: "#fff",
                  border: "none"
                }}
                onClick={goToWrite}
              >글쓰기</button>
            )}
          </div>
        </div>

        {/* 카드 리스트 */}
        {loading ? (
          <div className="text-center py-5 fs-5" style={{ minHeight: 140 }}>
            <div style={{
              paddingRight: "100px",
              fontSize: 100,
              display: 'inline-block',
              animation: 'plane-fly 1.6s ease-in-out infinite'
            }}>
              🛫
            </div>
            <div className="mt-3">여행지로 이동 중...</div>
            <style>{`
      @keyframes plane-fly {
        0% { transform: translateX(0) rotate(-6deg);}
        30% { transform: translateX(35px) rotate(-4deg);}
        50% { transform: translateX(60px) rotate(2deg);}
        80% { transform: translateX(40px) rotate(-3deg);}
        100% { transform: translateX(0) rotate(-6deg);}
      }
    `}</style>
          </div>
        ) : error ? (
          <div className="text-danger text-center py-5">
            에러 발생: {error.message}
          </div>
        ) : boards.length === 0 ? (
          <div className="text-center text-secondary py-5 fs-5">
            게시글이 없습니다. 검색해주세요.
          </div>
        ) : (
          <div className="d-flex flex-column gap-4">
            {boards.map((board, idx) => (
              <div
                key={board.id}
                className="p-3 rounded-3 border board-list-card"
                style={{
                  background: "#fff",
                  minHeight: "88px",
                  boxShadow: "0 2px 10px 0 rgba(0,0,0,0.04)",
                  position: "relative"
                }}
                onClick={() => navigate(`/board/detail?no=${board.id}`)}
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigate(`/board/detail?no=${board.id}`);
                  }
                }}
              >
                {/* 제목 + 날짜 우측 상단 */}
                <div
                  className="d-flex justify-content-between align-items-start fw-bold"
                  style={{
                    fontSize: "1.12rem",
                    marginBottom: 6
                  }}
                >
                  <div
                    className="text-truncate"
                    style={{
                      maxWidth: "75%",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    <span
                      style={{
                        color: "#222",
                        fontWeight: "bold",
                        fontFamily: "'Montserrat', 'Gowun Dodum', sans-serif"
                      }}
                      title={board.title}
                    >
                      {board.title}
                    </span>
                  </div>
                  <span className="text-secondary ms-2" style={{ fontSize: "0.95rem", whiteSpace: "nowrap" }}>
                    {formatDate(board.modifiedDate)}
                  </span>
                </div>

                {/* 지역/카테고리/작성자 */}
                <div className="d-flex align-items-center flex-wrap gap-2 justify-content-between" style={{ fontSize: "0.97rem" }}>
                  <div>
                    <Badge bg={categoryColors[board.category]} className="me-1">{board.category}</Badge>
                    <Badge bg={regionColors[board.region]} className="me-2">{board.region}</Badge>
                    <span style={{ color: "#222" }}>by {board.memberNickname}</span>
                  </div>
                  <div>
                    <span>조회수: {board.viewCount} </span>
                    <span>별점: {board.ratingAvg}</span>
                  </div>


                </div>
              </div>
            ))}
          </div>
        )}

        {/* 페이지네이션 */}
        <div className="mt-4 mb-3 text-center">
          <button
            type="button"
            className="btn btn-outline-primary me-2 px-4"
            onClick={handlePrevPage}
            disabled={page === 0}
          >
            이전
          </button>
          {pageNumbers.map(num => (
            <button
              key={num}
              className={`btn mx-1 px-3 ${page === num - 1 ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setPage(num - 1)}
              style={{ fontWeight: page === num - 1 ? 'bold' : undefined }}
            >
              {num}
            </button>
          ))}
          <button
            type="button"
            className="btn btn-outline-primary px-4"
            onClick={handleNextPage}
            disabled={page === pageCount - 1 || pageCount === 0}
          >
            다음
          </button>
        </div>
      </div>
      <style>
        {`
.board-list-card {
  transition: box-shadow 0.18s, transform 0.16s, background 0.16s, border 0.13s;
}
.board-list-card:hover, .board-list-card:focus {
  box-shadow: 0 6px 24px 0 rgba(123,82,255,0.14), 0 1.5px 10px rgba(60,0,128,0.04);
  border-color: #a084ee;
  background: #faf8ff;
  transform: translateY(-2px) scale(1.012);
  cursor: pointer;
}
        `}
      </style>
    </div>
  );
};

export default BoardList;
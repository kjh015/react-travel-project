import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CommonApiClient from './service/CommonApiClient';

import { Badge } from "react-bootstrap";

const CheckMyArt = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nickname = localStorage.getItem("nickname");

    const [searched, setSearched] = useState(false);
    const [sort, setSort] = useState("regDate");
    const [direction, setDirection] = useState("desc");
    const [page, setPage] = useState(0);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "";
    const region = params.get("region") || "";
    const keyword = params.get("keyword") || "";
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');



    const getMyBoardList = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CommonApiClient.getMyBoard(nickname);
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
    }

    useEffect(() => {
        getMyBoardList();
    }, []);



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
    };

    const handleNextPage = () => {
        setPage(p => p + 1);
    };
    const handlePrevPage = () => {
        setPage(p => (p > 0 ? p - 1 : 0));
    };

    return (
        <div
            className="bg-light min-vh-100 py-4"
            style={{ overflowX: "hidden" }}
        >


            <div className="container py-3" style={{ maxWidth: 850 }}>
                {/* 헤더, 정렬, 글쓰기 */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h3 className="fw-bold mb-1"
                            style={{
                                color: "#6c45e0",
                                fontFamily: "'Montserrat', 'Gowun Dodum', sans-serif",
                                fontSize: "2rem"
                            }}>
                            찜 목록
                        </h3>

                    </div>
                    <div className="d-flex align-items-center gap-2">
                        <div className="dropdown me-2">
                            <button className="btn btn-outline-primary dropdown-toggle px-3 fw-semibold"
                                type="button" data-bs-toggle="dropdown" aria-expanded="false">
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

                    </div>
                </div>

                {/* 카드 리스트 */}
                {loading ? (
                    <div className="text-center py-5 fs-5">
                        <div className="spinner-border text-primary me-2" role="status"></div>
                        로딩 중...
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
                                <div className="d-flex align-items-center flex-wrap gap-2" style={{ fontSize: "0.97rem" }}>
                                    <span style={{ color: "#222" }}>닉네임</span>
                                    <Badge bg="primary" className="me-1">서울</Badge>
                                    <Badge bg="secondary" className="me-2">축제</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* 페이지네이션 */}
                <div className="mt-4 mb-3 text-center">
                    <button type="button" className="btn btn-outline-primary me-2 px-4" onClick={handlePrevPage}>이전</button>
                    <button type="button" className="btn btn-outline-primary px-4" onClick={handleNextPage}>다음</button>
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

export default CheckMyArt;

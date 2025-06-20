import React, { useEffect, useState } from "react";
import BoardApiClient from "../../service/BoardApiClient";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap"; // 반드시 필요!

const AdmnBoard = () => {
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sort, setSort] = useState("regDate");
    const [direction, setDirection] = useState("desc");
    const [page, setPage] = useState(0);

    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const category = params.get("category") || "";
    const region = params.get("region") || "";
    const keyword = params.get("keyword") || "";
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');

    // 날짜 포맷
    const formatDate = (isoString) => {
        if (!isoString) return "";
        return isoString.substring(0, 16).replace("T", " ");
    };

    const getBoards = async () => {
        setLoading(true);
        try {
            const res = await BoardApiClient.getBoardList();
            const data = await res.json();
            setBoards(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        getBoards();
        // eslint-disable-next-line
    }, [sort, direction, page, category, region, keyword]);

    const goToWrite = () => {
        if (isLoggedIn) {
            navigate("/board/write");
        } else {
            setAlert({ show: true, message: "로그인 필요", type: "danger" });
        }
    };

    const handleSort = (type) => {
        if (type === sort) {
            setDirection(direction === "asc" ? "desc" : "asc");
        } else {
            setSort(type);
            setDirection("desc");
            setPage(0);
        }
    };

    const handleNextPage = () => setPage((p) => p + 1);
    const handlePrevPage = () => setPage((p) => (p > 0 ? p - 1 : 0));
    const removeBoard = ({ no }) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            BoardApiClient.removeBoard(no).then(
                res => {
                    if (res.ok) {
                        setAlert({ show: true, message: "삭제 성공", type: "success" });
                        getBoards();
                    } else {
                        setAlert({ show: true, message: "삭제 실패", type: "danger" });
                    }
                }
            );
        }
    };

    const migrateData = () => {
        if (window.confirm("정말 적재하시겠습니까?")) {
            BoardApiClient.migrateBoard().then(
                res => res.text().then(
                    message => alert(message)
                )
            );
        }
    };

    return (
        <div>
            <h4 style={{ marginTop: '80px' }}>여행지 관리 페이지</h4>
            <button className="btn btn-danger" onClick={migrateData}>
                데이터 적재하기(MySQL - ElasticSearch)
            </button>
            <div className="container my-4" style={{ maxWidth: 740 }}>
                {/* 정렬 & 글쓰기 */}
                <div className="d-flex align-items-center gap-2 mb-3">
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

                {/* Alert 메시지 */}
                {alert.show && (
                    <div className={`alert alert-${alert.type} py-2 px-3 mb-2`} role="alert">
                        {alert.message}
                    </div>
                )}

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
                        {boards.map((board) => (
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
                                {/* 제목 + 날짜 */}
                                <div className="d-flex justify-content-between align-items-start fw-bold" style={{ fontSize: "1.12rem", marginBottom: 6 }}>
                                    <div className="text-truncate" style={{ maxWidth: "75%" }}>
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
                                    <span style={{ color: "#222" }}>{board.nickname || "닉네임"}</span>
                                    <Badge bg="primary" className="me-1">{board.region || "서울"}</Badge>
                                    <Badge bg="secondary" className="me-2">{board.category || "축제"}</Badge>
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
        </div>
    );
};

export default AdmnBoard;

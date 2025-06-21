import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CommonApiClient from './service/CommonApiClient';

import { Badge } from "react-bootstrap";

const LikeListPage = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nickname = localStorage.getItem("nickname");
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem('accessToken');



    useEffect(() => {
        getFavoriteList();
    }, []);

    const goToWrite = () => {
        if (isLoggedIn) {
            navigate("/board/write");
        } else {
            setAlert({ show: true, message: "로그인 필요", type: "danger" });
        }
    };

    // 전체 게시판 (테스트용)
    const getFavoriteList = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CommonApiClient.getMyFavorite(nickname);
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



    const formatDate = (isoString) => {
        if (!isoString) return "";
        return isoString.substring(0, 16).replace("T", " ");
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
                                    <span style={{ color: "#222" }}>{board.memberNickname}</span>
                                    <Badge bg="primary" className="me-1">{board.region}</Badge>
                                    <Badge bg="secondary" className="me-2">{board.category}</Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

export default LikeListPage;

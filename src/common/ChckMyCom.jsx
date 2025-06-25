import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonApiClient from "./service/CommonApiClient";
import { useNavigate } from "react-router-dom";

const renderStarsStatic = (score = 0) => (
    <span>
        {[1, 2, 3, 4, 5].map(star => (
            <span
                key={star}
                style={{
                    fontSize: "1.15rem",
                    color: star <= score ? "#ffc107" : "#e4e5e9"
                }}
            >★</span>
        ))}
    </span>
);

const ChckMyCom = () => {
    const navigate = useNavigate();
    const nickname = localStorage.getItem("nickname");
    const [commentList, setCommentList] = useState([]);
    const [loading, setLoading] = useState(true); // ← 로딩 상태 추가

    const getCommentList = () => {
        setLoading(true); // 데이터 요청 시작 시 로딩
        CommonApiClient.getMyComment(nickname)
            .then(res => res.json()
                .then(data => {
                    if (res.ok) setCommentList(data);
                    setLoading(false); // 데이터 받아오면 로딩 종료
                })
            ).catch(() => setLoading(false)); // 에러시에도 로딩 종료
    };

    useEffect(() => {
        getCommentList();
    }, []);

    // 1. 로딩 중일 때 비행기 애니메이션 노출
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "300px" }}>
                <div style={{ textAlign: "center", width: "100%" }}>
                    <div
                        style={{
                            paddingRight: "100px",
                            fontSize: 100,
                            display: 'inline-block',
                            animation: 'plane-fly 1.6s ease-in-out infinite'
                        }}
                    >
                        🛫
                    </div>
                    <div className="mt-4 fs-5 text-secondary">
                        내 댓글 목록을 불러오는 중...
                    </div>
                    <style>{`
                        @keyframes plane-fly {
                            0% { transform: translateX(0) rotate(-6deg);}
                            30% { transform: translateX(40px) rotate(-2deg);}
                            50% { transform: translateX(80px) rotate(4deg);}
                            80% { transform: translateX(50px) rotate(-3deg);}
                            100% { transform: translateX(0) rotate(-6deg);}
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    // 2. 로딩이 끝나면, 댓글 목록 or "없음" 표시
    return (
        <div className="container my-4">
            <div className="card shadow-sm border-1 rounded-4 mx-auto" style={{ maxWidth: 520, background: "#fafdffcc" }}>
                <div className="card-body p-4">
                    {/* 타이틀, 댓글수, 평점수 한 줄에 정렬 */}
                    <div className="d-flex align-items-center mb-4 justify-content-between">
                        <h5 className="mb-0 fw-bold">작성 댓글 목록</h5>
                        <div className="d-flex align-items-center" style={{ gap: "1.1rem" }}>
                            <span className="text-secondary" style={{ fontSize: "1rem" }}>
                                작성 댓글 수 <span className="fw-semibold">{commentList.length}</span>
                            </span>
                        </div>
                    </div>
                    {/* 실제 댓글 리스트 */}
                    {commentList.length === 0 && <p className="text-muted">댓글이 없습니다.</p>}
                    <div>
                        {commentList.map((c, idx) => (
                            <div key={idx} className="mainpage-card-hover card mb-3 border-0 shadow-sm rounded-3 position-relative" onClick={() => navigate(`/board/detail/?no=${c.no}`)}>
                                <div className="card-body" >
                                    <div className="d-flex align-items-center mb-2">
                                        <strong className="me-2">{c.nickname}</strong>
                                        {c.rating > 0 && (
                                            <span className="ms-1">{renderStarsStatic(c.rating)}</span>
                                        )}
                                    </div>
                                    <div className="mb-2">{c.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <style>
                {`
          .mainpage-card-hover:hover {
            transform: scale(1.035);
            box-shadow: 0 12px 36px 0 rgba(100,100,150,0.19);
            z-index: 2; /* 이 값도 왕관(99)보다 낮아야 함 */
          }
        `}
            </style>
        </div>
    );
};

export default ChckMyCom;

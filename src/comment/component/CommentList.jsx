import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 별점만 보여주는 함수 (별 5개 중에 색상표시)
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
const rating = 4.7;
const getAverageRating = (comments) => {
    if (!comments.length) return 0;
    const sum = comments.reduce((acc, c) => acc + (c.rating || 0), 0);
    return (sum / comments.length).toFixed(1); // 소수점 한자리
};

const CommentList = ({ comments = [], onRemoveComment }) => {
    return (
        <div className="container my-4">
            <div className="card shadow-sm border-1 rounded-4 mx-auto" style={{ maxWidth: 520, background: "#fafdffcc" }}>
                <div className="card-body p-4">
                    {/* 타이틀, 댓글수, 평점수 한 줄에 정렬 */}
                    <div className="d-flex align-items-center mb-4 justify-content-between">
                        <h5 className="mb-0 fw-bold">댓글 목록</h5>
                        <div className="d-flex align-items-center" style={{ gap: "1.1rem" }}>
                            <span className="text-secondary" style={{ fontSize: "1rem" }}>
                                댓글수 <span className="fw-semibold">{comments.length}</span>
                            </span>
                            <span className="text-secondary" style={{ fontSize: "1rem" }}>
                                평점 <span className="fw-semibold">{rating}</span>
                                {/* 별점 평균도 같이 표기 (선택) */}
                                <span className="ms-1">
                                    {renderStarsStatic(Math.round(getAverageRating(rating)))}
                                </span>
                            </span>
                        </div>
                    </div>
                    {/* 실제 댓글 리스트 */}
                    {comments.length === 0 && <p className="text-muted">댓글이 없습니다.</p>}
                    <div>
                        {comments.map((c, idx) => (
                            <div key={idx} className="card mb-3 border-0 shadow-sm rounded-3 position-relative">
                                <div className="card-body">
                                    {/* x 버튼 */}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light position-absolute"
                                        style={{
                                            top: 8,
                                            right: 10,
                                            border: "none",
                                            fontSize: "1.25rem",
                                            color: "#bbb",
                                            background: "transparent",
                                            zIndex: 10,
                                        }}
                                        onClick={() => onRemoveComment({ commentId: c.id })}
                                        aria-label="댓글 삭제"
                                    >
                                        ×
                                    </button>
                                    <div className="d-flex align-items mb-2">
                                        <strong className="me-2">{c.nickname}</strong>
                                        <span style={{ fontSize: "0.96rem", color: "#aaa" }}>
                                            {c.rating > 0 && (
                                                <div className="mb-1">{renderStarsStatic(c.rating)}</div>
                                            )}
                                        </span>
                                    </div>
                                    <div className="mb-2">{c.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CommentList; 
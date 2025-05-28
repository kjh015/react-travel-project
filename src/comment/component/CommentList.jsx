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

const CommentList = ({ comments = [] }) => {
    // comments가 undefined여도 자동으로 [] 처리되어 에러 방지
    return (
        <div className="container my-4">
            <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: 520, background: "#fafdffcc" }}>
                <div className="card-body p-4">
                    <h5 className="mb-4">댓글 목록</h5>
                    {(comments.length === 0) && <p className="text-muted">더미 댓글 예시</p>}
                    <div>
                        {comments.map((c, idx) => (
                            <div key={idx} className="card mb-3 border-0 shadow-sm rounded-3">
                                <div className="card-body">
                                    <div className="d-flex align-items-center mb-2">
                                        <strong className="me-2">{c.name}</strong>
                                        <span style={{ fontSize: "0.96rem", color: "#aaa" }}>
                                            | {c.rating ? `★${c.rating}` : "별점 없음"}
                                        </span>
                                    </div>
                                    <div className="mb-2">{c.comment}</div>
                                    {c.rating > 0 && (
                                        <div className="mb-1">{renderStarsStatic(c.rating)}</div>
                                    )}
                                    {c.image && (
                                        <div className="mt-2">
                                            <img src={c.image} alt="첨부이미지" style={{ maxWidth: "130px", borderRadius: "7px", boxShadow: "0 2px 6px rgba(0,0,0,0.08)" }} />
                                        </div>
                                    )}
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

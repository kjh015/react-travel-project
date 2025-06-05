import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link, useNavigate } from "react-router-dom";
const WriteComment = ({ onAddComment }) => {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);

    const navigate = useNavigate();

    // 별점 클릭 렌더 함수
    const renderStars = () => (
        <span>
            {[1, 2, 3, 4, 5].map(star => (
                <i
                    key={star}
                    className={star <= rating ? "bi bi-star-fill" : "bi bi-star"}
                    style={{
                        color: star <= rating ? "#ffc107" : "#dee2e6",
                        fontSize: "1.25rem",
                        cursor: "pointer",
                        marginLeft: 3,
                        marginRight: 1
                    }}
                    onClick={() => setRating(star)}
                />
            ))}
        </span>
    );

    // 제출 핸들러 (onAddComment 콜백 예시)
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;
        if (localStorage.getItem('accessToken') == null) {
            alert("로그인 필요");
            navigate(-1);
            return;
        }        

        if (onAddComment) onAddComment({ comment, rating });
        setComment("");
        setRating(0);
    };

    return (
        <div className="card shadow-sm rounded-4 px-4 py-3 mx-auto" style={{ maxWidth: 520, margin: "0 auto" }}>
            <form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <label className="form-label mb-0" htmlFor="comment" style={{ fontWeight: 500 }}>
                        댓글
                    </label>
                    {renderStars()}
                </div>
                <textarea
                    id="comment"
                    className="form-control mb-3"
                    rows={3}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="댓글을 입력하세요"
                    style={{ resize: "none" }}
                />
                <div className="d-flex justify-content-end">


                    <button type="submit" className="btn btn-primary px-4">작성하기</button>
                </div>
            </form>
        </div>
    );
};

export default WriteComment;

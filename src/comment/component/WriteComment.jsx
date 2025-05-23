import { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EMOJI_LIST = ["😊", "😂", "😍", "👍", "😭", "🥳", "😎", "😢", "🔥", "🙌"];

const WriteComment = () => {
    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [showEmoji, setShowEmoji] = useState(false);
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0); // 별점 호버
    const [formAlert, setFormAlert] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const textareaRef = useRef(null);

    // 별점 표시 함수 (입력용)
    const renderStars = (current = 0, onSelect) => (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{
                        fontSize: '2rem',
                        color: star <= (hoverRating || current) ? '#ffc107' : '#e4e5e9',
                        cursor: onSelect ? 'pointer' : 'default',
                        transition: 'color 0.2s'
                    }}
                    onClick={onSelect ? () => { onSelect(star); setHoverRating(0); } : undefined}
                    onMouseOver={onSelect ? () => setHoverRating(star) : undefined}
                    onMouseOut={onSelect ? () => setHoverRating(0) : undefined}
                    role="button"
                    tabIndex={0}
                    aria-label={`${star}점`}
                >
                    ★
                </span>
            ))}
        </div>
    );

    // 별점 표시 함수 (출력용)
    const renderStarsStatic = (score = 0) => (
        <div>
            {[1, 2, 3, 4, 5].map(star => (
                <span
                    key={star}
                    style={{
                        fontSize: "1.4rem",
                        color: star <= score ? "#ffc107" : "#e4e5e9",
                        pointerEvents: "none"
                    }}
                >★</span>
            ))}
        </div>
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || comment.trim() === '') {
            setFormAlert('이름과 댓글을 모두 입력해주세요.');
            return;
        }
        const newComment = { name, comment, image: imagePreview || null, rating };
        setComments([newComment, ...comments]);
        setName('');
        setComment('');
        setImage(null);
        setImagePreview(null);
        setRating(0);
        setFormAlert('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1300);
    };

    const handleEmojiClick = (emoji) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const newValue = comment.slice(0, start) + emoji + comment.slice(end);

        setComment(newValue);
        setShowEmoji(false);

        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + emoji.length, start + emoji.length);
        }, 0);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            setImage(null);
            setImagePreview(null);
            return;
        }
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                overflowX: "hidden",
                background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                position: "relative"
            }}
        >
            <div className="container py-5">
                <div className="mx-auto" style={{ maxWidth: '540px' }}>
                    <div className="card shadow-lg border-0 rounded-4 p-4 mb-5" style={{ background: "#fafdffcc" }}>
                        <h4 className="mb-3">댓글 남기기</h4>
                        {formAlert &&
                            <div className="alert alert-danger py-2" role="alert">{formAlert}</div>
                        }
                        {showSuccess &&
                            <div className="alert alert-primary py-2" role="alert">댓글이 작성되었습니다!</div>
                        }
                        <form onSubmit={handleSubmit} autoComplete="off">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">이름</label>
                                <input
                                    type="text"
                                    className={`form-control${formAlert && name.trim() === '' ? ' is-invalid' : ''}`}
                                    id="name"
                                    placeholder="이름을 입력하세요"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="mb-3" style={{ position: "relative" }}>
                                <label htmlFor="comment" className="form-label">댓글</label>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                    <textarea
                                        className={`form-control${formAlert && comment.trim() === '' ? ' is-invalid' : ''}`}
                                        id="comment"
                                        rows="3"
                                        placeholder="댓글을 입력하세요"
                                        value={comment}
                                        ref={textareaRef}
                                        onChange={(e) => setComment(e.target.value)}
                                        style={{ resize: "none" }}
                                    ></textarea>
                                    <button
                                        type="button"
                                        className="btn btn-light ms-2"
                                        style={{ fontSize: "1.5rem", padding: "0.25rem 0.5rem" }}
                                        onClick={() => setShowEmoji((prev) => !prev)}
                                        tabIndex={-1}
                                    >
                                        😊
                                    </button>
                                </div>
                                {showEmoji && (
                                    <div
                                        className="border rounded shadow bg-white p-2"
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            top: "70%",
                                            zIndex: 10,
                                            display: "flex",
                                            gap: "0.5rem"
                                        }}
                                    >
                                        {EMOJI_LIST.map((emoji) => (
                                            <span
                                                key={emoji}
                                                style={{ cursor: "pointer", fontSize: "1.5rem" }}
                                                onClick={() => handleEmojiClick(emoji)}
                                            >
                                                {emoji}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">별점</label>
                                {renderStars(rating, setRating)}
                                <div style={{ fontSize: "0.9rem", color: "#6c757d" }}>
                                    {rating === 0 ? "별점 없음" : `별점: ${rating}점`}
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-100">작성하기</button>
                        </form>
                    </div>
                    {/* 댓글 목록 */}
                    <div className="card shadow-sm border-0 rounded-4 p-4">
                        <h5>댓글 목록</h5>
                        {comments.length === 0 && <p className="text-muted">아직 댓글이 없습니다.</p>}
                        <ul className="list-group list-group-flush">
                            {comments.map((c, idx) => (
                                <li key={idx} className="list-group-item py-3" style={{ background: "#fff" }}>
                                    <div className="d-flex align-items-center mb-2">
                                        <strong className="me-2">{c.name}</strong>
                                        <span style={{ fontSize: "0.96rem", color: "#aaa" }}>| {c.rating ? `★${c.rating}` : "별점 없음"}</span>
                                    </div>
                                    <div className="mb-1">{c.comment}</div>
                                    {c.rating > 0 && (
                                        <div>{renderStarsStatic(c.rating)}</div>
                                    )}

                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WriteComment;

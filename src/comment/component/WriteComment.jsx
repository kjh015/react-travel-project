import { useState, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const WriteComment = ({ onAddComment }) => {
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [rating, setRating] = useState(0);
    const [formAlert, setFormAlert] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const textareaRef = useRef(null);

    // 별점: 크기 축소(1.3rem)
    const renderStars = (current = 0, onSelect) => (
        <div>
            {[1, 2, 3, 4, 5].map((star) => (
                <span
                    key={star}
                    style={{
                        fontSize: '1.3rem',
                        color: star <= current ? '#ffc107' : '#e4e5e9',
                        cursor: onSelect ? 'pointer' : 'default',
                        transition: 'color 0.2s',
                        marginRight: '2px'
                    }}
                    onClick={onSelect ? () => onSelect(star) : undefined}
                    role="button"
                    tabIndex={0}
                    aria-label={`${star}점`}
                >★</span>
            ))}
        </div>
    );

    // 폼 제출
    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || comment.trim() === '') {
            setFormAlert('이름과 댓글을 모두 입력해주세요.');
            return;
        }
        const newComment = { name, comment, image: imagePreview || null, rating };
        if (onAddComment) onAddComment(newComment);
        setName('');
        setComment('');
        setImage(null);
        setImagePreview(null);
        setRating(0);
        setFormAlert('');
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1200);
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
        <div className="container my-4">
            <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: 540, background: "#fafdffcc" }}>
                <div className="card-body p-4">
                    <h4 className="mb-3">댓글 남기기</h4>
                    {formAlert &&
                        <div className="alert alert-danger py-2" role="alert">{formAlert}</div>
                    }
                    {showSuccess &&
                        <div className="alert alert-primary py-2" role="alert">댓글이 작성되었습니다!</div>
                    }
                    <form onSubmit={handleSubmit} autoComplete="off">
                        {/* 별점: 댓글 입력창 위로 이동 */}
                        <div className="mb-2">
                            <label className="form-label mb-1" style={{ fontWeight: "bold" }}>별점</label>
                            {renderStars(rating, setRating)}
                        </div>
                        {/* 댓글 입력창 & 버튼 가로배치 */}
                        <div className="d-flex align-items-end mb-2 gap-2">
                            <div className="flex-grow-1">
                                <label htmlFor="comment" className="form-label">댓글</label>
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
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                style={{ height: "45px", marginBottom: "8px", whiteSpace: "nowrap" }}
                            >작성하기</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default WriteComment;

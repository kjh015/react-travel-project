import { useState } from "react";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CommentList from "./CommentList";

//댓글 쓰는 파일
const WriteComment = () => {

    const [comments, setComments] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() === '' || comment.trim() === '') return;

        const newComment = { name, comment };
        setComments([...comments, newComment]);
        setName('');
        setComment('');
    };

    return (
        <div>
            {/* 댓글 작성 폼 */}
            <hr className="my-4" />
            <div className="comment-box mt-5 mx-auto" style={{ maxWidth: '600px' }}>
                <h4 className="mb-3">댓글 남기기</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">이름</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="이름을 입력하세요"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="comment" className="form-label">댓글</label>
                        <textarea
                            className="form-control"
                            id="comment"
                            rows="3"
                            placeholder="댓글을 입력하세요"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary">작성하기</button>
                </form>

            </div>

        </div>
    );
}

export default WriteComment; 
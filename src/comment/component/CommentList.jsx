import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const CommentList = ({ comments = [] }) => {
    return (
        <div className="mt-5">
            <h5>댓글 목록</h5>
            {comments.length === 0 && <p>아직 댓글이 없습니다.</p>}
            <ul className="list-group">
                {comments.map((c, idx) => (
                    <li key={idx} className="list-group-item">
                        <strong>{c.name}</strong>: {c.comment}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;

import CommentList from "./CommentList";
import WriteComment from "./WriteComment";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const CommentPage = () => {
    return (
        <div>
            <WriteComment />
            <CommentList />
        </div>
    );
}

export default CommentPage;
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import WriteComment from './WriteComment';
import CommentList from './CommentList';


const CommentPage = () => {

    return (
        <div>
            <WriteComment />
            <CommentList />
        </div>

    );
}

export default CommentPage;
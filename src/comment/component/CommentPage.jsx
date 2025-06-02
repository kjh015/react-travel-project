import CommentList from "./CommentList";
import WriteComment from "./WriteComment";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CommentApiClient from "../service/CommentApiClient";
import { useEffect, useState } from "react";


const CommentPage = ({ no, isLoggedIn }) => {
    const [commentList, setCommentList] = useState([]);

    const getCommentList = () => {
        CommentApiClient.getCommentList(no)
            .then(res => res.json()
                .then(data => {
                    if (res.ok) {
                        setCommentList(data);
                        console.log("성공");
                    }
                    else {
                        console.log(data);
                    }
                }
                )
            )
    }

    const addComment = ({ rating, comment }) => {
        const nickname = localStorage.getItem("nickname");
        const payload = {
            rating: rating,
            content: comment,
            nickname: nickname,
            no: no
        }
        CommentApiClient.addComment(payload)
            .then(res => res.text()
                .then(message => {
                    alert(message);
                    if (res.ok) {
                        getCommentList();
                    }
                })
            )
    }

    useEffect(() => {
        if (!no) return;
        getCommentList();
    }, [no]);


    return (
        <div>
            <CommentList comments={commentList} />
            {isLoggedIn && <WriteComment onAddComment={addComment} />}
            

        </div>
    );
}

export default CommentPage;
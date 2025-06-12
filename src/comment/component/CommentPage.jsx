import CommentList from "./CommentList";
import WriteComment from "./WriteComment";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import CommentApiClient from "../service/CommentApiClient";
import { useEffect, useState } from "react";


const CommentPage = ({ no, isLoggedIn, ratingAvg, setCommentFlag }) => {
    const [commentList, setCommentList] = useState([]);

    const getCommentList = () => {
        CommentApiClient.getCommentList(no)
            .then(res => res.json()
                .then(data => {
                    if (res.ok) {
                        setCommentList(data);
                        console.log(data);
                    }
                    else {
                        console.log(data);
                    }
                }
                )
            )
    }
    const removeComment = ({commentId}) => {
        CommentApiClient.removeComment(commentId)
            .then(res => res.text()
                .then(message => {
                    alert(message);
                    if (res.ok) {
                        getCommentList();
                        setCommentFlag(prev => !prev);
                    }
                })
            )

    }

    const addComment = ({ rating, comment }) => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: "travel_comment_add",
            boardId: no
        });
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
                        setCommentFlag(prev => !prev);
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
            <CommentList comments={commentList} onRemoveComment={removeComment} ratingAvg={ratingAvg} />
            {isLoggedIn && <WriteComment onAddComment={addComment} />}


        </div>
    );
}

export default CommentPage;
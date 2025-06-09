import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//작성한 댓글 보는 페이지 파일
const ChckMyCom = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    if (loading) return <div className="text-center mt-5">로딩 중...</div>;
    if (error) return <div className="text-danger mt-5">에러 발생: {error.message}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mt-5">작성댓글 목록</h4>

            </div>

            <table className="table table-hover">
                <thead className="table-light">

                </thead>
                <tbody>
                    {boards.map((board, idx) => (
                        <tr key={board.board_id}>
                            <td>{idx + 1}</td>
                            <td>
                                <Link to={`/component/place/${board.board_id}`} className="text-decoration-none">
                                    {board.title}
                                </Link>
                            </td>
                            <td>{board.writer}</td>
                            <td>{board.date}</td>
                            <td>
                                <Link to="/component/page/change" className="btn btn-sm btn-outline-primary">
                                    수정
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <footer className="text-body-secondary py-4 bg-light">
                <div className="container">
                    <p className="float-end mb-1">
                        <a href="/">Back to Top</a>
                    </p>
                    <p className="mb-1">Album example is © Bootstrap, customize it as you like!</p>
                    <p className="mb-0">
                        New to Bootstrap? <a href="/">Visit the homepage</a> or read the{" "}
                        <a href="/docs/5.3/getting-started/introduction/">getting started guide</a>.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default ChckMyCom;

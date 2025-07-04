import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

//여행지 목록 파일
const MyPlace = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);



    if (loading) return <div className="text-center mt-5">로딩 중...</div>;
    if (error) return <div className="text-danger mt-5">에러 발생: {error.message}</div>;

    return (
        <div className="bg-warning-subtle" style={{ backgroundColor: '#eaf4fc', minHeight: '100vh' }}>

            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h4 className="mt-5">여행지 목록</h4>

                </div>
                <div className="bg-warning-subtle min-vh-100">

                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">날짜</th>
                                <th scope="col">수정</th> {/* 수정 열 추가 */}
                            </tr>
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
            </div>
        </div>
    );
};

export default MyPlace;

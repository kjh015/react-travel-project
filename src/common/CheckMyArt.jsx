import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonApiClient from "./service/CommonApiClient";

//작성 글 파일
const CheckMyArt = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nickname = localStorage.getItem("nickname");    

    const getMyBoardList = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CommonApiClient.getMyBoard(nickname);
            if (res.ok) {
                const data = await res.json();
                setBoards(data);
            } else {
                setError(new Error("서버 응답 에러"));
            }
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMyBoardList();
    }, []);



    if (loading) return <div className="text-center mt-5" style={{paddingTop: "100px"}}>로딩 중...</div>;
    if (error) return <div className="text-danger mt-5" style={{paddingTop: "100px"}}>에러 발생: {error.message}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mt-5">작성글 목록</h4>

            </div>

            <table className="table table-hover">
                <thead className="table-light">
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">제목</th>
                        <th scope="col">작성자</th>
                        <th scope="col">날짜</th>
                    </tr>
                </thead>
                <tbody>
                    {boards.map((board, idx) => (
                        <tr key={board.id}>
                            <td>{board.id}</td>
                            <td>
                                <Link to={`/board/detail?no=${board.id}`} className="text-decoration-none">
                                    {board.title}
                                </Link>
                            </td>
                            <td>{board.memberNickname}</td>
                            <td>{board.modifiedDate}</td>
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

export default CheckMyArt;

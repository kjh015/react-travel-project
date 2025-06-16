import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardApiClient from "../../service/BoardApiClient";

const AdmnBoard = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });


    const navigate = useNavigate();
    const getBoards = async () => {
        setLoading(true);
        try {
            const res = await BoardApiClient.getBoardList();
            const data = await res.json();
            setBoards(data);
        } catch (e) {
            setError(e);
        } finally {
            setLoading(false);
        }
    };
    const removeBoard = ({ no }) => {
        if (window.confirm("정말 삭제하시겠습니까?")) {
            BoardApiClient.removeBoard(no).then(
                res => {
                    if (res.ok) {
                        setAlert({ show: true, message: "삭제 성공", type: "success" });
                        getBoards();
                    } else {
                        setAlert({ show: true, message: "삭제 실패", type: "danger" });
                    }
                }
            )
        }
    }
    const migrateData = () => {
        if (window.confirm("정말 적재하시겠습니까?")) {
            BoardApiClient.migrateBoard().then(
                res => res.text().then(
                    message => alert(message)
                )
            )
        }
    }

    useEffect(() => {
        getBoards();
    }, []);

    if (loading) return <div className="text-center mt-5" style={{ marginTop: 80 }}>로딩 중...</div>;
    if (error) return <div className="text-danger mt-5" style={{ marginTop: 80 }}>에러 발생: {error.message}</div>;

    return (
        <div>

            <div className="container">
                <h4 style={{ marginTop: '80px' }}>게시판 관리 페이지</h4>
                <button className="btn btn-danger" onClick={migrateData}>데이터 적재하기(MySQL - ElasticSearch)</button>
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 style={{ marginTop: '80px' }}>게시판 목록</h4>
                        <Link to="/board/write" className="btn btn-primary">글쓰기</Link>
                    </div>

                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">날짜</th>
                                <th scope="col">수정</th> {/* 수정 열 추가 */}
                                <th scope="col">삭제</th>
                                <th scope="col">숨김</th>
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
                                    <td>
                                        <Link to={`/board/edit?no=${board.id}`} className="btn btn-sm btn-outline-primary">
                                            수정
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => removeBoard({ no: board.id })}>
                                            삭제
                                        </button>
                                    </td>
                                    <td>
                                        <Link to="/board/page/BoardEditPage" className="btn btn-sm btn-outline-primary">
                                            숨김
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdmnBoard;


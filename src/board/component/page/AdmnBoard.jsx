import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import BoardApiClient from "../../service/BoardApiClient";

const AdmnBoard = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' });

    const navigate = useNavigate();

    // 날짜 포맷 함수 (분까지만)
    function formatDate(dateStr) {
        if (!dateStr) return '';
        let clean = dateStr.replace('T', ' ');
        return clean.slice(0, 16);
    }

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
            );
        }
    };

    const migrateData = () => {
        if (window.confirm("정말 적재하시겠습니까?")) {
            BoardApiClient.migrateBoard().then(
                res => res.text().then(
                    msg => setAlert({show: true, message: msg, type: "success"})
                )
            );
        }
    };

    useEffect(() => {
        getBoards();
    }, []);

    if (loading) return <div className="text-center mt-5" style={{ marginTop: 80 }}>로딩 중...</div>;
    if (error) return <div className="text-danger mt-5" style={{ marginTop: 80 }}>에러 발생: {error.message}</div>;

    return (
        <div>
            <div className="container">
                <h4 style={{ marginTop: '80px' }}>여행지 관리 페이지</h4>
                <button className="btn btn-danger" onClick={migrateData}>
                    데이터 적재하기(MySQL - ElasticSearch)
                </button>
                <div className="container mt-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 style={{ marginTop: '80px' }}>여행지 목록</h4>
                    </div>
                    <table className="table table-hover">
                        <thead className="table-light">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">제목</th>
                                <th scope="col">작성자</th>
                                <th scope="col">날짜</th>
                                <th scope="col">수정</th>
                                <th scope="col">삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {boards.map((board) => (
                                <tr key={board.id}>
                                    <td>{board.id}</td>
                                    <td>
                                        <Link to={`/board/detail?no=${board.id}`} className="text-decoration-none">
                                            {board.title}
                                        </Link>
                                    </td>
                                    <td>{board.memberNickname}</td>
                                    <td>{formatDate(board.modifiedDate)}</td>
                                    <td>
                                        <Link to={`/board/edit?no=${board.id}`} className="btn btn-sm btn-outline-primary">
                                            수정
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => removeBoard({ no: board.id })}
                                        >
                                            삭제
                                        </button>
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

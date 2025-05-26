import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

// LikeListPage: 내 찜 게시글 목록 보여주기
const LikeListPage = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // 날짜 포맷 함수 (예: 24.05.26 15:32)
    const formatDate = (isoString) => {
        if (!isoString) return "";
        const d = new Date(isoString);
        return d.toLocaleString("ko-KR", {
            year: "2-digit",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    // 찜한 게시글 목록 불러오기
    const getBoardList = async () => {
        setLoading(true);
        setError(null);

        try {
            // 실제 API 경로에 맞게 수정하세요!
            // 인증이 필요하면 Authorization 헤더 추가(주석 참고)
            // const token = localStorage.getItem('accessToken');
            // const res = await fetch('/api/like/list', {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            const res = await fetch('/api/like/list');
            if (!res.ok) throw new Error('찜목록 불러오기 실패');
            const data = await res.json();
            setBoards(data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getBoardList();
    }, []);

    if (loading) return <div className="text-center mt-5">로딩 중...</div>;
    if (error) return <div className="text-danger mt-5">에러 발생: {error.message}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 style={{ marginTop: '80px' }}>찜목록</h4>
                <Link to="/board/write" className="btn btn-primary">글쓰기</Link>
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
                    {boards.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="text-center text-muted">
                                찜한 게시글이 없습니다.
                            </td>
                        </tr>
                    ) : (
                        boards.map((board) => (
                            <tr key={board.id}>
                                <td>{board.id}</td>
                                <td>
                                    <Link to={`/board/detail?no=${board.id}`} className="text-decoration-none">
                                        {board.title}
                                    </Link>
                                </td>
                                <td>{board.memberNickname}</td>
                                <td>{formatDate(board.modifiedDate)}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default LikeListPage;

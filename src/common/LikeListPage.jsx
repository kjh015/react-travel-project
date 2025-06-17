import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CommonApiClient from './service/CommonApiClient';

//찜 목록 파일
const LikeListPage = () => {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const nickname = localStorage.getItem("nickname");

    const getFavoriteList = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await CommonApiClient.getMyFavorite(nickname);
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
        getFavoriteList();
    }, []);

    if (loading) return <div className="text-center mt-5" style={{ paddingTop: "100px" }}>로딩 중...</div>;
    if (error) return <div className="text-danger mt-5" style={{ paddingTop: "100px" }}>에러 발생: {error.message}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mt-5">찜 목록</h4>

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
        </div>
    );
};

export default LikeListPage;

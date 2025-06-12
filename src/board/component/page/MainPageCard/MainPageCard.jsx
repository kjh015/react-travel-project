import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BoardApiClient from '../../../service/BoardApiClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1등 왕관 배지 스타일
const firstRankBadgeStyle = {
  position: 'absolute',
  top: 22,
  left: 22,
  background: 'linear-gradient(135deg, #ffd700 70%, #fff9c4 100%)',
  color: "#725b10",
  fontWeight: 900,
  borderRadius: "50%",
  width: 54,
  height: 54,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "2rem",
  boxShadow: "0 4px 12px rgba(180,140,20,0.13)",
  border: "3px solid #fffbe8",
  zIndex: 5
};

const MainPageCard = ({ boardId, score, rank }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    id: '', title: '', content: '', memberNickname: '',
    travelPlace: '', address: '', category: '', region: '', imagePaths: [],
    createdDate: '', modifiedDate: ''
  });

  useEffect(() => {
    BoardApiClient.getBoard(boardId).then(
      res => {
        if (res.ok) {
          res.json().then(data => setBoard({ ...data, imagePaths: data.imagePaths || [] }));
        }
      }
    );
  }, [boardId]);

  return (
    <div className="w-100 h-100 d-flex align-items-stretch position-relative">
      {/* --- 1등 왕관 배지 --- */}
      {(rank === 1 || rank === undefined) && (
        <div style={firstRankBadgeStyle}>
          <span role="img" aria-label="king-crown" style={{ fontSize: "2.2rem", marginTop: "-4px" }}>👑</span>
        </div>
      )}

      <div
        className="card border-0 shadow-lg rounded-4 overflow-hidden w-100"
        style={{
          background: "rgba(250,250,255,0.96)",
          boxShadow: "0 8px 32px rgba(60,60,100,0.14)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 이미지 */}
        <div style={{ position: "relative", width: "100%" }}>
          {board.imagePaths && board.imagePaths.length > 0 ? (
            <img
              src={`http://localhost:8000/board${board.imagePaths[0]}`}
              alt="Main visual"
              className="card-img-top"
              style={{
                height: '390px',
                width: '100%',
                objectFit: 'cover',
                filter: "brightness(98%)",
                display: 'block'
              }}
            />
          ) : (
            <div style={{ height: '390px', background: "#f3f3f8" }} />
          )}
          <div style={{
            position: "absolute",
            bottom: "18px",
            left: "20px",
            background: "rgba(30,30,55,0.56)",
            color: "#fff",
            padding: "0.75rem 1.25rem",
            borderRadius: "1.2rem",
            fontWeight: 600,
            fontSize: "1.2rem",
            letterSpacing: "-0.01em",
            boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem"
          }}>
            <span style={{ fontSize: "1.35em" }}>🚂</span>
            Score: <span style={{ color: "#e0c3fc", fontWeight: 700 }}>{score}</span>
          </div>
        </div>
        <div className="card-body px-4 py-4">
          <div className="mb-3" style={{ fontSize: "1.09rem", color: "#333", fontWeight: 500 }}>
            {board.title}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <div className="btn-group gap-2">
              <button
                type="button"
                className="btn btn-primary px-4 d-flex align-items-center gap-2"
                style={{
                  borderRadius: "2rem",
                  fontWeight: 500,
                  boxShadow: "0 2px 8px rgba(160,120,240,0.07)"
                }}
              >
                <span role="img" aria-label="write">✏️</span> 글쓰기
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary px-4 d-flex align-items-center gap-2"
                style={{
                  borderRadius: "2rem",
                  fontWeight: 500
                }}
                onClick={() => { navigate(`/board/detail/?no=${board.id}`); }}
              >
                <span role="img" aria-label="search">🔍</span> 둘러보기
              </button>
            </div>
            <small className="text-muted">분 전 · by <b>{board.memberNickname}</b></small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageCard;

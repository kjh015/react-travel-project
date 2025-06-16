import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BoardApiClient from '../../../service/BoardApiClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// 1~5위 색상 예시
const rankColors = ["#ffd700", "#C0C0C0", "#cd7f32", "#90caf9", "#b39ddb"];

const MainPageCard2 = ({ boardId, score, rank }) => {
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
    <div className="w-100 h-100 d-flex align-items-stretch position-relative" style={{ minHeight: 112, position: 'relative' }}>
      {/* --- 순위 뱃지 --- */}
      {rank &&
        <div style={{
          position: 'absolute',
          top: 12, left: 12,
          background: rankColors[(rank - 1) % 5],
          color: "#fff",
          fontWeight: 900,
          borderRadius: "50%",
          width: 40, height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.2rem",
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          zIndex: 99,           // 카드 hover보다 확실히 위!
          pointerEvents: "none" // 클릭 이벤트는 카드로 전달
        }}>
          {rank}
        </div>
      }

      <div
        className="mainpage-card2-hover card border-0 shadow rounded-4 overflow-hidden w-100"
        style={{
          height: '100%',
          width: "100%",
          borderRadius: "1.3rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          transition: "transform 0.22s cubic-bezier(.19,1,.22,1), box-shadow 0.18s",
          cursor: "pointer",
          zIndex: 1, // 뱃지보다 낮게!
        }}
        onClick={() => { navigate(`/board/detail/?no=${board.id}`); }}
      >
        {/* 이미지 or 배경 */}
        <div style={{ width: "40%", height: "100%" }}>
          {board.imagePaths && board.imagePaths.length > 0 ? (
            <img
              src={`http://14.63.178.161${board.imagePaths[0]}`}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderTopLeftRadius: "1.3rem",
                borderBottomLeftRadius: "1.3rem"
              }}
            />
          ) : (
            <div style={{
              width: "100%",
              height: "100%",
              background: "#e9e5fa"
            }} />
          )}
        </div>
        <div className="card-body py-3 px-4 d-flex flex-column justify-content-center" style={{ width: "60%" }}>
          <h6 className="fw-bold" style={{
            color: "#6247aa",
            fontSize: "1.09rem",
            marginBottom: 6,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {board.title}
          </h6>
          <div style={{
            color: "#555",
            fontSize: "0.97rem",
            height: "2.3em",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            score: {score}
          </div>
          <div className="d-flex justify-content-between align-items-center mt-2">
            <small className="text-muted" style={{ fontSize: "0.95rem" }}>
              by <b>{board.memberNickname}</b>
            </small>
            <span style={{ fontSize: "1.06em" }}>🚄</span>
          </div>
        </div>
      </div>

      {/* Hover 효과 스타일 */}
      <style>
        {`
          .mainpage-card2-hover:hover {
            transform: scale(1.035);
            box-shadow: 0 8px 32px 0 rgba(100,100,150,0.19);
            z-index: 2; /* 뱃지(99)보다 낮거나 같게 유지 */
          }
        `}
      </style>
    </div>
  );
};

export default MainPageCard2;

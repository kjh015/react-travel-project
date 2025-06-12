import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BoardApiClient from '../../../service/BoardApiClient';
import { useEffect, useState } from 'react';

const MainPageCard2 = ({ boardId, score }) => {
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
    <div className="w-100 h-100 d-flex align-items-stretch">
      <div
        className="card border-0 shadow rounded-4 overflow-hidden w-100"
        style={{
          height: '100%',         // 부모에서 height 강제
          width: "100%",
          borderRadius: "1.3rem",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* 이미지 or 배경 */}
        <div style={{ width: "40%", height: "100%" }}>
          {board.imagePaths && board.imagePaths.length > 0 ? (
            <img
              src={`http://localhost:8000/board${board.imagePaths[0]}`}
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
          <h6 className="fw-bold" style={{ color: "#6247aa", fontSize: "1.09rem", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {board.title}
          </h6>
          <div style={{ color: "#555", fontSize: "0.97rem", height: "2.3em", overflow: "hidden", textOverflow: "ellipsis" }}>
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
    </div>
  );
};

export default MainPageCard2;

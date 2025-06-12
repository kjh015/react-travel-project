import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import viewImage from '../../imgs/view.jpg';
import BoardApiClient from '../../../service/BoardApiClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";

const MainPageCard = ({ boardId }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    id: '', title: '', content: '', memberNickname: '',
    travelPlace: '', address: '', category: '', region: '', imagePaths: [],
    createdDate: '', modifiedDate: ''
  });

  useEffect(() => {
    BoardApiClient.getBoard(boardId).then(res => {
      if (res.ok) {
        res.json().then(data => setBoard({ ...data, imagePaths: data.imagePaths || [] }));
      } else {
        console.log('게시글을 불러오지 못했습니다.');
      }
    });
  }, [boardId]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              maxWidth: "760px", // 여기서 폭을 넓게!
              margin: "0 auto",
              minHeight: "440px",
              transition: "box-shadow 0.3s, transform 0.3s",
              boxShadow: "0 8px 32px rgba(60,60,100,0.14)"
            }}
          >
            {/* 이미지 + 오버레이 문구 */}
            <div style={{ position: "relative", width: "100%" }}>
              <img
                src={
                  board.imagePaths && board.imagePaths.length > 0
                    ? `http://localhost:8000/board${board.imagePaths[0]}`
                    : viewImage
                }
                alt="Main visual"
                className="card-img-top"
                style={{
                  height: '340px',
                  width: '100%',
                  objectFit: 'cover',
                  filter: "brightness(98%)",
                  display: 'block'
                }}
              />
              {/* 오버레이 문구 */}
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
                특별한 여행, <span style={{ color: "#e0c3fc", fontWeight: 700 }}>지금 시작!</span>
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
                    onClick={() => navigate('/board/write')}
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
                    onClick={() => { navigate(`/board/detail/?no=${board.id}`) }}
                  >
                    <span role="img" aria-label="search">🔍</span> 둘러보기
                  </button>
                </div>
                <small className="text-muted">
                  {board.createdDate
                    ? `${formatDistanceToNow(parseISO(board.createdDate), { addSuffix: true, locale: ko })}`
                    : '방금 전'}
                  &nbsp;· by <b>{board.memberNickname}</b>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageCard;

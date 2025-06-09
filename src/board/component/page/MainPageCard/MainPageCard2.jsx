import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import trainImg from '../../imgs/train.jpg';
import { useEffect, useState } from 'react';
import BoardApiClient from '../../../service/BoardApiClient';

const MainPageCard2 = ({boardId}) => {
  const [board, setBoard] = useState({
      id: '', title: '', content: '', memberNickname: '',
      travelPlace: '', address: '', category: '', region: '', imagePaths: [],
      createdDate: '', modifiedDate: ''
    });
  
    const viewBoard = () => {
      BoardApiClient.getBoard(boardId).then(
        res => {
          if (res.ok) {
            res.json().then(data => setBoard({ ...data, imagePaths: data.imagePaths || [] }));
          } else {
            console.log('게시글을 불러오지 못했습니다.');
          }
        }
      )
    }
    useEffect(() => {
      console.log(boardId);
      viewBoard()
    }, [boardId]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div
            className="card border-0 shadow rounded-4 overflow-hidden"
            style={{
              maxWidth: "420px",
              margin: "0 auto",
              transition: "box-shadow 0.2s, transform 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.025)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >
            {/* 상단 이미지 */}
            <div style={{ position: "relative" }}>

              {/* 이미지 오버레이 간단 문구 */}
              <div style={{
                position: "absolute",
                bottom: "10px",
                left: "18px",
                background: "rgba(45,40,90,0.52)",
                color: "#fff",
                borderRadius: "1rem",
                padding: "0.4rem 1.1rem",
                fontSize: "1.04rem",
                fontWeight: "500",
                letterSpacing: "-0.01em"
              }}>
                🚄 기차여행, 설레는 순간
              </div>
            </div>

            <div className="card-body p-4">
              <h5 className="card-title mb-3 fw-bold" style={{ color: "#6247aa", fontSize: "1.13rem" }}>
                {board.title}
              </h5>
              <p className="card-text mb-4" style={{ color: "#555", fontSize: "1.04rem" }}>
                {board.content}
              </p>
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="btn-group gap-2">
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    style={{
                      borderRadius: "2rem",
                      fontWeight: 500,
                      boxShadow: "0 1px 6px rgba(90,90,140,0.10)"
                    }}
                  >
                    View
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4"
                    style={{
                      borderRadius: "2rem", 
                      fontWeight: 500
                    }}
                  >
                    Edit
                  </button>
                </div>
                <small className="text-muted" style={{ fontSize: "0.99rem" }}>
                  9분 전
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageCard2;

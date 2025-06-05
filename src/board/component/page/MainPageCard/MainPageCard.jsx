import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import viewImage from '../../imgs/view.jpg';
import BoardApiClient from '../../../service/BoardApiClient';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPageCard = ({ boardId }) => {
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    id: '', title: '', content: '', memberNickname: '',
    travelPlace: '', address: '', category: '', region: '', imagePaths: [],
    createdDate: '', modifiedDate: ''
  });

  const viewBoard = () => {
    BoardApiClient.getBoard(boardId).then(
      res => {
        if (res.ok) {
          res.json().then(data => setBoard({ ...data, images: data.images || [] }));
        } else {
          alert('게시글을 불러오지 못했습니다.');
        }
      }
    )
  }
  useEffect(() => {
    viewBoard()
    console.log(board.imagePaths);
  }, [boardId]);



  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div
            className="card border-0 shadow-lg rounded-4 overflow-hidden"
            style={{
              background: "rgba(250,250,255,0.96)",
              transition: "box-shadow 0.3s, transform 0.3s",
              boxShadow: "0 8px 32px rgba(60,60,100,0.14)"
            }}
          >
            {/* 이미지를 카드에 딱 맞게 꽉 채우기 */}

            <img
              src={`http://localhost:8000/board${board.imagePaths[0]}`}
              alt="uploaded"
              className="card-img-top" // Bootstrap의 card 상단 이미지 전용 클래스!
              style={{
                height: '340px',        // 원하는 비율로 조정
                width: '100%',          // 카드 가로를 꽉 채움
                objectFit: 'cover',     // 이미지를 잘라서 빈 공간 없이 채움
                filter: "brightness(98%)",
                display: 'block'        // 여백 방지
              }}
            />

            <div className="card-body px-4 py-4">
              <h4 className="card-title mb-3 fw-bold">{board.title}</h4>
              <p className="card-text text-secondary mb-4" style={{ fontSize: "1.1rem" }}>
                {board.content}
              </p>
              <div className="d-flex justify-content-between align-items-center mt-3">
                <div className="btn-group gap-2">
                  <button
                    type="button"
                    className="btn btn-primary px-4 d-flex align-items-center gap-2"
                    style={{
                      transition: "background 0.2s, box-shadow 0.2s"
                    }}
                  >
                    글쓰기
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 d-flex align-items-center gap-2"
                    style={{
                      transition: "color 0.2s, border 0.2s"
                    }}
                    onClick={() => {navigate(`/board/detail/?no=${board.id}`)}}
                  >
                    둘러보기
                  </button>
                </div>
                <small className="text-muted">분 전 · by <b>{board.memberNickname}</b></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageCard;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import trainImg from '../../imgs/train.jpg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardApiClient from '../../../service/BoardApiClient';
import { formatDistanceToNow, parseISO } from "date-fns";
import ko from "date-fns/locale/ko";

const MainPageCard2 = ({ boardId }) => {
  const [board, setBoard] = useState({
    id: '', title: '', content: '', memberNickname: '',
    travelPlace: '', address: '', category: '', region: '', imagePaths: [],
    createdDate: '', modifiedDate: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    BoardApiClient.getBoard(boardId).then(
      res => {
        if (res.ok) {
          res.json().then(data => setBoard({ ...data, imagePaths: data.imagePaths || [] }));
        } else {
          console.log('게시글을 불러오지 못했습니다.');
        }
      }
    );
  }, [boardId]);

  return (
    <div className="container my-5">
      <div className="row justify-content-center g-3">
        <div className="col-12 col-sm-10 col-md-8 col-lg-5">
          <div
            className="card border-0 shadow rounded-4 overflow-hidden"
            style={{
              maxWidth: "420px",
              minHeight: "150px",
              margin: "0 auto",
              transition: "box-shadow 0.2s, transform 0.2s"
            }}
            onMouseOver={e => e.currentTarget.style.transform = "scale(1.025)"}
            onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
          >


            <div className="card-body p-4">
              {/* 제목-글쓴이-점수 한 줄 정렬 */}
              <div className="d-flex align-items-center mb-3" style={{ minHeight: "1.8em" }}>
                {/* 제목(왼쪽) */}
                <span className="fw-bold" style={{ color: "#6247aa", fontSize: "1.13rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 110 }}>
                  제목2{board.title}
                </span>
                {/* 글쓴이(가운데) */}
                <span className="mx-auto" style={{ fontWeight: 500, fontSize: "0.98em", color: "#333" }}>
                  글쓴이2{board.memberNickname}
                </span>
                {/* 점수(오른쪽) */}
                <span style={{ fontWeight: 400, fontSize: "0.97em", color: "#8874bb" }}>
                  점수: 4.7
                </span>
              </div>
              {/* 이하 기타 내용 추가 */}
              <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="btn-group gap-2">
                  {/* 필요하면 버튼 등 삽입 */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageCard2;

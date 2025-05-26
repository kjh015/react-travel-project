import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import viewImage from '../../imgs/view.jpg';

const MainPageCard = () => {
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
              src={viewImage}
              alt="Main visual"
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
              <h4 className="card-title mb-3 fw-bold">여행의 모든 순간, 함께!</h4>
              <p className="card-text text-secondary mb-4" style={{ fontSize: "1.1rem" }}>
                여러분의 소중한 여행 경험을 나누고, 새로운 인연을 만나보세요.<br />
                이곳에서 사진, 후기, 꿀팁을 자유롭게 공유할 수 있습니다.
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
                  >
                    둘러보기
                  </button>
                </div>
                <small className="text-muted">9분 전 · by <b>유정석</b></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageCard;

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
            <div style={{ position: "relative" }}>
              <img
                src={viewImage}
                alt="Main visual"
                className="img-fluid"
                style={{
                  height: '340px',
                  objectFit: 'cover',
                  filter: "brightness(98%)"
                }}
              />
              {/* 이미지 위 오버레이 & 텍스트 (선택) */}
              {/* <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  width: "100%",
                  background: "rgba(40,40,60,0.32)",
                  color: "#fff",
                  padding: "16px",
                  fontSize: "1.3rem",
                  fontWeight: 600
                }}
              >
                메인 이미지를 설명하는 문구!
              </div> */}
            </div>
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
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary px-4 d-flex align-items-center gap-2"
                    style={{
                      transition: "color 0.2s, border 0.2s"
                    }}
                  >
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

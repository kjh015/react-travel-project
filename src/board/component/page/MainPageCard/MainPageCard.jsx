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
            {/* 이미지 + 오버레이 문구 */}
            <div style={{ position: "relative", width: "100%" }}>
              <img
                src={viewImage}
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
              {/* 카드 메인 텍스트(설명) */}
              <div className="mb-3" style={{ fontSize: "1.09rem", color: "#333", fontWeight: 500 }}>
                잊지 못할 여행의 순간을 기록하세요.
                <span style={{ color: "#a18cd1", fontWeight: 600 }}> 사진, 꿀팁, 후기를 공유하면</span>
                새로운 인연과 만남이 펼쳐집니다.
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
                  >
                    <span role="img" aria-label="search">🔍</span> 둘러보기
                  </button>
                </div>
                <small className="text-muted" style={{ fontSize: "0.99rem" }}>
                  9분 전 · by <b style={{ color: "#7e57c2" }}>유정석</b>
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

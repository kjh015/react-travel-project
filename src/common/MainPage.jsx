import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from './Navbar';

import MainPageCard from '../board/component/page/MainPageCard/MainPageCard';
import MainPageCard2 from '../board/component/page/MainPageCard/MainPageCard2';
import Footers from './Footers';

const MainPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflowX: "hidden",
        background: "linear-gradient(135deg, #f0f8ff 0%, #e0c3fc 100%)",
        position: "relative",
      }}
    >
      <Navbar />

      {/* 본문 영역 */}
      <div style={{ marginTop: "80px" }}>
        {/* 설명 박스: MainPageCard 바로 위 */}
        <div
          style={{
            margin: "0 auto 24px auto",
            background: "rgba(255,255,255,0.83)",
            padding: "0.8rem 1.2rem",
            borderRadius: "1.1rem",
            boxShadow: "0 2px 12px rgba(90,90,120,0.10)",
            textAlign: "center",
            width: "82%",
            maxWidth: "440px",
            fontSize: "0.98rem",
            fontWeight: "500",
            color: "#333"
          }}
        >
          <h4 className="card-title mb-2 fw-bold" style={{ fontSize: "1.07rem" }}>
            여행의 모든 순간, 함께!
          </h4>
          여러분의 소중한 여행 경험을 나누고,<br />
          새로운 인연을 만나보세요.<br />
          이곳에서 사진, 후기, 꿀팁을 자유롭게 공유할 수 있습니다.
        </div>

        {/* 카드들 */}
        <MainPageCard />
        <MainPageCard2 />
        <MainPageCard2 />
        <MainPageCard2 />

        <Footers />
      </div>
    </div>
  );
};

export default MainPage;

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
        minHeight: "100vh",           // 최소 높이: 브라우저 창 높이
        width: "100vw",               // 가로폭: 브라우저 창 전체
        overflowX: "hidden",          // 가로 스크롤 방지 (필요시)
        background: "linear-gradient(135deg, #f0f8ff 0%, #e0c3fc 100%)",
        position: "relative"          // 하위 요소 레이아웃 보호
      }}
    >
      <Navbar />

      {/* 본문 영역 */}
      <div style={{ marginTop: "80px" }}>
        <MainPageCard />
        <MainPageCard2 />
        <Footers />
      </div>
    </div>
  );
};

export default MainPage;    
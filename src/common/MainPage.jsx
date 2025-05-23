import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import MainPageCard from '../board/component/page/MainPageCard/MainPageCard';
import MainPageCard2 from '../board/component/page/MainPageCard/MainPageCard2';


import Footers from './Footers';
import Navbar from "./Navbar";
// 로그인 Form 컴포넌트를 분리해도 좋음

const MainPage = () => {
  return (
    <div>
      {/* Navbar */}
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

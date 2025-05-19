import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


import MainPageCard from './MainPageCard/MainPageCard';
import MainPageCard2 from './MainPageCard/MainPageCard2';


import Footers from '../../../common/Footers';
import Navbar from "../../../common/Navbar";
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

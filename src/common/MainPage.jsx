import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

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
        background: "linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 60%, #fbc2eb 100%)",
        position: "relative",
        display: "flex",
        flexDirection: "column"
      }}
    >


      {/* 본문 영역 */}
      <main className="flex-grow-1 d-flex flex-column align-items-center justify-content-center"
        style={{ marginTop: "100px", marginBottom: "40px" }}>
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-12 col-md-6">
              <div className="p-4 bg-white rounded-4 shadow-sm">
                <MainPageCard />
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="p-4 bg-white rounded-4 shadow-sm">
                <MainPageCard2 />
              </div>
            </div>
          </div>
        </div>
      </main>

      <div style={{ flexShrink: 0 }}>
        <Footers />
      </div>
    </div>
  );
};

export default MainPage;

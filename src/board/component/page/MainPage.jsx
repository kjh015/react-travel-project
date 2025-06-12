import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from '../../../common/Navbar';
import MainPageCard from "./MainPageCard/MainPageCard";
import MainPageCard2 from "./MainPageCard/MainPageCard2";
import Footers from '../../../common/Footers';
import { useEffect, useState } from "react";
import BoardSearch from "./BoardSearch";
import tgd3 from '../imgs/tgd3.jpg';
import MergedCard from "./MainPageCard/MergedCard";

const MainPage = () => {
  const [top5Board, setTop5Board] = useState([]);

  useEffect(() => {
    const evt = new EventSource('http://localhost:8000/realtime-popular/sse');
    evt.onmessage = (e) => {
      setTop5Board(JSON.parse(e.data));
    };
    return () => evt.close();
  }, []);

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
      {/* 배경 사진 */}
      <div style={{
        position: "absolute",
        width: "100vw",
        height: "700px",
        zIndex: 1,
        overflow: "hidden",
        top: 0,
        left: 0,
        pointerEvents: "none"
      }}>
        <img
          src={tgd3}
          alt="배경"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.68,
            filter: "blur(2px)"
          }}
        />
      </div>

      {/* 본문(오버레이) */}
      <div
        style={{
          position: "relative", // absolute → relative
          zIndex: 2,
          padding: "0 24px",
          marginTop: "60px", // 헤더 공간 띄우기
        }}
      >
        <BoardSearch />

        <MergedCard />

        {/* 인기 게시글 리스트 */}
        <div className="row g-3 mt-4">
          {top5Board.length > 0 ? (
            top5Board.map((board, idx) => (
              <div className="col-md-6 col-lg-4" key={board.boardNo || idx}>
                {idx === 0 ? (
                  <MainPageCard boardId={board.boardNo} />
                ) : (
                  <MainPageCard2 boardId={board.boardNo} />
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-muted py-5">인기 게시글을 불러오는 중...</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from '../../../common/Navbar';

import MainPageCard from "./MainPageCard/MainPageCard";
import MainPageCard2 from "./MainPageCard/MainPageCard2";
import Footers from '../../../common/Footers';
import { useEffect, useState } from "react";
import BoardSearch from "./BoardSearch";
import tgd3 from '../imgs/tgd3.jpg';

const MainPage = () => {
  const [top5Board, setTop5Board] = useState([]);

  useEffect(() => {
    const evt = new EventSource('http://localhost:8000/realtime-popular/sse');
    evt.onmessage = (e) => {
      setTop5Board(JSON.parse(e.data));
    };
    return () => {
      evt.close();
    };
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

      {/* 사진+오버레이 통합 컨테이너 */}
      <div style={{ position: "relative", width: "100vw", height: "700px" }}>

        {/* 본문(오버레이) */}
        <div
          style={{
            position: "absolute",
            top: "60px", // 네비바 높이만큼 띄움(필요시 조정)
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "960px",
            zIndex: 2,
            padding: "0 24px",
          }}
        >
          <BoardSearch />
          <MainPageCard boardId={1} />
          <MainPageCard2 boardId={2} />
          {top5Board.map((board, idx) => (
            <div>
              {idx === 0 ? <MainPageCard boardId={board.boardNo} /> : <MainPageCard2 boardId={board.boardNo} />}
            </div>
          ))}
        </div>





        < div >
          {/* <Footers /> */}
        </div>
      </div>
    </div>
  );
};

export default MainPage;

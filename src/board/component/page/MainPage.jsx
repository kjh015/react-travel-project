import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbar from '../../../common/Navbar';

import MainPageCard from "./MainPageCard/MainPageCard";
import Footers from '../../../common/Footers';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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

  }, [top5Board]);



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
        {top5Board.map((board) => (
          <MainPageCard boardId={board.boardNo} />
        ))}

        <Footers />
      </div>
    </div>
  );
};

export default MainPage;    
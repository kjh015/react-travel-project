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
        {top5Board.map((board) => (
          <MainPageCard boardId={board.boardNo} />
        ))}


        <Footers />
      </div>
    </div>
  );
};

export default MainPage;

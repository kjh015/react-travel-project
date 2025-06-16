import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import BoardSearch from "./BoardSearch";
import tgd3 from '../imgs/tgd3.jpg';
import MainPageCardsLayout from "./MainPageCardsLayout";
import MainPageCardsLayout2 from "./MainPageCardsLayout2";
import Footers from "../../../common/Footers";

const MainPage = () => {
  const [top5Board, setTop5Board] = useState([]);

  useEffect(() => {
    const evt = new EventSource('http://14.63.178.161:8000/realtime-popular/sse');
    evt.onmessage = (e) => {
      setTop5Board(JSON.parse(e.data));
      console.log(e.data);
    };
    return () => {
      evt.close();
    };
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FF"
      }}
    >
      {/* Hero 이미지 영역 */}
      <div
        style={{
          width: "100%",
          minHeight: "370px",
          background: `linear-gradient(180deg, rgba(70,70,110,0.14) 15%, rgba(255,255,255,0.91) 65%), url(${tgd3}) center/cover no-repeat`,
          position: "relative",
        }}
      >
        {/* 오버레이 텍스트 */}
        <div
          style={{
            position: "absolute",
            top: 50, // 네비바 높이
            left: "50%",
            transform: "translateX(-50%)",
            width: "100%",
            maxWidth: "920px",
            zIndex: 3,
            textAlign: "center",
            padding: "56px 0 24px 0"
          }}
        >
          <h2 style={{
            color: "#272444",
            fontWeight: 800,
            fontSize: "2.25rem",
            letterSpacing: "-0.04em",
            textShadow: "0 1px 10px rgba(160,160,220,0.13)"
          }}>
            ✨ 여행의 모든 순간, 함께 모으는 이야기
          </h2>
          <p style={{
            color: "#584e88",
            fontWeight: 500,
            fontSize: "1.19rem",
            margin: "18px 0 0 0",
            textShadow: "0 1px 8px rgba(255,255,255,0.08)"
          }}>
            여러분의 소중한 경험과 인연을 이곳에! <br />
            사진, 후기, 꿀팁, 그리고 여행 설렘까지 자유롭게 나누세요.
          </p>
        </div>
        {/* 하단 Blur/그라데이션 오버레이 효과 */}
        <div style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          height: "100px",
          background: "linear-gradient(180deg, rgba(245,245,255,0) 0%, rgba(245,245,255,0.84) 100%)",
          zIndex: 2
        }} />
      </div>

      {/* 본문 컨테이너 (검색 + 카드영역) */}
      <div
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1020px",
          zIndex: 2,
          padding: "0 16px",
          marginTop: "-120px"
        }}
      >
        {/* 카드박스: 그림자+라운드 효과 */}
        <div

        >
          <BoardSearch />
          <link href="https://fonts.googleapis.com/css2?family=Gowun+Dodum&display=swap" rel="stylesheet" />
          <div

          >
            <h2 style={{
              textAlign: "center",
              width: "100%",
              color: "#998fc7",
              fontWeight: 800,
              fontSize: "2.3rem",
              margin: "0 0 24px 0",
              letterSpacing: "-0.04em"
            }}>
              실시간 인기 여행지
            </h2>
            <MainPageCardsLayout top5Board={top5Board} />
          </div>
        </div>

      </div>

      <div style={{ width: "100%", minHeight: "100vh", background: "#f5f6ff" }}>
        <div className="my-5">
          <h4 className="text-center mb-4">지역별 순위</h4>
          <MainPageCardsLayout2 top5Board={top5Board} />
        </div>
        <div className="my-5">
          <h4 className="text-center mb-4">카테고리별 순위</h4>
          <MainPageCardsLayout2 top5Board={top5Board} />
        </div>
      </div>


      <Footers />
    </div>
  );
};

export default MainPage;

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";
import BoardSearch from "./BoardSearch";
import tgd3 from '../imgs/tgd3.jpg';
import 서울 from '../imgs/지역별/서울.jpg'
import 부산 from '../imgs/지역별/부산.jpg'
import 강원 from '../imgs/지역별/강원.jpg'
import 제주 from '../imgs/지역별/제주.jpg'
import 대구 from '../imgs/지역별/대구.webp'

import 축제 from '../imgs/카테고리별/축제.jpg'
import 음식 from '../imgs/카테고리별/음식.jpg'
import 쇼핑 from '../imgs/카테고리별/쇼핑.avif'
import 자연 from '../imgs/카테고리별/자연.jpg'
import 가족 from '../imgs/카테고리별/가족.png'

import MainPageCardsLayout from "./MainPageCardsLayout";
import MainPageCardsLayout2 from "./MainPageCardsLayout2";
import Footers from "../../../common/Footers";

// 지역별 카드에 사용할 정보 배열
const regionInfo = [
  { name: "서울", img: 서울 },
  { name: "부산", img: 부산 },
  { name: "강원", img: 강원 },
  { name: "제주", img: 제주 },
  { name: "대구", img: 대구 },
];

// 카테고리 정보도 필요하다면 이런식으로 (참고)
const categoryInfo = [
  { name: "축제", img: 축제 },
  { name: "음식", img: 음식 },
  { name: "쇼핑", img: 쇼핑 },
  { name: "자연", img: 자연 },
  { name: "가족", img: 가족 },
];

const MainPage = () => {
  const [top5Board, setTop5Board] = useState([]);
  const [top5Region, setTop5Region] = useState([]);
  const [top5Category, setTop5Category] = useState([]);

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "travel_main_view",
      visit_time: new Date().toISOString(),
      referrer: document.referrer
    });

    const evt = new EventSource('http://localhost:8000/realtime-popular/sse');
    evt.onmessage = (e) => {
      const data = JSON.parse(e.data);
      setTop5Board(data.top5Boards);       // 게시글 인기 Top5
      setTop5Region(data.top5Regions);
      setTop5Category(data.top5Categories); // 카테고리 인기 Top5
    };

    return () => {
      evt.close();
    };
  }, []);

  // 지역별 이미지 카드 그리드 컴포넌트
  function RegionCardGrid() {
    return (
      <div className="d-flex flex-wrap justify-content-center gap-4 my-4">
        {regionInfo.map((item, idx) => (
          <div
            key={idx}
            className="card shadow-sm border-0"
            style={{
              width: "220px",
              borderRadius: "14px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 2px 12px rgba(50,50,120,0.08)"
            }}
          >
            <img src={item.img} alt={item.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
            <div className="card-body py-2 text-center" style={{ background: "#f6f2ff" }}>
              <b>{item.name}</b>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // 필요하면 카테고리 이미지 카드도 비슷하게
  function CategoryCardGrid() {
    return (
      <div className="d-flex flex-wrap justify-content-center gap-4 my-4">
        {categoryInfo.map((item, idx) => (
          <div
            key={idx}
            className="card shadow-sm border-0"
            style={{
              width: "220px",
              borderRadius: "14px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 2px 12px rgba(50,50,120,0.08)"
            }}
          >
            <img src={item.img} alt={item.name} style={{ width: "100%", height: "140px", objectFit: "cover" }} />
            <div className="card-body py-2 text-center" style={{ background: "#f6f2ff" }}>
              <b>{item.name}</b>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F5F6FF",
        width: "100%",
        overflowX: "hidden"
      }}
    >
      {/* 히어로 섹션 */}
      <div
        style={{
          width: "100%",
          minHeight: "500px",
          background: `linear-gradient(180deg, rgba(70,70,110,0.14) 15%, rgba(255,255,255,0.91) 65%), url(${tgd3}) center/cover no-repeat`,
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "32px",
        }}
      >
        {/* 히어로 콘텐츠 */}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            zIndex: 2,
            marginTop: "-50px"
          }}
        >
          <div
            style={{
              textAlign: "center",
              position: "relative",
              display: "inline-block",
              padding: "1rem 4.5rem 10rem 4.5rem",
              background: "rgba(255,255,255,0.65)",
              boxShadow: "0 6px 36px rgba(80,60,180,0.08)",
              backdropFilter: "blur(4px)",
              border: "1.5px solid rgba(190,180,255,0.13)",
              zIndex: 3,
              minWidth: 320,
              maxWidth: "94vw"
            }}
          >
            {/* 그라데이션 타이틀 */}
            <h2
              style={{
                fontSize: "3.42rem",
                fontWeight: 900,
                letterSpacing: "-0.04em",
                background: "linear-gradient(90deg, #B794F4 40%, #90CDF4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
                textShadow: "0 1px 10px rgba(160,160,220,0.09)",
                margin: 0,
                fontFamily: "'Montserrat', 'Gowun Dodum', sans-serif"
              }}
            >
              Trip Now!
            </h2>
            {/* 장식선 */}
            <div
              style={{
                height: "3.5px",
                width: "60px",
                margin: "0.7rem auto 1.1rem auto",
                borderRadius: "2rem",
                background: "linear-gradient(90deg,#bdaafc 20%, #92e0f6 90%)",
                opacity: 0.88
              }}
            />
            {/* 서브텍스트 */}
            <p style={{
              color: "#5B4B9A",
              fontWeight: 500,
              fontSize: "1.16rem",
              margin: "0.7rem 0 0 0",
              textShadow: "0 2px 8px rgba(255,255,255,0.09)"
            }}>
              여러분의 소중한 경험과 인연을 이곳에!<br />
              사진, 후기, 꿀팁, 그리고 여행 설렘까지 자유롭게 나누세요.
            </p>
          </div>
        </div>
        {/* 하단 블러/그라데이션 오버레이 */}
        <div style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          height: "100px",
          background: "linear-gradient(180deg, rgba(245,245,255,0) 0%, rgba(245,245,255,0.84) 100%)",
          zIndex: 2
        }} />
      </div>

      {/* 본문 컨테이너 (검색 + 카드) */}
      <div
        style={{
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100%",
          maxWidth: "1020px",
          zIndex: 2,
          padding: "0 16px",
          marginTop: "-290px"
        }}
      >
        <div >
          <BoardSearch />
          <div style={{ marginBottom: "32px" }}>
            <h2 style={{
              textAlign: "start",
              width: "100%",
              fontFamily: "'Montserrat', 'Gowun Dodum', sans-serif",
              color: "#a68eff",
              fontWeight: 900,
              fontSize: "2.35rem",
              margin: "0 0 26px 0",
              letterSpacing: "-0.03em",
              textShadow: "0 2px 16px rgba(92,67,226,0.08)",
              transform: "translateY(28px)"
            }}>
              실시간 인기 여행지
            </h2>
            <MainPageCardsLayout top5Board={top5Board} />
          </div>
        </div>
      </div>

      {/* ---- 지역별 이미지 카드 그리드 ---- */}
      <div className="mt-5 mb-4">
        <h4 style={{
          textAlign: "center",
          fontFamily: "'Montserrat', 'Gowun Dodum', sans-serif",
          color: "#b7aaff",
          fontWeight: 700,
          fontSize: "1.55rem",
          letterSpacing: "-0.03em",
          marginBottom: "1.4rem"
        }}>
          지역별 여행지 대표 이미지
        </h4>
        <RegionCardGrid />
      </div>

      {/* ---- 카테고리별 이미지 카드 그리드 ---- */}
      <div className="mt-5 mb-4">
        <h4 style={{
          textAlign: "center",
          fontFamily: "'Montserrat', 'Gowun Dodum', sans-serif",
          color: "#b7aaff",
          fontWeight: 700,
          fontSize: "1.55rem",
          letterSpacing: "-0.03em",
          marginBottom: "1.4rem"
        }}>
          카테고리별 대표 이미지
        </h4>
        <CategoryCardGrid />
      </div>

      <Footers />
    </div>
  );
};

export default MainPage;

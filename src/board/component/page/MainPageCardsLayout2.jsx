import React from 'react';
import RankCard from './MainPageCard/RankCard';
// import MainPageCard2 from './MainPageCard/MainPageCard2'; // 필요시 사용

const cardWidth = 240;
const cardHeight = 200;

const MainPageCardsLayout2 = ({ top5Data }) => {
    if (!top5Data || top5Data.length < 5) return null;
    // 실제로는 top5Board 배열을 map으로!
    // 임시 예시용 데이터

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto",           // ★ 화면 가로 중앙
                gap: "24px",                // 카드 사이 여백
                overflowX: "auto",          // 스크롤
                padding: "8px 0",
            }}
        >
            {top5Data.map((data, idx) => (
                <div>
                    <div
                        key={idx}
                        style={{
                            width: `${cardWidth}px`,
                            height: `${cardHeight}px`,
                            flexShrink: 0,
                            borderRadius: "16px",
                            overflow: "hidden",
                            background: "#fff",
                            boxShadow: "0 2px 12px rgba(0,0,0,0.09)",
                            display: "flex",
                            alignItems: "stretch"
                        }}
                    >
                        {/* 실제로는 top5Board[idx] 데이터 넘기기 */}
                        {/* RankCard 쓰기 */}
                        <RankCard
                            data={data.region || data.category}
                            type={data.region ? "region" : "category"}
                            rank={idx + 1}
                        />
                    </div>
                    <div style={{
                        background: "rgba(30,30,55,0.56)",
                        color: "#fff",
                        padding: "1.75rem 0rem 0.2rem 4.75rem",
                        borderRadius: "1.2rem",
                        fontWeight: 600,
                        fontSize: "1.2rem",
                        letterSpacing: "-0.01em",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.6rem",
                        marginTop: "-25px",
                    }}>
                        <span style={{ color: "#fff", fontWeight: 700 }}>Score: {data.score}</span>

                    </div>

                </div>

            ))}
        </div>
    );
};

export default MainPageCardsLayout2;

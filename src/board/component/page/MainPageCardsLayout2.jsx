import React from 'react';
import RankCard from './MainPageCard/RankCard';
// import MainPageCard2 from './MainPageCard/MainPageCard2'; // 필요시 사용

const cardWidth = 240;
const cardHeight = 200;

const MainPageCardsLayout2 = ({ top5Data }) => {
    // 데이터 없거나 5개 미만이면 로딩 애니메이션
    if (!top5Data || top5Data.length < 5) {
        return (
            <div
                className="d-flex justify-content-center align-items-center"
                style={{
                    width: "100%",
                    minHeight: `${cardHeight + 80}px`,
                }}
            >
                <div style={{ textAlign: "center", width: "100%" }}>
                    <div
                        style={{
                            paddingRight: "100px",
                            fontSize: 100,
                            display: 'inline-block',
                            animation: 'plane-fly 1.6s ease-in-out infinite'
                        }}
                    >
                        🛫
                    </div>
                    <div className="mt-4 fs-5 text-secondary">
                        순위 데이터를 불러오는 중...
                    </div>
                    <style>{`
                        @keyframes plane-fly {
                            0% { transform: translateX(0) rotate(-6deg);}
                            30% { transform: translateX(40px) rotate(-2deg);}
                            50% { transform: translateX(80px) rotate(4deg);}
                            80% { transform: translateX(50px) rotate(-3deg);}
                            100% { transform: translateX(0) rotate(-6deg);}
                        }
                    `}</style>
                </div>
            </div>
        );
    }

    // 데이터 있을 때 카드 렌더링
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
                <div key={idx}>
                    <div
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
                        {/* RankCard */}
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
                        <span style={{ color: "#fff", fontWeight: 700 }}>
                            Score: {data.score}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MainPageCardsLayout2;

import React from 'react';
import RankCard from './MainPageCard/RankCard';
// import MainPageCard2 from './MainPageCard/MainPageCard2'; // 필요시 사용

const cardWidth = 240;
const cardHeight = 200;

const MainPageCardsLayout2 = ({ top5Board }) => {
    if (!top5Board || top5Board.length < 5) return null;
    // 실제로는 top5Board 배열을 map으로!
    // 임시 예시용 데이터
    const cardRanks = [1, 2, 3, 4, 5];

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
            {cardRanks.map((rank, idx) => (
                <div
                    key={rank}
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
                        boardId={rank}
                        score={100 - idx * 10}
                        rank={rank}
                    />
                </div>
            ))}
        </div>
    );
};

export default MainPageCardsLayout2;

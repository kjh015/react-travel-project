import React from 'react';
import MainPageCard from './MainPageCard/MainPageCard';
import MainPageCard2 from './MainPageCard/MainPageCard2';

const mainCardHeight = 520;

const MainPageCardsLayout = ({ top5Board }) => {
    if (!top5Board || top5Board.length < 5) return null;

    return (
        <div
            className="d-flex justify-content-center align-items-stretch"
            style={{
                minHeight: `${mainCardHeight}px`, // 높이 고정 (원하는 값)
                gap: '36px', // 좌우 여백
                width: "100%",
                marginTop: "48px"
            }}
        >
            {/* 왼쪽 큰 카드 */}
            <div
                style={{
                    width: "720px", // 원하면 더 키우거나 줄여도 됨
                    height: `${mainCardHeight}px`, // 높이 고정
                    display: 'flex',
                    alignItems: 'stretch'
                }}
            >
                <MainPageCard boardId={top5Board[0].boardNo} score={top5Board[0].score} />
            </div>

            {/* 오른쪽 카드2 4개 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: `${mainCardHeight}px`, // 카드1과 똑같이
                    width: "360px", // 원하는 비율로 조정
                    gap: "18px" // 카드2 사이 세로 간격
                }}
            >
                {top5Board.slice(1, 5).map((board, idx) => (
                    <div
                        key={board.boardNo}
                        style={{
                            height: `calc((100% - 54px) / 4)`, // (gap 18px * 3 = 54px)
                            minHeight: "0", // flex 컨테이너일 때 height 계산
                            display: 'flex'
                        }}
                    >
                        <MainPageCard2 boardId={board.boardNo} score={board.score} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPageCardsLayout;
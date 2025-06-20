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
                minHeight: `${mainCardHeight}px`,
                gap: '36px',
                width: "100%",
                marginTop: "48px"
            }}
        >
            {/* 왼쪽 큰 카드 (1위) */}
            <div
                style={{
                    width: "720px",
                    height: `${mainCardHeight}px`,
                    display: 'flex',
                    alignItems: 'stretch'
                }}
            >
                <MainPageCard boardId={top5Board[0].boardId} score={top5Board[0].score} rank={1} />
            </div>

            {/* 오른쪽 카드2 2~5위 */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    height: `${mainCardHeight}px`,
                    width: "360px",
                    gap: "18px"
                }}
            >
                {top5Board.slice(1, 5).map((board, idx) => (
                    <div
                        key={idx}
                        style={{
                            height: `calc((100% - 54px) / 4)`,
                            minHeight: "0",
                            display: 'flex'
                        }}
                    >
                        <MainPageCard2 boardId={board.boardId} score={board.score} rank={idx + 2} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPageCardsLayout;

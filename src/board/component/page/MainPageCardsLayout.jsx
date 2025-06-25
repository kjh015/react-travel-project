import React from 'react';
import MainPageCard from './MainPageCard/MainPageCard';
import MainPageCard2 from './MainPageCard/MainPageCard2';

const mainCardHeight = 520;

/**
 * 인기 게시판 카드 레이아웃
 * - 데이터가 5개 미만이면 비행기 로딩 애니메이션 표시
 * - 5개 이상이면 1~5위 카드 정렬
 */
const MainPageCardsLayout = ({ top5Board }) => {
    // 데이터가 5개 미만이면 로딩 화면
    if (!top5Board || top5Board.length < 5) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: `${mainCardHeight}px` }}>
                <div style={{ textAlign: "center", width: "100%" }}>
                    {/* 비행기 이모지 + 애니메이션 */}
                    <div style={{
                        paddingRight: "100px",

                        fontSize: 100,
                        display: 'inline-block',
                        animation: 'plane-fly 1.7s ease-in-out infinite'
                    }}>
                        🛫
                    </div>
                    <div className="mt-4 fs-5 text-secondary">
                        여행지 인기순위를 불러오는 중...
                    </div>
                    <div>
                        <div className='text-start'>
                            <style>{`
@keyframes plane-fly {
    0%   { transform: translateX(-30px) rotate(-6deg);}
    30%  { transform: translateX(-6px) rotate(-2deg);}
    50%  { transform: translateX(14px) rotate(4deg);}
    80%  { transform: translateX(-4px) rotate(-3deg);}
    100% { transform: translateX(-30px) rotate(-6deg);}
}
                    `}</style>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // 데이터 있을 때 카드 레이아웃 렌더링
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
                <MainPageCard
                    boardId={top5Board[0].boardId}
                    score={top5Board[0].score}
                    rank={1}
                />
            </div>

            {/* 오른쪽 2~5위 카드 */}
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
                        key={board.boardId}
                        style={{
                            height: `calc((100% - 54px) / 4)`,
                            minHeight: "0",
                            display: 'flex'
                        }}
                    >
                        <MainPageCard2
                            boardId={board.boardId}
                            score={board.score}
                            rank={idx + 2}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MainPageCardsLayout;

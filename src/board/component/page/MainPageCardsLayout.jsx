import React from 'react';
import MainPageCard from './MainPageCard/MainPageCard';
import MainPageCard2 from './MainPageCard/MainPageCard2';
import { AnimatePresence, motion } from 'framer-motion';



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
                <AnimatePresence mode="wait">
                    <motion.div
                        key={top5Board[0].boardId}
                        initial={{ opacity: 0, scale: 0.95, y: 25 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.93, y: -18 }}
                        transition={{ type: "spring", stiffness: 360, damping: 30 }}
                        style={{ width: "100%", height: "100%", position: 'relative' }}
                    >
                        <AnimatePresence mode="wait">
                            <div
                                style={{
                                    position: 'absolute',
                                    top: 22,
                                    left: 22,
                                    zIndex: 99,
                                    pointerEvents: "none",
                                    width: 54,
                                    height: 54,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    background: 'linear-gradient(135deg, #ffd700 70%, #fff9c4 100%)',
                                    color: "#725b10",
                                    fontWeight: 900,
                                    borderRadius: "50%",
                                    fontSize: "2rem",
                                    border: "3px solid #fffbe8",
                                    boxShadow: "0 4px 12px rgba(180,140,20,0.13)"
                                }}
                            >
                                <motion.div
                                    key={top5Board[0].boardId}
                                    initial={{ opacity: 0.6, scale: 1.1, boxShadow: "0 0 14px 8px #ffd70044" }}
                                    animate={{
                                        opacity: 1,
                                        scale: [1, 1.13, 1, 1.13, 1],
                                        boxShadow: [
                                            "0 0 12px 8px #ffd70033",       // 시작: 옅은 glow
                                            "0 0 32px 14px #ffd700bb",      // 첫 번째 반짝
                                            "0 0 12px 8px #ffd70055",       // 돌아옴
                                            "0 0 32px 14px #ffd700bb",      // 두 번째 반짝
                                            "0 0 10px 5px #ffd70077"         // 마지막: 노란 glow 남김!
                                        ]
                                    }}
                                    exit={{ opacity: 0, scale: 0.9, boxShadow: "0 0 0 0 #ffd70000" }}
                                    transition={{
                                        duration: 3.0, // 전체 애니메이션 시간 더 길게!
                                        times: [0, 0.19, 0.5, 0.81, 1], // keyframes 간 타이밍
                                        ease: "easeInOut",
                                        exit: { duration: 1.5, ease: "easeInOut" }
                                    }}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        width: "100%",
                                        height: "100%",
                                        borderRadius: "50%",
                                        background: "none",
                                        boxShadow: "none"
                                    }}
                                >
                                    <span
                                        role="img"
                                        aria-label="king-crown"
                                        style={{
                                            fontSize: "2.2rem",
                                            marginTop: "-4px",
                                            pointerEvents: "none"
                                        }}
                                    >
                                        👑
                                    </span>
                                </motion.div>
                            </div>
                        </AnimatePresence>


                        {/* 카드 본문 */}
                        <MainPageCard boardId={top5Board[0].boardId} score={top5Board[0].score} rank={1} />
                    </motion.div>
                </AnimatePresence>
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
                    <motion.div
                        key={board.boardId}
                        layout
                        style={{
                            height: `calc((100% - 54px) / 4)`,
                            minHeight: "0",
                            display: 'flex'
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 34 }}
                    >
                        <MainPageCard2 boardId={board.boardId} score={board.score} rank={idx + 2} />
                    </motion.div>
                ))}

            </div>
        </div>
    );
};

export default MainPageCardsLayout;

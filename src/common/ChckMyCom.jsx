import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const renderStarsStatic = (score = 0) => (
    <span>
        {[1, 2, 3, 4, 5].map(star => (
            <span
                key={star}
                style={{
                    fontSize: "1.15rem",
                    color: star <= score ? "#ffc107" : "#e4e5e9"
                }}
            >★</span>
        ))}
    </span>
);

const ChckMyCom = ({ comments = [], onRemoveComment }) => {
    return (
        <div className="container my-4">
            <div className="card shadow-sm border-1 rounded-4 mx-auto" style={{ maxWidth: 520, background: "#fafdffcc" }}>
                <div className="card-body p-4">
                    <h5 className="mb-4">댓글 목록</h5>
                    {(comments.length === 0) && <p className="text-muted">댓글이 없습니다.</p>}
                    <div>
                        {comments.map((c, idx) => (
                            <div key={idx} className="card mb-3 border-0 shadow-sm rounded-3 position-relative">
                                <div className="card-body">
                                    {/* x 버튼 */}
                                    <button
                                        type="button"
                                        className="btn btn-sm btn-light position-absolute"
                                        style={{
                                            top: 8,
                                            right: 10,
                                            border: "none",
                                            fontSize: "1.25rem",
                                            color: "#bbb",
                                            background: "transparent",
                                            zIndex: 10,
                                        }}
                                        onClick={() => onRemoveComment({ commentId: c.id })}
                                        aria-label="댓글 삭제"
                                    >
                                        ×
                                    </button>
                                    <div className="d-flex align-items mb-2">
                                        <strong className="me-2">{c.nickname}</strong>
                                        <span style={{ fontSize: "0.96rem", color: "#aaa" }}>
                                            {c.rating > 0 && (
                                                <div className="mb-1">{renderStarsStatic(c.rating)}</div>
                                            )}
                                        </span>
                                    </div>
                                    <div className="mb-2">{c.content}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ChckMyCom;

import React, { useEffect, useState } from 'react';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';

const DeduplicationRow = ({ processId, index, data, onChange, onRemove }) => {
    const [formatList, setFormatList] = useState([]);

    useEffect(() => {
        DeduplicationApiClient.getFormatKeys(processId)
            .then(res => res.json().then(data => setFormatList(data)));
    }, [processId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(index, { ...data, [name]: value });
    };

    // 스타일 유틸
    const inputBoxStyle = { width: 90, textAlign: 'center', display: 'inline-block' };
    const labelStyle = { minWidth: 28, textAlign: 'center', display: 'inline-block' };

    return (
        <div
            className="border rounded bg-white p-3 mb-3"
            style={{
                boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                position: 'relative'
            }}
        >
            {/* 포맷/값 한 줄 */}
            <div className="row align-items-center mb-3">
                <label className="form-label d-flex mb-1 fw-bold justify-content-center">포맷</label>
                <div className="col-12 d-flex gap-2 justify-content-center">
                    <select
                        name="format"
                        className="form-select"
                        style={{ maxWidth: 200 }}
                        value={data.format}
                        onChange={handleChange}
                    >
                        <option value="">선택</option>
                        {formatList.map(f => (
                            <option key={f} value={f}>{f}</option>
                        ))}
                    </select>
                    <input
                        name="value"
                        type="text"
                        className="form-control"
                        placeholder="문자열 입력"
                        style={{ maxWidth: 200 }}
                        value={data.value}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {/* 중복 제거 시간 (2줄 3칸씩) */}
            <label className="form-label d-flex mb-1 fw-bold justify-content-center">중복 제거 시간</label>
            <div className="mb-2 text-center">

                <div className="p-3 border rounded bg-light d-inline-block">
                    <div className="d-flex flex-row mb-2 justify-content-center gap-3">
                        {/* 1행: 년 월 일 */}
                        <div className="d-flex align-items-center gap-1">
                            <input
                                name="year"
                                type="number"
                                min="0"
                                className="form-control"
                                style={inputBoxStyle}
                                value={data.year}
                                onChange={handleChange}
                            />
                            <span style={labelStyle}>년</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <input
                                name="month"
                                type="number"
                                min="0"
                                className="form-control"
                                style={inputBoxStyle}
                                value={data.month}
                                onChange={handleChange}
                            />
                            <span style={labelStyle}>월</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <input
                                name="day"
                                type="number"
                                min="0"
                                className="form-control"
                                style={inputBoxStyle}
                                value={data.day}
                                onChange={handleChange}
                            />
                            <span style={labelStyle}>일</span>
                        </div>
                    </div>
                    <div className="d-flex flex-row justify-content-center gap-3">
                        {/* 2행: 시 분 초 */}
                        <div className="d-flex align-items-center gap-1">
                            <input
                                name="hour"
                                type="number"
                                min="0"
                                className="form-control"
                                style={inputBoxStyle}
                                value={data.hour}
                                onChange={handleChange}
                            />
                            <span style={labelStyle}>시</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <input
                                name="minute"
                                type="number"
                                min="0"
                                className="form-control"
                                style={inputBoxStyle}
                                value={data.minute}
                                onChange={handleChange}
                            />
                            <span style={labelStyle}>분</span>
                        </div>
                        <div className="d-flex align-items-center gap-1">
                            <input
                                name="second"
                                type="number"
                                min="0"
                                className="form-control"
                                style={inputBoxStyle}
                                value={data.second}
                                onChange={handleChange}
                            />
                            <span style={labelStyle}>초</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* 삭제 버튼 */}
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-outline-danger mt-3"
                    onClick={() => onRemove(index)}
                    type="button"
                    aria-label="삭제"
                >
                    X
                </button>
            </div>
        </div>
    );
};

export default DeduplicationRow;

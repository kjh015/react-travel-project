import React, { useEffect, useState } from 'react';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';

const DeduplicationRow = ({ processId, index, data, onChange, onRemove }) => {
    const [formatList, setFormatList] = useState([]);

    const getFormats = () => {
        DeduplicationApiClient.getFormatKeys(processId)
            .then(res => res.json()
                .then(data => {
                    setFormatList(data);
                })

            )
    }


    const handleChange = (e) => {
        const { name, value } = e.target;
        onChange(index, { ...data, [name]: value });
    };

    useEffect(() => {
        getFormats();
    }, []);





    const timeLabels = {
        year: '년',
        month: '월',
        day: '일',
        hour: '시',
        minute: '분',
        second: '초',
    };

    return (
        <div className="card p-3 mb-3 shadow-sm">
            <div className="row align-items-start g-3 d-flex" style={{ flexWrap: 'nowrap' }}>
                {/* 왼쪽: 드롭다운 + 문자열 입력 (유동) */}
                <div
                    className="col-md-7"
                    style={{ flex: '1 1 0%', minWidth: 0 }}
                >
                    <label className="form-label fw-bold">포맷</label>
                    <div className="d-flex gap-2">
                        <select
                            name="format"
                            className="form-select"
                            value={data.format}
                            onChange={handleChange}
                        >
                            <option value="">선택</option>
                            {formatList.map((f) => (
                                <option key={f} value={f}>
                                    {f}
                                </option>
                            ))}
                        </select>

                        <input
                            name="value"
                            type="text"
                            className="form-control"
                            placeholder="문자열 입력"
                            value={data.value}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* 오른쪽: 시간 설정 (고정 400px) */}
                <div
                    className="col-md-4"
                    style={{ width: 400, flex: '0 0 400px' }}
                >
                    <label className="form-label fw-bold">중복 제거 시간</label>
                    <div className="border rounded p-3 bg-light">
                        {/* 윗줄: 년/월/일 */}
                        <div className="d-flex gap-3 mb-2">
                            {['year', 'month', 'day'].map((unit) => (
                                <div key={unit} className="input-group" style={{ width: '110px' }}>
                                    <input
                                        name={unit}
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={data[unit]}
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text">{timeLabels[unit]}</span>
                                </div>
                            ))}
                        </div>
                        {/* 아랫줄: 시/분/초 */}
                        <div className="d-flex gap-3">
                            {['hour', 'minute', 'second'].map((unit) => (
                                <div key={unit} className="input-group" style={{ width: '110px' }}>
                                    <input
                                        name={unit}
                                        type="number"
                                        min="0"
                                        className="form-control"
                                        value={data[unit]}
                                        onChange={handleChange}
                                    />
                                    <span className="input-group-text">{timeLabels[unit]}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 삭제 버튼 (작게 고정) */}
                <div
                    className="col-md-1 text-end"
                    style={{ width: 50, flex: '0 0 50px' }}
                >
                    <button
                        className="btn btn-outline-danger mt-4"
                        onClick={() => onRemove(index)}
                    >
                        X
                    </button>
                </div>
            </div>
        </div>
    );

};

export default DeduplicationRow;

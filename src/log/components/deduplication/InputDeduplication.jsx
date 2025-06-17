import React, { useState } from 'react';
import DeduplicationRow from './DeduplicationRow';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';

const initialRow = {
    conditions: [{ format: '', value: '' }],
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
};

const InputDeduplication = ({ processId, onClose }) => {
    const [rows, setRows] = useState([initialRow]);
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' }); // 


    const handleChange = (index, updatedRow) => {
        const newRows = [...rows];
        newRows[index] = updatedRow;
        setRows(newRows);
    };

    const handleAddRow = () => {
        setRows([...rows, { ...initialRow }]);
    };

    const handleRemoveRow = (index) => {
        if (rows.length > 1) {
            const newRows = [...rows];
            newRows.splice(index, 1);
            setRows(newRows);
        }
    };

    const handleSubmit = () => {
        try {
            DeduplicationApiClient.addDeduplication({
                processId,
                name,
                active,
                rows
            }).then(res => res.text()
                .then(message => {
                    if (res.ok) {
                        setAlert({ show: true, message, type: "success" });
                        setTimeout(() => {
                            setAlert({ show: false, message: '', type: '' });
                            onClose();
                        }, 500);
                    } else {
                        setAlert({ show: true, message, type: "danger" });
                    }
                })
            )
        } catch (error) {
            setAlert({ show: true, message: '에러 발생', type: 'danger' });
        }
    };

    return (
        <div
            style={{
                background: '#fff',
                borderRadius: 12,
                padding: '28px 24px 24px 24px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.09)',
                maxWidth: 600,
                margin: '0 auto'
            }}
        >
            {/* Alert 메시지 */}
            {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" aria-label="Close"
                        onClick={() => setAlert({ ...alert, show: false })}></button>
                </div>
            )}

            {/* 타이틀과 닫기 */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                {/* 필요시 타이틀/닫기 버튼 추가 */}
            </div>

            {/* 이름 입력 */}
            <div className="mb-3">
                <label className="form-label fw-bold">중복 이름</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    autoFocus
                />
            </div>

            {/* 활성화 버튼 */}
            <div className="mb-3 d-flex justify-content-end">
                <button
                    className={`btn btn-sm ${active ? 'btn-success' : 'btn-outline-success'}`}
                    onClick={() => setActive(!active)}
                    type="button"
                >
                    활성화: {active ? "On" : "Off"}
                </button>
            </div>

            {/* 조건 목록 */}
            <div>
                {rows.map((row, idx) => (
                    <DeduplicationRow
                        key={idx}
                        processId={processId}
                        index={idx}
                        data={row}
                        onChange={handleChange}
                        onRemove={handleRemoveRow}
                    />
                ))}
            </div>

            {/* 하단 버튼 */}
            <div className="d-flex justify-content-between align-items-center mt-3">
                <button className="btn btn-success" onClick={handleAddRow}>
                    + 조건 추가
                </button>
                <button className="btn btn-primary" onClick={handleSubmit}>
                    추가
                </button>
            </div>
        </div>
    );
};

export default InputDeduplication;

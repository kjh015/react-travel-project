import React, { useState } from 'react';
import DeduplicationRow from './DeduplicationRow';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';

const initialRow = {
    format: '',
    value: '',
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
                processId: processId,
                name: name,
                active: active,
                rows: rows
            }).then(res => res.text()
                .then(message => {
                    alert(message);
                    onClose();
                })
            )
        } catch (error) {
            console.error(error);
            alert('에러 발생');
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4">중복 제거 설정</h3>
            <div className="mb-3">
                <label className="form-label">Deduplication Name</label>
                <input type="text" className="form-control"
                    value={name} onChange={e => setName(e.target.value)} />
            </div>
            <button className="btn btn-secondary me-2" onClick={() => setActive(!active)}>
                활성화: {active ? "On" : "Off"}
            </button>

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

            <div className="d-flex justify-content-between mt-3">
                <button className="btn btn-success" onClick={handleAddRow}>+ 조건 추가</button>
                <button className="btn btn-primary" onClick={handleSubmit}>전송</button>
            </div>
            <button className="btn btn-outline-dark" onClick={onClose}>닫기</button>
        </div>
    );
};

export default InputDeduplication;

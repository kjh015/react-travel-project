import React, { useEffect, useState } from 'react';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';
import DeduplicationRow from './DeduplicationRow';

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

const DetailDeduplication = ({ processId, id, onClose }) => {
    const [rows, setRows] = useState([]);
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);

    const viewDeduplication = () => {
        console.log("ID: " + id);
        DeduplicationApiClient.viewDeduplication(id)
            .then(res => res.json()
                .then(data => {
                    console.log(data);
                    if (res.ok) {
                        setRows(data.rows);
                        setName(data.name);
                        setActive(data.active);
                    }
                    else {
                        alert("view error");
                    }
                })
            )
    }

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
        console.log(rows);
        console.log("ID: " + id);
        try {
            DeduplicationApiClient.updateDeduplication({
                id: id,
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

    const handleRemove = () => {
        try {
            DeduplicationApiClient.removeDeduplication(id)
                .then(res => res.text()
                    .then(message => {
                        alert(message);
                        onClose();
                    }))
        } catch (error) {
            console.error(error);
            alert('에러 발생');
        }
    }

    useEffect(() => {
        viewDeduplication();
    }, []);


    return (
        <div className="container mt-5">
            <h3 className="mb-4">중복 제거 설정 수정</h3>
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
                <div className="d-flex justify-content-end">
                    <button className="btn btn-danger" onClick={handleRemove}>삭제</button>
                    <button className="btn btn-primary" onClick={handleSubmit}>전송</button>
                </div>

            </div>
        </div>
    );
};

export default DetailDeduplication;
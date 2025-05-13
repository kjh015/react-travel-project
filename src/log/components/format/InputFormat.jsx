import React, { useState } from 'react';
import FormatApiClient from '../../service/FormatApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const InputFormat = ({ onClose, processId }) => {
    const [entries, setEntries] = useState([{ key: '', value: '' }]);
    const [name, setName] = useState('');
    const [alertMessage, setAlertMessage] = useState(null); // ✅ 추가

    const handleEntryChange = (index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setEntries(newEntries);
    };

    const addEntry = () => {
        setEntries([...entries, { key: '', value: '' }]);
    };

    const removeEntry = (index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setEntries(newEntries);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formatObject = {};
        entries.forEach(entry => {
            if (entry.key)
                formatObject[entry.key] = entry.value;
        });
        const formatJson = JSON.stringify(formatObject);

        FormatApiClient.addFormat(processId, name, formatJson).then(
            res => {
                if (res.ok) {
                    console.log("포맷 추가 성공");
                    setAlertMessage({ type: 'success', text: '포맷 추가 성공!😈😈😈😈😈😈' }); // ✅ 성공 메시지
                    setTimeout(() => {
                        setAlertMessage(null);
                        onClose(); // 성공 시 닫기
                    }, 1500);
                } else {
                    console.log("포맷 추가 실패");
                    setAlertMessage({ type: 'danger', text: '포맷 추가 실패!🤯🔫' }); // ✅ 실패 메시지
                }
            }
        );
    };

    return (
        <div className="card mt-5 mx-auto" style={{ maxWidth: '600px', padding: '20px' }}>
            <h3 className="mb-4">Format 추가 화면</h3>

            {/* ✅ alert 표시 */}
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type}`} role="alert">
                    {alertMessage.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Format Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="format name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {entries.map((entry, index) => (
                    <div key={index} className="d-flex align-items-center mb-2">
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Key"
                            value={entry.key}
                            onChange={(e) => handleEntryChange(index, 'key', e.target.value)}
                        />
                        <input
                            type="text"
                            className="form-control me-2"
                            placeholder="Value"
                            value={entry.value}
                            onChange={(e) => handleEntryChange(index, 'value', e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => removeEntry(index)}
                        >
                            삭제
                        </button>
                    </div>
                ))}

                <div className="mb-3">
                    <button type="button" className="btn btn-success" onClick={addEntry}>+ 항목 추가</button>
                </div>

                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-outline-secondary">포맷 전송</button>
                    <button type="button" className="btn btn-danger" onClick={onClose}>화면 닫기</button>
                </div>
            </form>
        </div>
    );
};

export default InputFormat;

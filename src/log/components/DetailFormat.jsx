import React, { useEffect, useState } from 'react';
import FormatApiClient from '../service/FormatApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const DetailFormat = ({ onClose, formatId }) => {
    const [entries, setEntries] = useState([{ key: '', value: '' }]);
    const [name, setName] = useState('');

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

    const viewFormat = () => {
        FormatApiClient.viewFormat(formatId).then(res => {
            if (res.ok) {
                res.json().then(data => {
                    setEntries(Object.entries(JSON.parse(data.formatJson))
                        .map(([key, value]) => ({ key, value })));
                    setName(data.name);
                });
            } else {
                console.log("get 오류");
            }
        });
    };

    const removeFormat = () => {
        FormatApiClient.removeFormat(formatId).then(res => {
            if (res.ok) {
                console.log("remove success");
                onClose();
            } else {
                console.log("remove fail");
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formatObject = {};
        entries.forEach(entry => {
            if (entry.key) formatObject[entry.key] = entry.value;
        });
        const formatJson = JSON.stringify(formatObject);

        FormatApiClient.updateFormat(formatId, name, formatJson).then(res => {
            if (res.ok) {
                console.log("포맷 수정 성공");
                onClose();
            } else {
                console.log("포맷 수정 실패");
            }
        });
    };

    useEffect(() => {
        viewFormat();
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '600px', margin: '20px auto' }}>
            <h2>Format 상세 화면</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label style={{ fontWeight: 'bold' }}>Format Name</label><br />
                    <input
                        type="text"
                        placeholder="format name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px' }}
                    />
                </div>

                {entries.map((entry, index) => (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                        <input
                            type="text"
                            placeholder="Key"
                            value={entry.key}
                            onChange={(e) => handleEntryChange(index, 'key', e.target.value)}
                            style={{ flex: '1', marginRight: '5px', padding: '6px' }}
                        />
                        <input
                            type="text"
                            placeholder="Value"
                            value={entry.value}
                            onChange={(e) => handleEntryChange(index, 'value', e.target.value)}
                            style={{ flex: '2', marginRight: '5px', padding: '6px' }}
                        />
                        <button
                            type="button"
                            onClick={() => removeEntry(index)}
                            style={{ padding: '6px 10px' }}
                        >
                            ✕
                        </button>
                    </div>
                ))}

                <button type="button" onClick={addEntry} style={{ marginBottom: '15px' }}>
                    + 항목 추가
                </button><br />

                <button type="submit" style={{ marginRight: '10px' }}>수정</button>
                <button type="button" onClick={removeFormat} style={{ marginRight: '10px' }}>삭제</button>
                <button type="button" onClick={onClose}>✕</button>
            </form>
        </div>
    );
};

export default DetailFormat;

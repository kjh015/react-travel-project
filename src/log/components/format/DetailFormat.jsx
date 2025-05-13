import React, { useEffect, useState } from 'react';
import FormatApiClient from '../../service/FormatApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const DetailFormat = ({ onClose, formatId }) => {
    const [defaultEntry, setDefaultEntry] = useState([{ key: '', value: '' }]);
    const [formatEntry, setFormatEntry] = useState([{ key: '', value: '' }]);
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    
     const handleEntryChange = (setter, entries, index, field, value) => {
        const newEntries = [...entries];
        newEntries[index][field] = value;
        setter(newEntries);
    };

    const addEntry = (setter, entries) => {
        setter([...entries, { key: '', value: '' }]);
    };

    const removeEntry = (setter, entries, index) => {
        const newEntries = entries.filter((_, i) => i !== index);
        setter(newEntries);
    };

    const viewFormat = () => {
        FormatApiClient.viewFormat(formatId).then(
            res => {
                if (res.ok) {
                    res.json().then(data => {
                        setFormatEntry(Object.entries(JSON.parse(data.formatJson)).map(([key, value]) => ({ key, value })));
                        setDefaultEntry(Object.entries(JSON.parse(data.defaultJson)).map(([key, value]) => ({ key, value })));
                        setName(data.name);
                        setActive(data.active);
                    })
                }
                else {
                    console.log("get 오류");
                }
            }
        )
    }
    
    const removeFormat = () => {
        FormatApiClient.removeFormat(formatId).then(res => {
                if(res.ok){
                    console.log("remove success");
                    onClose();
                }
                else{
                    console.log("remove fail");
                }
            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // entries 배열 → { key: value } 형태로 변환
        const toObject = (entries) => {
            const obj = {};
            entries.forEach(entry => {
                if (entry.key) obj[entry.key] = entry.value;
            });
            return obj;
        };

        const formatJson = JSON.stringify(toObject(formatEntry));
        const defaultJson = JSON.stringify(toObject(defaultEntry));

        FormatApiClient.updateFormat(formatId, name, active, formatJson, defaultJson).then(
            res => {
                if (res.ok) {
                    console.log("포맷 추가 성공");
                    onClose();
                }
                else {
                    console.log("포맷 추가 실패");
                }
            }
        )
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

                <div>
                    <h4>Default Entry</h4>
                    {defaultEntry.map((entry, index) => (
                        <div key={`default-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Key"
                                value={entry.key}
                                onChange={e =>
                                    handleEntryChange(setDefaultEntry, defaultEntry, index, 'key', e.target.value)
                                }
                                style={{ flex: '1', marginRight: '5px', padding: '6px' }}
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={entry.value}
                                onChange={e =>
                                    handleEntryChange(setDefaultEntry, defaultEntry, index, 'value', e.target.value)
                                }
                                style={{ flex: '2', marginRight: '5px', padding: '6px' }}
                            />
                            <button type="button" onClick={() => removeEntry(setDefaultEntry, defaultEntry, index)}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addEntry(setDefaultEntry, defaultEntry)}>+ 항목 추가</button>
                </div>

                <div>
                    <h4>Format Entry</h4>
                    {formatEntry.map((entry, index) => (
                        <div key={`format-${index}`} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Key"
                                value={entry.key}
                                onChange={e =>
                                    handleEntryChange(setFormatEntry, formatEntry, index, 'key', e.target.value)
                                }
                                style={{ flex: '1', marginRight: '5px', padding: '6px' }}
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={entry.value}
                                onChange={e =>
                                    handleEntryChange(setFormatEntry, formatEntry, index, 'value', e.target.value)
                                }
                                style={{ flex: '2', marginRight: '5px', padding: '6px' }}
                            />
                            <button type="button" onClick={() => removeEntry(setFormatEntry, formatEntry, index)} style={{ padding: '6px 10px' }}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addEntry(setFormatEntry, formatEntry)} style={{ marginBottom: '15px' }}>+ 항목 추가</button>
                </div>

                <div style={{ marginTop: '10px' }}>
                    <button type="button" onClick={() => setActive(prev => !prev)}>
                        Active 상태 전환
                    </button>
                    <p>현재 Active 상태: <strong>{active ? "true" : "false"}</strong></p>
                </div>

                <button type="submit" style={{ marginRight: '10px' }}>수정</button>
            </form>

            <button onClick={removeFormat} style={{ marginRight: '10px' }}>삭제</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
};
export default DetailFormat;
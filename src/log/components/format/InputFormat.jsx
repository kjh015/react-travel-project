import React, { useState } from 'react';
import FormatApiClient from '../../service/FormatApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const InputFormat = ({ onClose, processId }) => {
    const [defaultEntry, setDefaultEntry] = useState([{ key: '', value: '' }]);
    const [formatEntry, setFormatEntry] = useState([{ key: '', value: '' }]);
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    
    const [alertMessage, setAlertMessage] = useState(null); // ✅ 추가

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        // entries 배열 → { key: value } 형태로 변환
        const toObject = (entries) => {
            const obj = {};
            entries.forEach(entry => {
                if (entry.key) {
                    obj[entry.key] = entry.value;
                }
            });
            return obj;
        };

        const formatJson = JSON.stringify(toObject(formatEntry));
        const defaultJson = JSON.stringify(toObject(defaultEntry));

        FormatApiClient.addFormat(processId, name, active, formatJson, defaultJson).then(
            res => {
                if (res.ok) {
                    console.log("포멧 추가 성공");
                    onClose();
                }
                else {
                    console.log("포멧 추가 실패");
                }
            }
        )
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
                <div>
                    <h4>Default Entry</h4>
                    {defaultEntry.map((entry, index) => (
                        <div key={`default-${index}`} className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                placeholder="Key"
                                className="form-control me-2"
                                value={entry.key}
                                onChange={(e) =>
                                    handleEntryChange(setDefaultEntry, defaultEntry, index, 'key', e.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                className="form-control me-2"
                                value={entry.value}
                                onChange={(e) =>
                                    handleEntryChange(setDefaultEntry, defaultEntry, index, 'value', e.target.value)
                                }
                            />
                            <button type="button" onClick={() => removeEntry(setDefaultEntry, defaultEntry, index)}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addEntry(setDefaultEntry, defaultEntry)}>+ 항목 추가</button>
                </div>

                <div>
                    <h4>Format Entry</h4>
                    {formatEntry.map((entry, index) => (
                        <div key={`format-${index}`} className="d-flex align-items-center mb-2">
                            <input
                                type="text"
                                placeholder="Key"
                                className="form-control me-2"
                                value={entry.key}
                                onChange={(e) =>
                                    handleEntryChange(setFormatEntry, formatEntry, index, 'key', e.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                className="form-control me-2"
                                value={entry.value}
                                onChange={(e) =>
                                    handleEntryChange(setFormatEntry, formatEntry, index, 'value', e.target.value)
                                }
                            />
                            <button type="button" className="btn btn-danger btn-sm" onClick={() => removeEntry(setFormatEntry, formatEntry, index)}>✕</button>
                        </div>
                    ))}
                    <div className="mb-3">
                    <button type="button" onClick={() => addEntry(setFormatEntry, formatEntry)}>+ 항목 추가</button>
                </div>
                    
                </div>           
                <div className="d-flex justify-content-between">
                    <button type="submit" className="btn btn-outline-secondary">포맷 전송</button>
                </div>               
            </form>
            <button onClick={() => setActive(prev => !prev)}>활성화: </button>{active ? "True" : "False"}
            <button onClick={onClose} className="btn btn-danger" >❌</button>
                
        </div>
    );
};
export default InputFormat;

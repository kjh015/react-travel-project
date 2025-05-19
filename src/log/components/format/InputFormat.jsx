import React, { useState } from 'react';
import FormatApiClient from '../../service/FormatApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const InputFormatModal = ({ onClose, processId }) => {
    const [defaultEntry, setDefaultEntry] = useState([{ key: '', value: '' }]);
    const [formatEntry, setFormatEntry] = useState([{ key: '', value: '' }]);
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState(null);

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
        const toObject = (entries) => {
            const obj = {};
            entries.forEach(entry => {
                if (entry.key) obj[entry.key] = entry.value;
            });
            return obj;
        };

        const formatJson = JSON.stringify(toObject(formatEntry));
        const defaultJson = JSON.stringify(toObject(defaultEntry));

        FormatApiClient.addFormat(processId, name, active, formatJson, defaultJson).then(
            res => {
                if (res.ok) {
                    setAlertMessage({ type: 'success', text: '포맷 추가 성공!' });
                    setTimeout(() => {
                        setAlertMessage(null);
                        onClose();
                    }, 1000);
                } else {
                    setAlertMessage({ type: 'danger', text: '포맷 추가 실패!' });
                }
            }
        );
    };

    return (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Format 추가 화면</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {alertMessage && (
                            <div className={`alert alert-${alertMessage.type}`} role="alert">
                                {alertMessage.text}
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Format Name</label>
                                <input type="text" className="form-control"
                                    value={name} onChange={e => setName(e.target.value)} />
                            </div>

                            <h5>Default Entry</h5>
                            {defaultEntry.map((entry, index) => (
                                <div key={`default-${index}`} className="d-flex mb-2">
                                    <input type="text" className="form-control me-2" placeholder="Key"
                                        value={entry.key}
                                        onChange={e => handleEntryChange(setDefaultEntry, defaultEntry, index, 'key', e.target.value)} />
                                    <input type="text" className="form-control me-2" placeholder="Value"
                                        value={entry.value}
                                        onChange={e => handleEntryChange(setDefaultEntry, defaultEntry, index, 'value', e.target.value)} />
                                    <button type="button" className="btn btn-danger btn-sm"
                                        onClick={() => removeEntry(setDefaultEntry, defaultEntry, index)}>✕</button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-success btn-sm mb-3"
                                onClick={() => addEntry(setDefaultEntry, defaultEntry)}>+ 추가</button>

                            <h5>Format Entry</h5>
                            {formatEntry.map((entry, index) => (
                                <div key={`format-${index}`} className="d-flex mb-2">
                                    <input type="text" className="form-control me-2" placeholder="Key"
                                        value={entry.key}
                                        onChange={e => handleEntryChange(setFormatEntry, formatEntry, index, 'key', e.target.value)} />
                                    ⬅
                                    <input type="text" className="form-control me-2" placeholder="Value"
                                        value={entry.value}
                                        onChange={e => handleEntryChange(setFormatEntry, formatEntry, index, 'value', e.target.value)} />
                                    <button type="button" className="btn btn-danger btn-sm"
                                        onClick={() => removeEntry(setFormatEntry, formatEntry, index)}>✕</button>
                                </div>
                            ))}
                            <button type="button" className="btn btn-success btn-sm mb-3"
                                onClick={() => addEntry(setFormatEntry, formatEntry)}>+ 추가</button>

                            <div className="d-flex justify-content-between mt-4">
                                <button type="button" className="btn btn-danger" onClick={onClose}>닫기</button>
                                <button type="submit" className="btn btn-primary">포맷 전송</button>
                                <button type="button" className={`btn ${active ? 'btn-success' : 'btn-secondary'}`}
                                    onClick={() => setActive(prev => !prev)}>
                                    활성화: {active ? "True" : "False"}
                                </button>

                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputFormatModal;

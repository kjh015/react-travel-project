import React, { act, useState } from 'react';
import FormatApiClient from '../../service/FormatApiClient';

const InputFormat = ({ onClose, processId }) => {
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
        <div>
            <h2>Format 추가 화면</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Format Name:</label>
                    <input
                        type="text"
                        placeholder="format name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                <div>
                    <h4>Default Entry</h4>
                    {defaultEntry.map((entry, index) => (
                        <div key={`default-${index}`}>
                            <input
                                type="text"
                                placeholder="Key"
                                value={entry.key}
                                onChange={(e) =>
                                    handleEntryChange(setDefaultEntry, defaultEntry, index, 'key', e.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Value"
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
                        <div key={`format-${index}`}>
                            <input
                                type="text"
                                placeholder="Key"
                                value={entry.key}
                                onChange={(e) =>
                                    handleEntryChange(setFormatEntry, formatEntry, index, 'key', e.target.value)
                                }
                            />
                            <input
                                type="text"
                                placeholder="Value"
                                value={entry.value}
                                onChange={(e) =>
                                    handleEntryChange(setFormatEntry, formatEntry, index, 'value', e.target.value)
                                }
                            />
                            <button type="button" onClick={() => removeEntry(setFormatEntry, formatEntry, index)}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={() => addEntry(setFormatEntry, formatEntry)}>+ 항목 추가</button>
                </div>                
                <button type="submit">포맷 전송</button>                
            </form>
            <button onClick={() => setActive(prev => !prev)}>활성화: </button>{active ? "True" : "False"}
            <button onClick={onClose}>❌</button>
        </div>
    );
};

export default InputFormat;
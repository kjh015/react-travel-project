import React, { useState } from 'react';
import FormatApiClient from '../service/FormatApiClient';

const InputFormat = ({ onClose, processId }) => {
    const [entries, setEntries] = useState([{ key: '', value: '' }]);
    const [name, setName] = useState('');

    const handleEntryChange = (index, field, value) => {    //index, 'key', e.target.value
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
        // entries 배열 → { key: value } 형태로 변환
        const formatObject = {};
        entries.forEach(entry => {
            if (entry.key)
                formatObject[entry.key] = entry.value;
        });
        const formatJson = JSON.stringify(formatObject); // 문자열화

        FormatApiClient.addFormat(processId, name, formatJson).then(
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
                    <label>추가할 Format</label><br />
                    Format Name: <input type="text" placeholder="format name" value={name} onChange={e => setName(e.target.value)}></input>
                    {entries.map((entry, index) => (
                        <div key={index} >
                            <input type="text" placeholder="Key" value={entry.key} onChange={(e) => handleEntryChange(index, 'key', e.target.value)} />
                            <input type="text" placeholder="Value" value={entry.value} onChange={(e) => handleEntryChange(index, 'value', e.target.value)} />
                            <button class="btn btn-danger" type="button" onClick={() => removeEntry(index)}>✕</button>
                        </div>
                    ))}
                    <button class="btn btn-primary" type="button" onClick={addEntry}> + 항목 추가</button>
                </div>
                <button class="btn btn-primary" type="submit">포맷 전송</button>
            </form>
            <button class="btn btn-light" onClick={onClose}>❌</button>

        </div>
    );
};

export default InputFormat;
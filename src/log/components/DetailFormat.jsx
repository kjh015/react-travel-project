import React, { useEffect, useState } from 'react';
import FormatApiClient from '../service/FormatApiClient';
import { useSearchParams } from 'react-router-dom';

const DetailFormat = ({ onClose, formatId }) => {
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

    const viewFormat = () => {
        FormatApiClient.viewFormat(formatId).then(
            res => {
                if (res.ok) {
                    res.json().then(data => {
                        setEntries(Object.entries(JSON.parse(data.formatJson)).map(([key, value]) => ({ key, value })));
                        setName(data.name);
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
        const formatObject = {};
        entries.forEach(entry => {
            if (entry.key)
                formatObject[entry.key] = entry.value;
        });
        const formatJson = JSON.stringify(formatObject); // 문자열화

        FormatApiClient.updateFormat(formatId, name, formatJson).then(
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
        <div>
            <h2>Format 상세 화면</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Format</label><br/>
                    Format Name: <input type="text" placeholder="format name" value={name} onChange={e => setName(e.target.value)}></input>
                    {entries.map((entry, index) => (
                        <div key={index} >
                            <input type="text" placeholder="Key" value={entry.key} onChange={(e) => handleEntryChange(index, 'key', e.target.value)} />
                            <input type="text" placeholder="Value" value={entry.value} onChange={(e) => handleEntryChange(index, 'value', e.target.value)} />
                            <button type="button" onClick={() => removeEntry(index)}>✕</button>
                        </div>
                    ))}
                    <button type="button" onClick={addEntry}> + 항목 추가</button>
                </div>
                <button type="submit">수정</button>
                               
            </form>
             
            <button onClick={removeFormat}>삭제</button>            
            <button onClick={onClose}>닫기</button>

        </div>
    );
};

export default DetailFormat;
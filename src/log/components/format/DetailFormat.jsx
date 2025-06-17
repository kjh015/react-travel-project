import React, { useEffect, useState } from 'react';
import FormatApiClient from '../../service/FormatApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const DetailFormat = ({ onClose, formatId }) => {
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
            if (res.ok) {
                setAlertMessage({ type: 'danger', text: '포맷 삭제 성공!' });
                setTimeout(() => {
                    setAlertMessage(null);
                    onClose();
                }, 500);
            }
            else {
                setAlertMessage({ type: 'danger', text: '포맷 삭제 실패' });
            }
        })
    }

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

        FormatApiClient.updateFormat(formatId, name, active, formatJson, defaultJson).then(
            res => {
                if (res.ok) {
                    setAlertMessage({ show: true, type: 'success', text: '포맷 추가 성공!' });   // ✅ 경고창 추가
                    setTimeout(() => {
                        setAlertMessage(null);
                        onClose();
                    }, 500);
                }
                else {
                    setAlertMessage({ show: true, type: 'danger', text: '포맷 추가 실패' });   // ✅ 경고창 추가
                }
            }
        )
    };

    useEffect(() => {
        viewFormat();
    }, []);

    return (
        <div style={{
            padding: '24px',
            borderRadius: '12px',
            maxWidth: '900px',
            margin: '30px auto',
            background: '#fff',
            boxShadow: '0 2px 10px #eee'
        }}>
            <h2 className="mb-4">포맷 상세 화면</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="fw-bold mb-2">포맷 이름</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="format name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>

                {/* 나란히 배치되는 부분 */}
                <div className="row">
                    {/* Default Entry (왼쪽) */}
                    <div className="col-md-6 mb-3">
                        <div className="border rounded p-3 h-100">
                            <h5 className="mb-3">기본 정보</h5>
                            {defaultEntry.map((entry, index) => (
                                <div key={`default-${index}`} className="d-flex align-items-center mb-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={entry.key}
                                        onChange={e =>
                                            handleEntryChange(setDefaultEntry, defaultEntry, index, 'key', e.target.value)
                                        }
                                        className="form-control me-2"
                                        style={{ flex: '1' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={entry.value}
                                        onChange={e =>
                                            handleEntryChange(setDefaultEntry, defaultEntry, index, 'value', e.target.value)
                                        }
                                        className="form-control me-2"
                                        style={{ flex: '2' }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeEntry(setDefaultEntry, defaultEntry, index)}
                                    >✕</button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addEntry(setDefaultEntry, defaultEntry)}
                                className="btn btn-outline-success mt-2"
                            >+ 항목 추가</button>
                        </div>
                    </div>

                    {/* Format Entry (오른쪽) */}
                    <div className="col-md-6 mb-3">
                        <div className="border rounded p-3 h-100">
                            <h5 className="mb-3">포맷 정보</h5>
                            {formatEntry.map((entry, index) => (
                                <div key={`format-${index}`} className="d-flex align-items-center mb-2">
                                    <input
                                        type="text"
                                        placeholder="Key"
                                        value={entry.key}
                                        onChange={e =>
                                            handleEntryChange(setFormatEntry, formatEntry, index, 'key', e.target.value)
                                        }
                                        className="form-control me-2"
                                        style={{ flex: '1' }}
                                    />
                                    <input
                                        type="text"
                                        placeholder="Value"
                                        value={entry.value}
                                        onChange={e =>
                                            handleEntryChange(setFormatEntry, formatEntry, index, 'value', e.target.value)
                                        }
                                        className="form-control me-2"
                                        style={{ flex: '2' }}
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeEntry(setFormatEntry, formatEntry, index)}
                                    >✕</button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={() => addEntry(setFormatEntry, formatEntry)}
                                className="btn btn-outline-success mt-2"
                            >+ 항목 추가</button>
                        </div>
                    </div>
                </div>

                {/* 버튼 및 상태 좌우 분할 정렬 */}
                <div className="mt-4 d-flex justify-content-between align-items-center">
                    {/* 왼쪽: 상태 및 토글 */}
                    <div className="d-flex align-items-center">

                        <button
                            className={`btn btn-sm ${active ? 'btn-success' : 'btn-outline-success'}`}
                            onClick={() => setActive(!active)}
                            type="button"
                        >
                            활성화: {active ? "On" : "Off"}
                        </button>
                    </div>
                    {/* 오른쪽: 수정/삭제/닫기 */}
                    <div>
                        <button type="submit" className="btn btn-primary me-2">수정</button>
                        <button type="button" onClick={removeFormat} className="btn btn-danger me-2">삭제</button>
                        <button type="button" onClick={onClose} className="btn btn-outline-secondary">닫기</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DetailFormat;

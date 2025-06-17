import React, { useState } from 'react';
import ProcessApiClient from '../../service/ProcessApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const InputProcess = ({ onClose }) => {
    const [name, setName] = useState("");
    const [alertMessage, setAlertMessage] = useState(null);

    const addProcess = () => {
        ProcessApiClient.addProcess(name).then(
            res => {
                if (res.ok) {
                    setAlertMessage({ show: true, type: 'success', text: '프로세스 추가 성공!' });
                    setTimeout(() => {
                        setAlertMessage(null);
                        onClose();
                    }, 500); // 성공 시 0.8초 후 닫기
                } else {
                    setAlertMessage({ show: true, type: 'danger', text: '프로세스 추가 실패' });
                    setTimeout(() => setAlertMessage(null), 500); // 실패 시 1.5초 후 Alert만 닫힘
                }
            }
        );
    };

    return (
        <div className="card mt-4 p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h4 className="mb-3">프로세스 이름</h4>

            {/* ✅ Alert 표시 영역 */}
            {alertMessage && alertMessage.show && (
                <div className={`alert alert-${alertMessage.type} mb-3 p-2`} role="alert">
                    {alertMessage.text}
                </div>
            )}

            <input
                type='text'
                className="form-control mb-3"
                placeholder="프로세스 이름 입력"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <div className="d-flex justify-content-between">
                <button
                    className="btn btn-primary"
                    onClick={addProcess}
                    disabled={!name.trim()} // 이름 없으면 비활성화(UX 개선)
                >
                    추가
                </button>
                <button className="btn btn-outline-secondary" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default InputProcess;

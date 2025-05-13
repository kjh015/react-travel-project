import React, { useState } from 'react';
import ProcessApiClient from '../../service/ProcessApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const EditProcess = ({ onClose, processId, _name }) => {
    const [name, setName] = useState(_name);
    const [alertMessage, setAlertMessage] = useState(null);   // ✅ 추가

    const updateProcess = () => {
        ProcessApiClient.updateProcess(processId, name).then(
            res => {
                if (res.ok) {
                    console.log("update success");
                    setAlertMessage({ type: 'success', text: '프로세스 수정 성공!' });   // ✅ 경고창 추가
                    setTimeout(() => {
                        setAlertMessage(null);
                        onClose();
                    }, 1500);
                } else {
                    console.log("update fail");
                    setAlertMessage({ type: 'danger', text: '프로세스 수정 실패!' });
                }
            }
        );
    };



    const removeProcess = () => {
        ProcessApiClient.removeProcess(processId).then(res => {
            if (res.ok) {
                console.log("remove success");
                onClose();
            } else {
                console.log("remove fail");
            }
        });
    };

    return (
        <div className="card mt-4 p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h4 className="mb-3">Process 수정</h4>

            {/* ✅ alert 표시 */}
            {alertMessage && (
                <div className={`alert alert-${alertMessage.type}`} role="alert">
                    {alertMessage.text}
                </div>
            )}

            <input
                type='text'
                className="form-control mb-3"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="프로세스 이름"
            />
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={updateProcess}>수정</button>
                <button className="btn btn-danger" onClick={removeProcess}>삭제</button>
                <button className="btn btn-secondary" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default EditProcess;

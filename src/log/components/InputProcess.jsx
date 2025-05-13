import React, { useState } from 'react';
import ProcessApiClient from '../service/ProcessApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const InputProcess = ({ onClose }) => {
    const [name, setName] = useState("");

    const addProcess = () => {
        ProcessApiClient.addProcess(name).then(
            res => {
                if (res.ok) {
                    console.log("add success");
                    onClose();
                } else {
                    console.log("add fail");
                }
            }
        );
    };

    return (
        <div className="card mt-4 p-4 mx-auto" style={{ maxWidth: '400px' }}>
            <h4 className="mb-3">Process 추가</h4>
            <input
                type='text'
                className="form-control mb-3"
                placeholder="프로세스 이름 입력"
                value={name}
                onChange={e => setName(e.target.value)}
            />
            <div className="d-flex justify-content-between">
                <button className="btn btn-primary" onClick={addProcess}>추가</button>
                <button className="btn btn-outline-secondary" onClick={onClose}>닫기</button>
            </div>
        </div>
    );
};

export default InputProcess;

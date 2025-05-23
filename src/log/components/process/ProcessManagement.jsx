import React, { useState, useEffect } from 'react';
import ProcessApiClient from '../../service/ProcessApiClient';
import InputProcess from './InputProcess';

import EditProcess from './EditProcess';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import AdmnMenu from '../../../board/component/page/AdmnMenu'; // 네비게이션 메뉴 import

const ProcessManagement = ({ setPID, onMenuClick }) => {
    const [processList, setProcessList] = useState([]);
    const [inputComp, setInputComp] = useState(false);
    const [selectedProcessId, setSelectedProcessId] = useState(null);
    const [editComp, setEditComp] = useState(0);

    const getProcesses = () => {
        ProcessApiClient.getProcessList().then(
            res => {
                if (res.ok) {
                    res.json().then(data => setProcessList(data));
                }
            }
        );
    };

    useEffect(() => {
        getProcesses();
    }, [inputComp, editComp]);

    const handleInputComp = () => {
        setInputComp(false);
        setSelectedProcessId(null);
    };
    const handleEditComp = () => setEditComp(0);

    return (
        <div className="container-fluid">
            <div className="row">
                {/* 오른쪽 본문 (Process 관리) */}
                <div className="col-md-9 col-lg-10">
                    <div style={{ marginTop: '80px' }}></div>
                    <h3 className="mb-4">Process 관리</h3>
                    <div className="list-group">
                        {processList.map(process => (
                            <div key={process.id}>
                                <div className="list-group-item d-flex justify-content-between align-items-center">
                                    {/* process.id를 클릭하면 InputProcess 오픈 */}
                                    <span
                                        className="text-decoration-underline"
                                        style={{ cursor: 'pointer', color: 'blue' }}
                                        onClick={() => {
                                            setPID(process.id);
                                            onMenuClick('format');
                                        }}
                                    >
                                        {process.id} : {process.name}
                                    </span>
                                    <button
                                        className="btn btn-outline-primary btn-sm"
                                        onClick={() => setEditComp(process.id)}
                                    >
                                        수정
                                    </button>
                                </div>
                                {editComp === process.id && (
                                    <EditProcess
                                        onClose={handleEditComp}
                                        processId={process.id}
                                        _name={process.name}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        {/* "프로세스 추가"는 기존 방식대로 */}
                        <button className="btn btn-success" onClick={() => setInputComp(true)}>프로세스 추가</button>
                    </div>

                    {/* processId를 클릭해서 inputComp가 true && processId가 있으면 InputProcess에 prop으로 넘김 */}
                    {inputComp && (
                        <InputProcess
                            onClose={handleInputComp}
                            processId={selectedProcessId}
                        />
                    )}
                    <p className="float-end mb-1">
                        <a type="button" href="/component/admnpage">관리자 페이지</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProcessManagement;

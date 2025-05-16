import React, { useState, useEffect } from 'react';
import ProcessApiClient from '../../service/ProcessApiClient';
import InputProcess from './InputProcess';
import EditProcess from './EditProcess';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ProcessManagement = () => {
    const [processList, setProcessList] = useState([]);
    const [inputComp, setInputComp] = useState(false);
    const [editComp, setEditComp] = useState(0);

    const getProcesses = () => {
        ProcessApiClient.getProcessList().then(
            res => {
                if (res.ok) {
                    res.json().then(data => {
                        setProcessList(data);
                        console.log("get success");
                    });
                } else {
                    console.log("response error");
                }
            }
        );
    };

    useEffect(() => {
        getProcesses();
    }, [inputComp, editComp]);

    const handleInputComp = () => setInputComp(false);
    const handleEditComp = () => setEditComp(0);

    return (
        <div className="container mt-5">
            <h3 className="mb-4">Process 관리</h3>
            <div className="list-group">
                {processList.map(process => (
                    <div key={process.id}>
                        <div className="list-group-item d-flex justify-content-between align-items-center">

                            <Link to={`/log/format?processId=${process.id}`} className="text-decoration-none">
                                {process.id} : {process.name}
                            </Link>
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
                <button className="btn btn-success" onClick={() => setInputComp(true)}>프로세스 추가</button>
            </div>

            {inputComp && <InputProcess onClose={handleInputComp} />}
        </div>
    );
};

export default ProcessManagement;

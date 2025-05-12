import React, { useState, useEffect } from 'react';
import ProcessApiClient from '../service/ProcessApiClient';
import InputProcess from './InputProcess';
import EditProcess from './EditProcess';
import { Link } from 'react-router-dom';

const ProcessManagement = () => {
    const [processList, setProcessList] = useState([]);
    const [inputComp, setInputComp] = useState(false);
    const [editComp, setEditComp] = useState(0);

    const getProcesses = () => {
        ProcessApiClient.getProcessList().then(
            res => {
                if (res.ok) {
                    res.json().then(
                        data => {
                            setProcessList(data);
                            console.log("get success");
                        }
                    );
                }
                else {
                    console.log("response error");
                }
            }
        )
    }
    useEffect(() => {
        getProcesses();
        
    }, [inputComp, editComp]);

    const handleInputComp = () => {
        setInputComp(false);
    };
    const handleEditComp = () => {
        setEditComp(0);
    };

    return (
        <div>
            <div>
                {processList.map(process => (
                    <div key={process.id}>
                        <Link to={`/log/format?processId=${process.id}`}>{process.id} : {process.name}</Link>
                        <button onClick={() => setEditComp(process.id)}>수정</button>
                        {editComp == process.id && <EditProcess onClose={handleEditComp} processId={process.id} _name={process.name}/>}
                    </div>
                ))}
            </div>
            <button onClick={() => setInputComp(true)}>프로세스 추가</button>
            {inputComp && <InputProcess onClose={handleInputComp}/>}


        </div>
    );
};

export default ProcessManagement;
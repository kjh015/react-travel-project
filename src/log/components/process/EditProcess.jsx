import React, { useState } from 'react';
import ProcessApiClient from '../../service/ProcessApiClient';

const EditProcess = ({ onClose, processId, _name }) => {
    const [name, setName] = useState(_name);
    
    const updateProcess = () => {
        ProcessApiClient.updateProcess(processId, name).then(
            res => {
                if(res.ok){
                    console.log("update success");
                    onClose();
                }
                else{
                    console.log("update fail");
                }
            }
        )
    }
    const removeProcess = () => {
        ProcessApiClient.removeProcess(processId).then(res => {
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

    return (
        <div>
            <input type='text' value={name} onChange={e => setName(e.target.value)}></input>
            <button onClick={updateProcess}>수정</button>
            <button onClick={removeProcess}>삭제</button>
            <button onClick={onClose}>닫기</button>
        </div>
    );
};

export default EditProcess;
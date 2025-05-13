import React, { useState } from 'react';
import ProcessApiClient from '../../service/ProcessApiClient';

const InputProcess = ({ onClose }) => {
    const [name, setName] = useState("");
    
    const addProcess = () => {
        ProcessApiClient.addProcess(name).then(
            res => {
                if(res.ok){
                    console.log("add success");
                    onClose();
                }
                else{
                    console.log("add fail");
                }
            }
        )
    }

    return (
        <div>
            <input type='text' value={name} onChange={e => setName(e.target.value)}></input>
            <button onClick={addProcess}>추가</button>
            <button onClick={onClose}>❌</button>
        </div>
    );
};

export default InputProcess;
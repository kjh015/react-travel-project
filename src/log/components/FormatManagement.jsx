import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FormatApiClient from '../service/FormatApiClient';
import InputFormat from './InputFormat';
import DetailFormat from './DetailFormat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const FormatManagement = () => {
    const [params] = useSearchParams();
    const [processId, setProcessId] = useState(params.get('processId'));
    const [formatList, setFormatList] = useState([]);
    const [inputComp, setInputComp] = useState(false);
    const [detailComp, setDetailComp] = useState(0);


    const getFormats = () => {
        FormatApiClient.getFormatList(processId).then(
            res => {
                if (res.ok) {
                    res.json().then(
                        data => {
                            setFormatList(data);
                            console.log("get success - format");
                        }
                    );
                }
                else {
                    console.log("response error - format");
                }
            }
        )
    }
    useEffect(() => {
        getFormats();
    }, [inputComp, detailComp]);

    const handleInputComp = () => {
        setInputComp(false);
    };
    const handleDetailComp = () => {
        setDetailComp(0);
    };

    return (
        <div>
            <div>
                {formatList.map(format => (
                    <div key={format.id}>
                        <span className="text-primary text-decoration-underline" role="button" onClick={() => setDetailComp(format.id)}>{format.id} : {format.name}</span>
                        {detailComp == format.id && <DetailFormat onClose={handleDetailComp} formatId={format.id} />}
                    </div>
                ))}
            </div>
            <button class="btn btn-primary" onClick={() => setInputComp(true)}>포맷 추가</button>
            {inputComp && <InputFormat onClose={handleInputComp} processId={processId} />}


        </div>
    );
};

export default FormatManagement;
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FormatApiClient from '../../service/FormatApiClient';
import InputFormat from './InputFormat';
import DetailFormat from './DetailFormat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Footers from '../../../common/Footers';
import ManageNav from './ManageNav';

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
                    res.json().then(data => setFormatList(data));
                }
            }
        );
    };

    useEffect(() => {
        getFormats();
        console.log(formatList);

    }, [inputComp, detailComp]);

    const handleInputComp = () => setInputComp(false);
    const handleDetailComp = () => setDetailComp(0);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {/* Header */}
            <ManageNav />

            {/* Main content */}
            <div style={{ flex: 1, marginTop: '70px', padding: '20px' }}>
                {formatList.map(format => (
                    <div key={format.id}>
                        <span
                            className="text-primary text-decoration-underline"
                            role="button"
                            onClick={() => setDetailComp(format.id)}
                        >
                            {format.id} : {format.name} / 활성화: {format.active ? "On" : "Off"}
                        </span>
                        {detailComp === format.id && (
                            <DetailFormat onClose={handleDetailComp} formatId={format.id} />
                        )}
                    </div>
                ))}

                <button className="btn btn-primary mt-3" onClick={() => setInputComp(true)}>
                    포맷 추가
                </button>

                {inputComp && (
                    <div style={{ float: 'left', width: '300px', marginTop: '20px' }}>
                        <InputFormat onClose={handleInputComp} processId={processId} />
                    </div>
                )}
                <Link to={`/log/filter?processId=${processId}`} className="btn btn-secondary mt-3">
                    필터링 관리
                </Link>
            </div>

            {/* ⭐ Footer 항상 페이지 맨 아래 ⭐ */}
            <Footers />
        </div>
    );
};

export default FormatManagement;

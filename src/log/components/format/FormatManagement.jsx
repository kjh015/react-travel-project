import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FormatApiClient from '../../service/FormatApiClient';
import InputFormat from './InputFormat';
import DetailFormat from './DetailFormat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const FormatManagement = ({ processId, onMenuClick }) => {
    const [formatList, setFormatList] = useState([]);
    const [inputComp, setInputComp] = useState(false);
    const [detailComp, setDetailComp] = useState(0);

    const getFormats = () => {
        FormatApiClient.getFormatList(processId).then(res => {
            if (res.ok) {
                res.json().then(data => setFormatList(data));
            }
        });
    };

    useEffect(() => {
        getFormats();
    }, [inputComp, detailComp]);

    const handleInputComp = () => setInputComp(false);
    const handleDetailComp = () => setDetailComp(0);

    const formatDate = (isoString) => {
        if (!isoString) return "";
        return isoString.substring(0, 16).replace("T", " ");
    };

    return (
        <div>
            {/* 인라인 스타일(또는 App.css에 추가해도 됨) */}
            <style>{`
                .format-name-hover {
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: none;
                    transition: text-decoration 0.13s;
                }
                .format-name-hover:hover {
                    text-decoration: underline;
                }
            `}</style>

            <div className="container" style={{ marginTop: '80px' }}>
                <h4 className="mb-4 fw-bold">포맷 목록</h4>

                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary me-2" onClick={() => setInputComp(true)}>포맷 추가</button>
                    <button className="btn btn-secondary" onClick={() => onMenuClick('filter')}>필터링 관리 ➡</button>
                </div>

                <table className="table table-bordered text-center align-middle">
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '10%' }}>ID</th>
                            <th className="text-start" style={{ width: '25%' }}>이름</th>
                            <th>생성 날짜</th>
                            <th>수정 날짜</th>
                            <th style={{ width: '10%' }}>활성화</th>
                        </tr>
                    </thead>
                    <tbody>
                        {formatList.map(format => (
                            <React.Fragment key={format.id}>
                                <tr>
                                    <td>{format.id}</td>
                                    <td className="text-start">
                                        <span
                                            className="format-name-hover"
                                            role="button"
                                            onClick={() => setDetailComp(detailComp === format.id ? 0 : format.id)}
                                        >
                                            {format.name}
                                        </span>
                                    </td>
                                    <td>{format.createdTime && formatDate(format.createdTime)}</td>
                                    <td>{format.updatedTime && formatDate(format.updatedTime)}</td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${format.active ? 'btn-primary' : 'btn-outline-primary'}`}
                                        >
                                            {format.active ? 'ON' : 'OFF'}
                                        </button>
                                    </td>
                                </tr>
                                {detailComp === format.id && (
                                    <tr>
                                        <td colSpan="5" className="text-center bg-light">
                                            <DetailFormat onClose={handleDetailComp} formatId={format.id} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {inputComp && (
                    <div className="mt-4">
                        <InputFormat onClose={handleInputComp} processId={processId} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FormatManagement;

import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FormatApiClient from '../../service/FormatApiClient';
import InputFormat from './InputFormat';
import DetailFormat from './DetailFormat';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../../../common/Navbar';

const FormatManagement = () => {
    const [params] = useSearchParams();
    const [processId, setProcessId] = useState(params.get('processId'));
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

    const handleActivate = (id) => {
        // 로컬 상태에서 직접 토글 (즉시 UI 반영)
        const updatedList = formatList.map(format =>
            format.id === id ? { ...format, active: !format.active } : format
        );
        setFormatList(updatedList);

        // 서버에 반영하려면 여기에 API 호출 추가 가능
        // FormatApiClient.toggleActive(id).then(() => getFormats());
    };

    const formatDate = (datetime) => {
        const date = new Date(datetime);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',

            hour12: false,
        }).replace(/\./g, '-').replace(' ', ' ').trim();
    };

    return (
        <div>
            <Navbar />

            <div className="container" style={{ marginTop: '80px' }}>
                <h4 className="mb-4 fw-bold">포맷 목록</h4>

                {/* 상단 우측 버튼 영역 */}
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary me-2" onClick={() => setInputComp(true)}>포맷 추가</button>
                    <Link to={`/log/filter?processId=${processId}`} className="btn btn-secondary" >필터링 관리</Link>
                </div>

                {/* 포맷 테이블 */}
                <table className="table table-bordered text-center align-middle">
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '10%' }}>ID</th>
                            <th style={{ width: '25%' }}>이름</th>
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
                                    <td>
                                        <span
                                            className="px-2 py-1 bg-light text-primary rounded-pill d-inline-block fw-semibold"
                                            role="button"
                                            style={{ cursor: 'pointer', transition: '0.2s' }}
                                            onClick={() => setDetailComp(format.id)}
                                        >
                                            {format.name}
                                        </span>
                                    </td>
                                    <td>{format.createdTime && formatDate(format.createdTime)}</td>
                                    <td>{format.updatedTime && formatDate(format.updatedTime)}</td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${format.active ? 'btn-success' : 'btn-outline-success'}`}

                                        >
                                            {format.active ? 'ON' : 'OFF'}
                                        </button>
                                    </td>
                                </tr>

                                {detailComp === format.id && (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            <DetailFormat onClose={handleDetailComp} formatId={format.id} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                {/* 포맷 추가 입력 폼 */}
                {inputComp && (
                    <div className="mt-4">
                        <InputFormat onClose={handleInputComp} processId={processId} />
                    </div>
                )}
            </div>

            {/* 푸터: 관리자 페이지 링크 */}
            <footer className="text-center mt-auto mb-3">
                <Link to="/component/admnpage" className="text-decoration-none">관리자 페이지</Link>
            </footer>
        </div>
    );
};

export default FormatManagement;

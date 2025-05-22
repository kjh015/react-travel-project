import React, { useEffect, useState } from 'react';
import FilterApiClient from '../../service/FilterApiClient';
import DetailFilter from './DetailFilter';
import { useSearchParams, Link } from 'react-router-dom';
import ConditionBuilder from './ConditionBuilder';
import Navbar from '../../../common/Navbar';

const FilterManagement = () => {
    const [params] = useSearchParams();
    const [processId, setProcessId] = useState(params.get('processId'));
    const [filterList, setFilterList] = useState([]);
    const [detailComp, setDetailComp] = useState(0);
    const [builderComp, setBuilderComp] = useState(false);

    const getFilters = () => {
        FilterApiClient.getFilterList(processId).then(res => {
            if (res.ok) {
                res.json().then(data => setFilterList(data));
            }
        });
    };

    useEffect(() => {
        getFilters();
    }, [detailComp, builderComp]);

    const handleDetailComp = () => {
        setDetailComp(0);
        getFilters(); // Detail 닫을 때 리스트 새로고침
    };

    const handleBuilderComp = () => setBuilderComp(false);

    const handleActivate = (id) => {
        const updatedList = filterList.map(filter =>
            filter.id === id ? { ...filter, active: !filter.active } : filter
        );
        setFilterList(updatedList);

        // API 호출 예시
        // FilterApiClient.toggleActive(id).then(() => getFilters());
    };

    const filterDate = (datetime, mode = 'full') => {
        const date = new Date(datetime);
        if (mode === 'date') {
            return date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).replace(/\./g, '-');
        }
        if (mode === 'time') {
            return date.toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        }
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }).replace(/\./g, '-').replace(' ', ' ').trim();
    };


    return (
        <div>
            <Navbar />
            <div className="d-flex justify-content-center" style={{ marginTop: '120px' }}>
                <div className="w-100" style={{ maxWidth: '1200px' }}>
                    {/* 제목 */}
                    <h4 className="mb-4 fw-bold text-center">필터링 목록</h4>

                    {/* 버튼 영역 */}
                    <div className="d-flex justify-content-end mb-3">
                        <button className="btn btn-primary me-2" onClick={() => setBuilderComp(true)}>
                            필터 추가
                        </button>
                        <Link to={`/log/format?processId=${processId}`} className="btn btn-secondary">
                            포맷 관리
                        </Link>
                    </div>
                    <table className="table table-bordered text-center align-middle">
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '5%' }}>ID</th>
                                <th style={{ width: '20%' }}>이름</th>
                                <th style={{ width: '20%' }}>생성 날짜</th>
                                <th style={{ width: '20%' }}>수정 날짜</th>
                                <th style={{ width: '10%' }}>활성화</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filterList.map(filter => (
                                <React.Fragment key={filter.id}>
                                    <tr>
                                        <td>{filter.id}</td>
                                        <td>
                                            <span
                                                className="px-2 py-1 bg-light text-primary rounded-pill d-inline-block fw-semibold"
                                                role="button"
                                                style={{ cursor: 'pointer', transition: '0.2s' }}
                                                onClick={() => setDetailComp(filter.id)}
                                            >
                                                {filter.name}
                                            </span>
                                        </td>
                                        <td>
                                            <div>{filterDate(filter.createdTime, 'date')}</div>
                                            <div className="text-muted small">{filterDate(filter.createdTime, 'time')}</div>
                                        </td>
                                        <td>
                                            <div>{filterDate(filter.updatedTime, 'date')}</div>
                                            <div className="text-muted small">{filterDate(filter.updatedTime, 'time')}</div>
                                        </td>
                                        <td>
                                            <button
                                                className={`btn btn-sm ${filter.active ? 'btn-success' : 'btn-outline-success'}`}

                                            >
                                                {filter.active ? 'ON' : 'OFF'}
                                            </button>
                                        </td>
                                    </tr>

                                    {detailComp === filter.id && (
                                        <tr>
                                            <td colSpan="6" className="text-center bg-light">
                                                <DetailFilter
                                                    onClose={handleDetailComp}
                                                    filterId={filter.id}
                                                    processId={processId}
                                                />
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ✅ 모달로 ConditionBuilder 표시 */}
            {builderComp && (
                <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">필터 추가</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleBuilderComp}></button>
                            </div>
                            <div className="modal-body">
                                <ConditionBuilder onClose={handleBuilderComp} processId={processId} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterManagement;

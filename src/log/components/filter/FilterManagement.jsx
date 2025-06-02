import React, { useEffect, useState } from 'react';
import FilterApiClient from '../../service/FilterApiClient';
import DetailFilter from './DetailFilter';
import ConditionBuilder from './ConditionBuilder';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const FilterManagement = ({ processId, onMenuClick }) => {
    const [filterList, setFilterList] = useState([]);
    const [detailComp, setDetailComp] = useState(0);
    const [builderComp, setBuilderComp] = useState(false);

    // 필터 리스트 불러오기
    const getFilters = () => {
        FilterApiClient.getFilterList(processId).then(res => {
            if (res.ok) {
                res.json().then(data => setFilterList(data));
            }
        });
    };

    useEffect(() => {
        getFilters();
        // eslint-disable-next-line
    }, [processId]);

    // 디테일 닫기
    const handleDetailClose = (refresh = false) => {
        setDetailComp(0);
        if (refresh) getFilters();
    };

    // ConditionBuilder 닫기
    const handleBuilderClose = (refresh = false) => {
        setBuilderComp(false);
        if (refresh) getFilters();
    };

    // 활성화 토글 (실제 API 연동 필요)
    const handleActivate = (id) => {
        FilterApiClient.toggleActive(id).then(() => getFilters());
    };

    // 날짜 포맷
    const filterDate = (isoString) => {
        if (!isoString) return "-";
        return isoString.substring(0, 16).replace("T", " ");
    };

    return (
        <div>
            <div className="container" style={{ marginTop: '80px' }}>
                <h4 className="mb-4 fw-bold">필터링 목록</h4>
                <div className="d-flex justify-content-end mb-3">
                    <button className="btn btn-primary me-2" onClick={() => setBuilderComp(true)}>
                        필터 추가
                    </button>
                    <button className="btn btn-secondary me-2" onClick={() => onMenuClick('format')}>
                        ⬅ 포맷 관리
                    </button>
                    <button className="btn btn-secondary" onClick={() => onMenuClick('deduplication')}>
                        중복제거 관리 ➡
                    </button>
                </div>

                <table className="table table-bordered text-center align-middle">
                    <thead className="table-light">
                        <tr>
                            <th style={{ width: '10%' }}>ID</th>
                            <th style={{ width: '30%' }}>이름</th>
                            <th>생성 날짜</th>
                            <th>수정 날짜</th>
                            <th style={{ width: '10%' }}>활성화</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterList.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-muted">필터가 없습니다.</td>
                            </tr>
                        ) : filterList.map(filter => (
                            <React.Fragment key={filter.id}>
                                <tr>
                                    <td>{filter.id}</td>
                                    <td>
                                        <span
                                            className="px-2 py-1 bg-light text-primary rounded-pill d-inline-block fw-semibold"
                                            role="button"
                                            style={{ cursor: 'pointer', transition: '0.2s' }}
                                            onClick={() => setDetailComp(detailComp === filter.id ? 0 : filter.id)}
                                            title={filter.name}
                                        >
                                            {filter.name}
                                        </span>
                                    </td>
                                    <td>{filterDate(filter.createdTime)}</td>
                                    <td>{filterDate(filter.updatedTime)}</td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${filter.active ? 'btn-success' : 'btn-outline-success'}`}
                                            onClick={() => handleActivate(filter.id)}
                                        >
                                            {filter.active ? 'ON' : 'OFF'}
                                        </button>
                                    </td>
                                </tr>
                                {detailComp === filter.id && (
                                    <tr>
                                        <td colSpan="5" className="text-center bg-light">
                                            <DetailFilter
                                                onClose={handleDetailClose}
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

            {/* 모달로 ConditionBuilder 표시 */}
            {builderComp && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">필터 추가</h5>
                                <button type="button" className="btn-close" aria-label="Close"
                                    onClick={() => handleBuilderClose(false)}></button>
                            </div>
                            <div className="modal-body">
                                <ConditionBuilder onClose={handleBuilderClose} processId={processId} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterManagement;

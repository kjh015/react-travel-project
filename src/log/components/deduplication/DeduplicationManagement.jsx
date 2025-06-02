import React, { useEffect, useState } from 'react';
import InputDeduplication from './InputDeduplication';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';
import DetailDeduplication from './DetailDeduplication';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeduplicationManagement = ({ processId, onMenuClick }) => {
  const [ddpList, setDdpList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showDetail, setShowDetail] = useState(0);

  const getDeduplicationList = () => {
    DeduplicationApiClient.getDeduplicationList(processId)
      .then(res => res.json().then(data => {
        if (res.ok) setDdpList(data);
        else alert(data);
      }));
  };

  // 입력창/상세창 닫기 콜백
  const handleInputClose = (refresh = false) => {
    setShowInput(false);
    if (refresh) getDeduplicationList();
  };
  const handleDetailClose = (refresh = false) => {
    setShowDetail(0);
    if (refresh) getDeduplicationList();
  };

  // 활성화 토글
  const handleToggleActive = (id, current) => {
    DeduplicationApiClient.updateActive(id, !current)
      .then(res => {
        if (res.ok) getDeduplicationList();
        else alert('활성화 변경 실패');
      });
  };

  // 날짜 포맷
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    return isoString.substring(0, 16).replace("T", " ");
  };

  useEffect(() => {
    getDeduplicationList();
    // eslint-disable-next-line
  }, [processId]);

  return (
    <div>
      <div className="container" style={{ marginTop: '80px' }}>
        <h4 className="mb-4 fw-bold">중복 제거 목록</h4>

        {/* 상단 버튼 영역 */}
        <div className="d-flex justify-content-end mb-3">
          <button className="btn btn-primary me-2" onClick={() => setShowInput(true)}>
            중복 제거 추가
          </button>
          <button className="btn btn-secondary" onClick={() => onMenuClick('filter')}>
            ⬅ 필터 관리
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
            {ddpList.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-muted">중복 제거 설정이 없습니다.</td>
              </tr>
            ) : (
              ddpList.map(ddp => (
                <React.Fragment key={ddp.id}>
                  <tr>
                    <td>{ddp.id}</td>
                    <td>
                      <span
                        className="px-2 py-1 bg-light text-primary rounded-pill d-inline-block fw-semibold"
                        role="button"
                        style={{ cursor: 'pointer', transition: '0.2s' }}
                        onClick={() => setShowDetail(showDetail === ddp.id ? 0 : ddp.id)}
                        title={ddp.name}
                      >
                        {ddp.name}
                      </span>
                    </td>
                    <td>{formatDate(ddp.createdTime)}</td>
                    <td>{formatDate(ddp.updatedTime)}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${ddp.active ? "btn-success" : "btn-outline-secondary"}`}
                        onClick={() => handleToggleActive(ddp.id, ddp.active)}
                      >
                        {ddp.active ? "ON" : "OFF"}
                      </button>
                    </td>
                  </tr>
                  {showDetail === ddp.id && (
                    <tr>
                      <td colSpan="5" className="text-center bg-light">
                        <DetailDeduplication
                          processId={processId}
                          id={ddp.id}
                          onClose={handleDetailClose}
                        />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            )}
          </tbody>
        </table>

        {/* 추가 입력 모달 */}
        {showInput && (
          <div
            className="modal show d-block"
            tabIndex="-1"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          >
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">중복 제거 추가</h5>
                  <button type="button" className="btn-close" aria-label="Close"
                    onClick={() => handleInputClose(false)}></button>
                </div>
                <div className="modal-body">
                  <InputDeduplication processId={processId} onClose={handleInputClose} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeduplicationManagement;

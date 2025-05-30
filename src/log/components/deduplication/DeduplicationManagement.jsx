import React, { useEffect, useState } from 'react';
import InputDeduplication from './InputDeduplication';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';
import DetailDeduplication from './DetailDeduplication';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeduplicationManagement = ({ processId, onMenuClick }) => {
  const [ddpList, setDdpList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showDetail, setShowDetail] = useState(0);

  // 활성화 상태 토글
  const handleToggleActive = (id, current) => {
    DeduplicationApiClient.updateActive(id, !current)
      .then(res => {
        if (res.ok) {
          getDeduplicationList();
        } else {
          alert('활성화 변경 실패');
        }
      });
  };

  // 리스트 불러오기
  const getDeduplicationList = () => {
    DeduplicationApiClient.getDeduplicationList(processId)
      .then(res => {
        res.json().then(data => {
          if (res.ok) {
            setDdpList(data);
          } else {
            alert(data);
          }
        });
      });
  };

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.substring(0, 16).replace("T", " ");
  };

  useEffect(() => {
    getDeduplicationList();
    // eslint-disable-next-line
  }, [showInput, showDetail]);

  return (
    <div className="container" style={{ marginTop: '80px', maxWidth: '900px' }}>
      {/* 제목 */}
      <div className="row mb-4">
        <div className="col">
          <h4 className="fw-bold">중복 제거 관리</h4>
        </div>
        <div className="col-auto">
          <button className="btn btn-primary" onClick={() => setShowInput(true)}>
            설정 추가
          </button>
        </div>
      </div>
      {/* 카드와 테이블 */}
      <div className="card p-4 shadow-sm">
        <table className="table table-bordered text-center align-middle mb-0">
          <thead className="table-light">
            <tr>
              <th style={{ width: '25%' }}>이름</th>
              <th style={{ width: '25%' }}>생성 날짜</th>
              <th style={{ width: '25%' }}>수정 날짜</th>
              <th style={{ width: '10%' }}>활성화</th>
            </tr>
          </thead>
          <tbody>
            {ddpList.map(ddp => (
              <React.Fragment key={ddp.id}>
                <tr>
                  <td>
                    <span
                      role="button"
                      style={{ color: '#2a85ff', cursor: 'pointer', fontWeight: 500 }}
                      onClick={() => setShowDetail(showDetail === ddp.id ? 0 : ddp.id)}
                    >
                      {ddp.name}
                    </span>
                  </td>
                  <td>{ddp.createdTime && formatDate(ddp.createdTime)}</td>
                  <td>{ddp.updatedTime && formatDate(ddp.updatedTime)}</td>
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
                    <td colSpan="4" style={{ background: "#f9fafd" }}>
                      <DetailDeduplication
                        processId={processId}
                        id={ddp.id}
                        onClose={() => setShowDetail(0)}
                      />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {/* 모달창 */}
      {showInput && (
        <div
          className="modal fade show"
          style={{
            display: 'block',
            background: 'rgba(0,0,0,0.35)',
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100vh',
            zIndex: 9999
          }}
          tabIndex="-1"
        >
          <div className="modal-dialog modal-lg" style={{ margin: '100px auto', maxWidth: 700 }}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">중복 제거 설정</h5>
                <button type="button" className="btn-close" aria-label="Close"
                  onClick={() => setShowInput(false)}></button>
              </div>
              <div className="modal-body">
                <InputDeduplication processId={processId} onClose={() => setShowInput(false)} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeduplicationManagement;

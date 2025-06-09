import React, { useState, useEffect } from 'react';
import ProcessApiClient from '../../service/ProcessApiClient';
import InputProcess from './InputProcess';
import EditProcess from './EditProcess';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const ProcessManagement = ({ setPID, onMenuClick }) => {
    const [processList, setProcessList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProcessId, setSelectedProcessId] = useState(null);
    const [editComp, setEditComp] = useState(0);

    const getProcesses = () => {
        ProcessApiClient.getProcessList().then(res => {
            if (res.ok) {
                res.json().then(data => setProcessList(data));
            }
        });
    };

    useEffect(() => {
        getProcesses();
    }, [showModal, editComp]);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProcessId(null);
    };
    const handleEditComp = () => setEditComp(0);
    const processDate = (isoString) => {
        if (!isoString) return "";
        return isoString.substring(0, 16).replace("T", " ");
    };

    return (
        <div
            className="container"
            style={{
                marginTop: '80px',
                maxWidth: '980px'
            }}
        >
            {/* 인라인 CSS, 혹은 App.css에 넣어도 OK */}
            <style>{`
                .process-name-hover {
                    font-weight: bold;
                    cursor: pointer;
                    text-decoration: none;
                    transition: text-decoration 0.1s;
                }
                .process-name-hover:hover {
                    text-decoration: underline;
                }
            `}</style>

            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="fw-bold mb-0" style={{ letterSpacing: '1px' }}>
                    <span style={{ color: "#34a853" }}>●</span> Process 관리
                </h3>
            </div>
            <div className="card shadow-sm rounded-4 mb-4">
                <div className="card-body p-4">
                    <table className="table table-hover table-bordered align-middle text-center mb-0" style={{ borderRadius: "1.2rem", overflow: "hidden" }}>
                        <thead className="table-light">
                            <tr>
                                <th style={{ width: '15%' }}>ID</th>
                                <th className="text-start">이름</th>
                                <th>생성 날짜</th>
                                <th>수정 날짜</th>
                                <th style={{ width: '15%' }}>수정</th>
                            </tr>
                        </thead>
                        <tbody>
                            {processList.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="py-5 text-muted">프로세스가 없습니다.</td>
                                </tr>
                            )}
                            {processList.map(process => (
                                <React.Fragment key={process.id}>
                                    <tr>
                                        <td>{process.id}</td>
                                        <td className="text-start">
                                            <span
                                                className="process-name-hover"
                                                onClick={() => {
                                                    setPID(process.id);
                                                    onMenuClick('format');
                                                }}
                                                title="포맷 관리로 이동"
                                            >
                                                {process.name}
                                            </span>
                                        </td>
                                        <td>{process.createdTime && processDate(process.createdTime)}</td>
                                        <td>{process.updatedTime && processDate(process.updatedTime)}</td>
                                        <td>
                                            <button
                                                className="btn btn-outline-primary btn-sm px-3"
                                                style={{ borderRadius: '1rem', fontWeight: 500 }}
                                                onClick={() => setEditComp(process.id)}
                                            >
                                                수정
                                            </button>
                                        </td>
                                    </tr>
                                    {editComp === process.id && (
                                        <tr>
                                            <td colSpan={5} style={{ background: "#f6f8fa", borderBottomLeftRadius: '1rem', borderBottomRightRadius: '1rem' }}>
                                                <EditProcess
                                                    onClose={handleEditComp}
                                                    processId={process.id}
                                                    _name={process.name}
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
            <div className="d-flex justify-content-end">
                <button
                    className="btn btn-success shadow-sm"
                    style={{ borderRadius: "1rem", fontWeight: 600, padding: "0.5rem 2rem" }}
                    onClick={() => setShowModal(true)}
                >
                    + 프로세스 추가
                </button>
            </div>

            {/* 모달 구조 */}
            {showModal && (
                <div
                    className="modal fade show"
                    tabIndex="-1"
                    style={{
                        display: 'block',
                        background: 'rgba(0,0,0,0.3)',
                        zIndex: 1050
                    }}
                    onClick={handleCloseModal}
                >
                    <div
                        className="modal-dialog modal-dialog-centered"
                        style={{ maxWidth: 480 }}
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="modal-content rounded-4">
                            <div className="modal-header">
                                <h5 className="modal-title fw-bold">프로세스 추가</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <InputProcess
                                    onClose={handleCloseModal}
                                    processId={selectedProcessId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* 모달 활성화 시 바디 스크롤 방지 */}
            {showModal && <style>{'body { overflow: hidden; }'}</style>}
        </div>
    );
};

export default ProcessManagement;

import React, { useEffect, useState } from 'react';
import LogDBApiClient from '../../service/LogDBApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';

const LogManagement = () => {
    const [successList, setSuccessList] = useState([]);
    const [failList, setFailList] = useState([]);
    const [expandedSuccessRowId, setExpandedSuccessRowId] = useState(null);
    const [expandedFailRowId, setExpandedFailRowId] = useState(null);

    const [successSortConfig, setSuccessSortConfig] = useState({ key: null, direction: 'asc' });
    const [failSortConfig, setFailSortConfig] = useState({ key: null, direction: 'asc' });


    useEffect(() => {
        LogDBApiClient.getSuccessList().then(res => {
            if (res.ok) {
                res.json().then(data => setSuccessList(data));
            } else {
                alert("Success Log DB get fail");
            }
        });

        LogDBApiClient.getFailList().then(res => {
            if (res.ok) {
                res.json().then(data => setFailList(data));
            } else {
                alert("Fail Log DB get fail");
            }
        });
    }, []);

    const toggleRow = (id, isSuccess) => {
        if (isSuccess) {
            setExpandedSuccessRowId(prev => (prev === id ? null : id));
        } else {
            setExpandedFailRowId(prev => (prev === id ? null : id));
        }
    };

    const handleSort = (key, isSuccess) => {
        const config = isSuccess ? successSortConfig : failSortConfig;
        const newConfig = config.key === key
            ? { key, direction: config.direction === 'asc' ? 'desc' : 'asc' }
            : { key, direction: 'asc' };

        isSuccess ? setSuccessSortConfig(newConfig) : setFailSortConfig(newConfig);
    };

    const getSortedList = (list, config, nestedFields = {}) => {
        const { key, direction } = config;
        if (!key) return list;

        return [...list].sort((a, b) => {
            let aValue = nestedFields[key] ? nestedFields[key](a) : a[key];
            let bValue = nestedFields[key] ? nestedFields[key](b) : b[key];

            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const renderSortIcon = (config, key) => {
        if (config.key !== key) return null;
        return (
            <span style={{ fontSize: '0.75em', marginLeft: '4px', verticalAlign: 'middle' }}>
                {config.direction === 'asc' ? '▲' : '▼'}
            </span>
        );
    };


    const sortedSuccessList = getSortedList(successList, successSortConfig, {
        process: item => item.process.name
    });

    const sortedFailList = getSortedList(failList, failSortConfig, {
        process: item => item.process.name,
        filter: item => item.filter.name
    });

    const formatDate = (time) => new Date(time).toLocaleString("ko-KR", {
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit",
        hour12: false
    });

    return (
        <div className="container mt-4">
            <h1>결과 화면</h1>
            <div className="row">
                {/* 성공 로그 */}
                <div className="col-6">
                    <h3 className="mb-3">성공 로그</h3>
                    <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>

                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-primary text-center">
                                <tr>
                                    <th style={{ cursor: 'pointer', width: '20%' }} onClick={() => handleSort('id', true)}>Log ID{renderSortIcon(successSortConfig, 'id')}</th>
                                    <th style={{ cursor: 'pointer', width: '20%' }} onClick={() => handleSort('process', true)}>Process{renderSortIcon(successSortConfig, 'process')}</th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('createdTime', true)}>생성 시간{renderSortIcon(successSortConfig, 'createdTime')}</th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('updatedTime', true)}>수정 시간{renderSortIcon(successSortConfig, 'updatedTime')}</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {sortedSuccessList.length === 0 ? (
                                    <tr><td colSpan="4" className="text-muted">데이터가 없습니다.</td></tr>
                                ) : (
                                    sortedSuccessList.flatMap(list => [
                                        <tr key={list.id} style={{ cursor: 'pointer' }} onClick={() => toggleRow(list.id, true)}>
                                            <td>{list.id}</td>
                                            <td>{list.process.name}</td>
                                            <td>{formatDate(list.createdTime)}</td>
                                            <td>{formatDate(list.updatedTime)}</td>
                                        </tr>,
                                        expandedSuccessRowId === list.id && (
                                            <tr key={`${list.id}-expanded`}>
                                                <td colSpan="4" className="text-start bg-light">
                                                    <strong>Item:</strong>
                                                    <pre
                                                        className="mb-0 mt-2"
                                                        style={{
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word',
                                                            overflowX: 'hidden'
                                                        }}
                                                    >
                                                        {JSON.stringify(JSON.parse(list.logJson), null, 2)}
                                                    </pre>
                                                </td>
                                            </tr>
                                        )
                                    ])
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* 실패 로그 */}
                <div className="col-6">
                    <h3 className="mb-3">실패 로그</h3>
                    <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        

                        <table className="table table-bordered table-hover align-middle">
                            <thead className="table-danger text-center">
                                <tr>
                                    <th style={{ cursor: 'pointer', width: '15%' }} onClick={() => handleSort('id', false)}>Log ID{renderSortIcon(failSortConfig, 'id')}</th>
                                    <th style={{ cursor: 'pointer', width: '15%' }} onClick={() => handleSort('process', false)}>Process{renderSortIcon(failSortConfig, 'process')}</th>
                                    <th style={{ cursor: 'pointer', width: '20%' }} onClick={() => handleSort('filter', false)}>실패 원인{renderSortIcon(failSortConfig, 'filter')}</th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('createdTime', false)}>생성 시간{renderSortIcon(failSortConfig, 'createdTime')}</th>
                                    <th style={{ cursor: 'pointer' }} onClick={() => handleSort('updatedTime', false)}>수정 시간{renderSortIcon(failSortConfig, 'updatedTime')}</th>

                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {sortedFailList.length === 0 ? (
                                    <tr><td colSpan="5" className="text-muted">데이터가 없습니다.</td></tr>
                                ) : (
                                    sortedFailList.flatMap(list => [
                                        <tr key={list.id} style={{ cursor: 'pointer' }} onClick={() => toggleRow(list.id, false)}>
                                            <td>{list.id}</td>
                                            <td>{list.process.name}</td>
                                            <td>{list.filter.name}</td>
                                            <td>{formatDate(list.createdTime)}</td>
                                            <td>{formatDate(list.updatedTime)}</td>

                                        </tr>,
                                        expandedFailRowId === list.id && (
                                            <tr key={`${list.id}-expanded`}>
                                                <td colSpan="5" className="text-start bg-light">
                                                    <strong>Item:</strong>
                                                    <pre
                                                        className="mb-0 mt-2"
                                                        style={{
                                                            whiteSpace: 'pre-wrap',
                                                            wordBreak: 'break-word',
                                                            overflowX: 'hidden'
                                                        }}
                                                    >
                                                        {JSON.stringify(JSON.parse(list.logJson), null, 2)}
                                                    </pre>
                                                </td>
                                            </tr>
                                        )
                                    ])
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogManagement;

import React, { useEffect, useState } from 'react';
import LogDBApiClient from '../../service/LogDBApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogTable from './LogTable';

const LogManagement = ({ onMenuClick }) => {
    const [successList, setSuccessList] = useState([]);
    const [failFilterList, setFailFilterList] = useState([]);
    const [failDedupList, setFailDedupList] = useState([]);

    const [expandedSuccessRowId, setExpandedSuccessRowId] = useState(null);
    const [expandedFailFilterRowId, setExpandedFailFilterRowId] = useState(null);
    const [expandedFailDedupRowId, setExpandedFailDedupRowId] = useState(null);

    const [successSortConfig, setSuccessSortConfig] = useState({ key: 'id', direction: 'desc' });
    const [failFilterSortConfig, setFailFilterSortConfig] = useState({ key: 'id', direction: 'desc' });
    const [failDedupSortConfig, setFailDedupSortConfig] = useState({ key: 'id', direction: 'desc' });

    useEffect(() => {
        LogDBApiClient.getSuccessList().then(res => {
            if (res.ok) res.json().then(setSuccessList);
            else alert("Success Log DB get fail");
        });
        LogDBApiClient.getFailListByFilter().then(res => {
            if (res.ok) res.json().then(setFailFilterList);
            else alert("Fail-Filter Log DB get fail");
        });
        LogDBApiClient.getFailListByDeduplication().then(res => {
            if (res.ok) res.json().then(setFailDedupList);
            else alert("Fail-Deduplication Log DB get fail");
        });
    }, []);

    const columnsSuccess = [
        { key: 'id', label: 'Log ID', width: '20%', sortable: true },
        { key: 'process', label: 'Process', width: '20%', sortable: true },
        { key: 'createdTime', label: '생성 시간', sortable: true },
    ];

    const columnsFailFilter = [
        { key: 'id', label: 'Log ID', width: '15%', sortable: true },
        { key: 'process', label: 'Process', width: '15%', sortable: true },
        { key: 'filter', label: '실패 원인', width: '20%', sortable: true },
        { key: 'createdTime', label: '생성 시간', sortable: true },
    ];

    const columnsFailDedup = [
        { key: 'id', label: 'Log ID', width: '15%', sortable: true },
        { key: 'process', label: 'Process', width: '15%', sortable: true },
        { key: 'deduplication', label: '실패 원인', width: '20%', sortable: true },
        { key: 'createdTime', label: '생성 시간', sortable: true },
    ];

    const nestedProcess = item => item.process.name;
    const nestedFilter = item => item.filter.name;
    const nestedDedup = item => item.deduplication.name;

    return (
        <div className="container mt-4" style={{ paddingTop: '50px'}}>
            <h1>결과 화면</h1>
            
            <div className="row">
                <p>Test용 p태그</p>
                <div className="col-12 mb-4">
                    <LogTable
                        title="성공 로그"
                        data={successList}
                        expandedRowId={expandedSuccessRowId}
                        setExpandedRowId={setExpandedSuccessRowId}
                        sortConfig={successSortConfig}
                        setSortConfig={setSuccessSortConfig}
                        columns={columnsSuccess}
                        nestedFields={{ process: nestedProcess }}
                        color="primary"
                    />
                </div>
                <div className="col-12 mb-4">
                    <LogTable
                        title="필터 실패 로그"
                        data={failFilterList}
                        expandedRowId={expandedFailFilterRowId}
                        setExpandedRowId={setExpandedFailFilterRowId}
                        sortConfig={failFilterSortConfig}
                        setSortConfig={setFailFilterSortConfig}
                        columns={columnsFailFilter}
                        nestedFields={{ process: nestedProcess, filter: nestedFilter }}
                        color="danger"
                    />
                </div>
                <div className="col-12 mb-4">
                    <LogTable
                        title="중복제거 실패 로그"
                        data={failDedupList}
                        expandedRowId={expandedFailDedupRowId}
                        setExpandedRowId={setExpandedFailDedupRowId}
                        sortConfig={failDedupSortConfig}
                        setSortConfig={setFailDedupSortConfig}
                        columns={columnsFailDedup}
                        nestedFields={{ process: nestedProcess, deduplication: nestedDedup }}
                        color="warning"
                    />
                </div>
            </div>
            
        </div>
    );
};

export default LogManagement;

import React, { useEffect, useState } from 'react';
import FilterApiClient from '../../service/FilterApiClient';
import DetailFilter from './DetailFilter';
import { useSearchParams } from 'react-router-dom';
import ConditionBuilder from './ConditionBuilder';
import { Link } from 'react-router-dom';

const FilterManagement = () => {
    const [params] = useSearchParams();
    const [processId, setProcessId] = useState(params.get('processId'));
    const [filterList, setFilterList] = useState([]);
    const [detailComp, setDetailComp] = useState(0);
    const [builderComp, setBuilderComp] = useState(false);

    const getFilters = () => {
        FilterApiClient.getFilterList(processId).then(
            res => {
                if (res.ok) {
                    res.json().then(data => setFilterList(data));
                }
            }
        );
    };
    useEffect(() => {
        getFilters();
    }, [detailComp, builderComp]);

    const handleDetailComp = () => setDetailComp(0);
    const handleBuilderComp = () => setBuilderComp(false);
    

    return (
        <div>
            <div>
                {filterList.map(filter => (
                    <div key={filter.id}>
                        <span role="button" onClick={() => setDetailComp(filter.id)}>
                            {filter.id} : {filter.name} / 활성화: {filter.active ? "On" : "Off"}
                        </span>
                        {detailComp === filter.id && (
                            <DetailFilter onClose={handleDetailComp} processId={processId} filterId={filter.id} />
                        )}
                    </div>
                ))}
                
                <button onClick={() => setBuilderComp(true)}>
                    필터 추가
                </button>
                {builderComp && (
                    <div>
                        <ConditionBuilder onClose={handleBuilderComp} processId={processId} />
                    </div>
                )}
                <Link to={`/log/format?processId=${processId}`} className="btn btn-secondary mt-3">
                    포맷 관리
                </Link>
            </div>
        </div>
    );
};

export default FilterManagement;
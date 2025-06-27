import React from 'react';

const LogTable = ({
    title, data, expandedRowId, setExpandedRowId,
    sortConfig, setSortConfig, columns, nestedFields, color
}) => {
    const handleSort = (key) => {
        const newConfig = sortConfig.key === key
            ? { key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' }
            : { key, direction: 'asc' };
        setSortConfig(newConfig);
    };

    const getSortedList = () => {
        const { key, direction } = sortConfig;
        if (!key) return data;
        return [...data].sort((a, b) => {
            let aValue = nestedFields[key] ? nestedFields[key](a) : a[key];
            let bValue = nestedFields[key] ? nestedFields[key](b) : b[key];
            if (aValue < bValue) return direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return direction === 'asc' ? 1 : -1;
            return 0;
        });
    };

    const renderSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return (
            <span style={{ fontSize: '0.75em', marginLeft: '4px', verticalAlign: 'middle' }}>
                {sortConfig.direction === 'asc' ? '▲' : '▼'}
            </span>
        );
    };

    const formatDate = (isoString) => {
        if (!isoString) return "";
        const date = new Date(isoString + "+09:00");
        return (
            date.getFullYear() + "-" +
            String(date.getMonth() + 1).padStart(2, "0") + "-" +
            String(date.getDate()).padStart(2, "0") + " " +
            String(date.getHours()).padStart(2, "0") + ":" +
            String(date.getMinutes()).padStart(2, "0")
        );
    };

    const sortedList = getSortedList();

    return (
        <div>
            <h3 className="mb-3">{title}</h3>
            <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className={`table table-bordered table-hover align-middle`}>
                    <thead className={`text-center table-${color}`}>
                        <tr>
                            {columns.map(col =>
                                <th
                                    key={col.key}
                                    style={{ cursor: col.sortable ? 'pointer' : undefined, width: col.width || undefined }}
                                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                                >
                                    {col.label}{col.sortable && renderSortIcon(col.key)}
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {sortedList.length === 0 ? (
                            <tr><td colSpan={columns.length} className="text-muted">데이터가 없습니다.</td></tr>
                        ) : (
                            sortedList.flatMap(row => [
                                <tr key={row.id} style={{ cursor: 'pointer' }} onClick={() => setExpandedRowId(expandedRowId === row.id ? null : row.id)}>
                                    {columns.map(col => (
                                        <td key={col.key}>
                                            {col.render ? col.render(row) : (
                                                col.key === 'createdTime' || col.key === 'updatedTime'
                                                    ? formatDate(row[col.key])
                                                    : nestedFields[col.key]
                                                        ? nestedFields[col.key](row)
                                                        : row[col.key]
                                            )}
                                        </td>
                                    ))}
                                </tr>,
                                expandedRowId === row.id && (
                                    <tr key={`${row.id}-expanded`}>
                                        <td colSpan={columns.length} className="text-start bg-light">
                                            <strong>Item:</strong>
                                            <pre
                                                className="mb-0 mt-2"
                                                style={{
                                                    whiteSpace: 'pre-wrap',
                                                    wordBreak: 'break-word',
                                                    overflowX: 'hidden'
                                                }}
                                            >
                                                {JSON.stringify(JSON.parse(row.logJson), null, 2)}
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
    );
};

export default LogTable;
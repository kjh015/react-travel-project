import React, { useEffect, useState } from 'react';
import FilterApiClient from '../../service/FilterApiClient';

// 조건 필드 및 연산자 옵션 정의
const operatorOptions = ['>', '<', '>=', '<=', '==', '!=', 'Equals'];

const ConditionBuilder = ({ onClose, processId }) => {
    const [fieldList, setFieldList] = useState([]);
    const [name, setName] = useState('');
    const [active, setActive] = useState(false);
    // 조건식 구성 요소들을 저장하는 상태 (tokens)
    const [tokens, setTokens] = useState([
        { type: 'condition', field: '', operator: '>', value: '', groupId: 0 }
    ]);



    useEffect(() => {
        FilterApiClient.getFormatKeys(processId)
            .then(res => res.json())
            .then(data => setFieldList(data));
    }, []);


    // AND + 조건 추가
    const addCondition = () => {
        const groupId = Date.now();
        setTokens([
            ...tokens,
            { type: 'operator', value: '&&', groupId },
            { type: 'condition', field: fieldList[0], operator: '>', value: '', groupId }
        ]);
    };

    // AND + ( + 조건 추가
    const addParenAndConditionWithAnd = () => {
        const groupId = Date.now();
        setTokens([
            ...tokens,
            { type: 'operator', value: '&&', groupId },
            { type: 'left-paren', groupId },
            { type: 'condition', field: fieldList[0], operator: '>', value: '', groupId }
        ]);
    };

    // ) 괄호 추가
    const addRightParen = () => {
        const groupId = Date.now();
        setTokens([
            ...tokens,
            { type: 'right-paren', groupId }
        ]);
    };

    // 조건 그룹 삭제
    const deleteGroup = (groupId) => {
        setTokens(tokens.filter(token => token.groupId !== groupId));
    };

    // 특정 token의 필드 업데이트
    const updateToken = (index, key, value) => {
        const updated = { ...tokens[index], [key]: value };
        const newTokens = [...tokens];
        newTokens[index] = updated;
        setTokens(newTokens);
    };

    // 조건 그룹 이동
    const moveGroup = (groupId, direction) => {
        const groups = getGroups(tokens);
        const idx = groups.findIndex(g => g[0].groupId === groupId);
        if (idx < 0) return;

        const newGroups = [...groups];
        if (direction === 'up' && idx > 1) {
            [newGroups[idx - 1], newGroups[idx]] = [newGroups[idx], newGroups[idx - 1]];
        } else if (direction === 'down' && idx < newGroups.length - 1) {
            [newGroups[idx + 1], newGroups[idx]] = [newGroups[idx], newGroups[idx + 1]];
        }

        setTokens(newGroups.flat());
    };

    // 토큰 배열을 표현식 문자열로 변환
    const buildExpression = () => {
        return tokens
            .map((token) => {
                switch (token.type) {
                    case 'condition':
                        if (token.operator === 'Equals') {
                            return `${token.field}.equalsIgnoreCase("${token.value}")`;
                        }
                        return `${token.field} ${token.operator} ${token.value}`;
                    case 'operator':
                        return ` ${token.value} `;
                    case 'left-paren':
                        return '(';
                    case 'right-paren':
                        return ')';
                    default:
                        return '';
                }
            })
            .join('');
    };

    // 괄호 유효성 검사
    const validateParentheses = () => {
        let balance = 0;
        for (const token of tokens) {
            if (token.type === 'left-paren') balance++;
            if (token.type === 'right-paren') balance--;
            if (balance < 0) return false;
        }
        return balance === 0;
    };



    // 전송 버튼 클릭 시 실행
    const handleSubmit = async (e) => {

        if (!validateParentheses()) {
            alert('❌ 괄호 짝이 맞지 않습니다.');
            return;
        }

        const hasInvalid = tokens.some(token =>
            token.type === 'condition' &&
            (token.field === '' || token.operator === '' || token.value === '')
        );
        if (hasInvalid) {
            alert('❌ 조건에 빈 값이 있습니다. 모든 필드, 연산자, 값을 입력해주세요.');
            return;
        }

        //전송용 tokens 복사 후 valueType 추가
        const tokensWithType = tokens.map(token => {
            if (token.type === 'condition') {
                return {
                    ...token,
                    valueType: inferValueType(token.value, token.operator)
                };
            }
            return token;
        });

        const expr = buildExpression();
        console.log('전송 문자열:', expr);
        console.log("✅ valueTypes 확인용 로그:");
        tokensWithType
            .filter(token => token.type === 'condition')
            .forEach(token =>
                console.log(`field=${token.field}, operator=${token.operator}, value=${token.value}, valueType=${token.valueType}`)
            );


        FilterApiClient.addFilter(processId, name, active, expr, tokensWithType)
            .then(res => res.ok ? onClose() : alert("실패"))
            .catch(err => console.error(err));
    };

    return (
        <div className="container mt-4 text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h5>필터 추가</h5>
            <div className="mb-3">
                <label className="form-label">Filter Name</label>
                <input type="text" className="form-control" placeholder="filter name" value={name} onChange={e => setName(e.target.value)} />
            </div>


            {/* 조건/괄호 추가 버튼 */}
            <div className="mt-3">
                <label>추가:  </label>
                <button className="btn btn-secondary me-2" onClick={addParenAndConditionWithAnd}>(</button>
                <button className="btn btn-secondary me-2" onClick={addRightParen}>)</button>
                <button className="btn btn-success me-2" onClick={addCondition}>조건</button>
            </div>

            {/* 현재 표현식 출력 */}
            <div className="mt-4">
                <strong>현재 표현식: </strong>
                <code>{buildExpression()}</code>
            </div>

            {/* 조건 그룹 렌더링 */}
            {getGroups(tokens).map((group, idx) => {
                const groupId = group[0].groupId;
                return (
                    <div className="d-flex justify-content-center mb-3" key={groupId}>
                        <div className="d-flex flex-column align-items-start">
                            {group.map((t, i) => {
                                const tokenIndex = tokens.findIndex(tok => tok === t);

                                // AND/OR 버튼
                                if (t.type === 'operator') {
                                    return (
                                        <div className="w-100 text-center mb-2" key={i}>
                                            <button
                                                className="btn btn-outline-primary"
                                                onClick={() =>
                                                    updateToken(tokenIndex, 'value', t.value === '&&' ? '||' : '&&')
                                                }
                                            >
                                                {t.value === '&&' ? 'AND' : 'OR'}
                                            </button>
                                        </div>
                                    );
                                }

                                // 여는 괄호 + 조건
                                if (t.type === 'left-paren') {
                                    const nextToken = group[i + 1];
                                    if (nextToken?.type === 'condition') {
                                        const condIndex = tokens.findIndex(tok => tok === nextToken);
                                        return (
                                            <div className="d-flex align-items-center" key={i}>
                                                <h2 className="me-2">(</h2>
                                                <select className="form-select me-2" style={{ width: '120px' }}
                                                    value={nextToken.field}
                                                    onChange={(e) => updateToken(condIndex, 'field', e.target.value)}>
                                                    <option value="">필드 선택</option>
                                                    {fieldList.map((f) => <option key={f} value={f}>{f}</option>)}
                                                </select>
                                                <select className="form-select me-2" style={{ width: '80px' }}
                                                    value={nextToken.operator}
                                                    onChange={(e) => updateToken(condIndex, 'operator', e.target.value)}>
                                                    {operatorOptions.map((op) => <option key={op} value={op}>{op}</option>)}
                                                </select>
                                                <input type="text" className="form-control me-2" style={{ width: '100px' }}
                                                    value={nextToken.value}
                                                    onChange={(e) => updateToken(condIndex, 'value', e.target.value)} />

                                                {/* 삭제 및 이동 버튼 */}
                                                {groupId !== 0 && (
                                                    <>
                                                        <button className="btn btn-danger btn-sm me-2" onClick={() => deleteGroup(groupId)}>X</button>
                                                        <button className="btn btn-outline-dark btn-sm me-1" onClick={() => moveGroup(groupId, 'up')}>⬆</button>
                                                        <button className="btn btn-outline-dark btn-sm" onClick={() => moveGroup(groupId, 'down')}>⬇</button>
                                                    </>
                                                )}
                                            </div>
                                        );
                                    }
                                }

                                // 일반 조건줄 (괄호 없이)
                                if (t.type === 'condition' && group[i - 1]?.type !== 'left-paren') {
                                    return (
                                        <div className="d-flex align-items-center" key={i}>
                                            <select className="form-select me-2" style={{ width: '120px' }}
                                                value={t.field}
                                                onChange={(e) => updateToken(tokenIndex, 'field', e.target.value)}>
                                                <option value="">필드 선택</option>
                                                {fieldList.map((f) => <option key={f} value={f}>{f}</option>)}
                                            </select>
                                            <select className="form-select me-2" style={{ width: '80px' }}
                                                value={t.operator}
                                                onChange={(e) => updateToken(tokenIndex, 'operator', e.target.value)}>
                                                {operatorOptions.map((op) => <option key={op} value={op}>{op}</option>)}
                                            </select>
                                            <input type="text" className="form-control me-2" style={{ width: '100px' }}
                                                value={t.value}
                                                onChange={(e) => updateToken(tokenIndex, 'value', e.target.value)} />

                                            {/* 삭제 및 이동 버튼 */}
                                            {groupId !== 0 && (
                                                <>
                                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteGroup(groupId)}>X</button>
                                                    <button className="btn btn-outline-dark btn-sm me-1" onClick={() => moveGroup(groupId, 'up')}>⬆</button>
                                                    <button className="btn btn-outline-dark btn-sm" onClick={() => moveGroup(groupId, 'down')}>⬇</button>
                                                </>
                                            )}
                                        </div>
                                    );
                                }

                                // 닫는 괄호
                                if (t.type === 'right-paren') {
                                    return (
                                        <div className="d-flex align-items-center" key={i}>
                                            <h2 className="me-2">)</h2>
                                            {groupId !== 0 && (
                                                <>
                                                    <button className="btn btn-danger btn-sm me-2" onClick={() => deleteGroup(groupId)}>X</button>
                                                    <button className="btn btn-outline-dark btn-sm me-1" onClick={() => moveGroup(groupId, 'up')}>⬆</button>
                                                    <button className="btn btn-outline-dark btn-sm" onClick={() => moveGroup(groupId, 'down')}>⬇</button>
                                                </>
                                            )}
                                        </div>
                                    );
                                }

                                return null;
                            })}
                        </div>
                    </div>
                );
            })}
            <button className="btn btn-secondary me-2" onClick={() => setActive(!active)}>
                활성화: {active ? "On" : "Off"}
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>전송</button>
            <button className="btn btn-outline-dark" onClick={onClose}>닫기</button>
        </div>
    );
};

// 토큰들을 groupId 기준으로 그룹핑
function getGroups(tokens) {
    const groups = [];
    let current = [];
    tokens.forEach((t) => {
        if (current.length === 0 || t.groupId === current[0].groupId) {
            current.push(t);
        } else {
            groups.push(current);
            current = [t];
        }
    });
    if (current.length) groups.push(current);
    return groups;
}

function inferValueType(value, operator) {
    if (operator === 'Equals') {
        return 'String';
    }
    if (value === 'true' || value === 'false') {
        return 'boolean';
    }
    if (/^-?\d+$/.test(value)) {         
        return 'int';
    }
    if (/^-?\d*\.\d+$/.test(value)) {   
        return 'double';
    }
    return 'String';
}


export default ConditionBuilder;

import React, { useEffect, useState } from 'react';
import SignApiClient from '../service/SignApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaUserShield } from 'react-icons/fa';

const MemberManagement = () => {
    const [memberList, setMemberList] = useState([]);
    const [alert, setAlert] = useState({ show: false, message: '', type: '' }); // alert 상태 추가

    const getMemberList = () => {
        SignApiClient.getMemberList()
            .then(res => res.json()
                .then(data => {
                    if (res.ok) {
                        setMemberList(data);
                    }
                    else {
                        setAlert({ show: true, message: "회원 조회 오류", type: "danger" });
                    }
                }))
    }

    const delegateAdmin = ({ loginId }) => {
        SignApiClient.delegateAdmin({ loginId })
            .then(res => res.text()
                .then(msg => {
                    setAlert({ show: true, message: msg, type: res.ok ? "success" : "danger" });
                    if (res.ok) {
                        getMemberList();
                    }
                }))
    }

    useEffect(() => {
        getMemberList();
    }, []);

    return (
        <div className="container py-4">
            {/* Alert 메시지 */}
            {alert.show && (
                <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                    {alert.message}
                    <button type="button" className="btn-close" aria-label="Close"
                        onClick={() => setAlert({ ...alert, show: false })}></button>
                </div>
            )}

            <div className="card shadow-sm rounded-4 mx-auto" style={{ maxWidth: "1200px" }}>
                <div className="card-body">
                    <h3 className="fw-bold mb-4 text-primary">회원 관리</h3>
                    <div className="table-responsive">
                        <table className="table table-hover align-middle">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>닉네임</th>
                                    <th>E-mail</th>
                                    <th>성별</th>
                                    <th>가입일</th>
                                    <th>권한</th>
                                    <th>삭제</th>
                                    <th className='text-center'>관리자 위임</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberList.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="text-center text-secondary py-4">
                                            회원 정보가 없습니다.
                                        </td>
                                    </tr>
                                )}
                                {memberList.map((member, idx) => (
                                    <tr key={member.id}>
                                        <td>{idx + 1}</td>
                                        <td>{member.loginId}</td>
                                        <td>{member.nickname}</td>
                                        <td>{member.email}</td>
                                        <td>{member.gender}</td>
                                        <td>{member.regDate}</td>
                                        <td>{member.roles?.includes("ROLE_ADMIN") ? "관리자" : "회원"}</td>
                                        <td>
                                            <button className="btn btn-sm btn-outline-danger" title="삭제">
                                                <FaTrash />
                                            </button>
                                        </td>
                                        <td className='text-center'>
                                            <button
                                                className="btn btn-sm btn-outline-success"
                                                title="관리자 위임"
                                                onClick={() => delegateAdmin({ loginId: member.loginId })}
                                            >
                                                <FaUserShield />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MemberManagement;

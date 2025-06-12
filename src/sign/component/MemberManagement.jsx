import React, { useEffect, useState } from 'react';
import SignApiClient from '../service/SignApiClient';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTrash, FaUserAlt, FaUserAltSlash, FaUserAstronaut, FaUserClock, FaUserInjured, FaUserNinja, FaUserShield, FaUsersSlash } from 'react-icons/fa';
import { FaUserCheck, FaUserSecret } from 'react-icons/fa6';

const MemberManagement = () => {
    const [memberList, setMemberList] = useState([]);

    const getMemberList = () => {
        SignApiClient.getMemberList()
            .then(res => res.json()
                .then(data => {
                    if (res.ok) {
                        setMemberList(data);
                    }
                    else {
                        alert("회원 조회 오류");
                    }
                }))
    }

    const delegateAdmin = ({loginId}) => {
        SignApiClient.delegateAdmin({loginId})
            .then(res => res.text()
                .then(msg => {
                    alert(msg);
                    if(res.ok){
                        getMemberList();
                    }
                }))

    }

    useEffect(() => {
        getMemberList();
    }, []);

    return (
        <div className="container py-4">
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
                                    <th>관리자 위임</th>
                                </tr>
                            </thead>
                            <tbody>
                                {memberList.length === 0 && (
                                    <tr>
                                        <td colSpan={8} className="text-center text-secondary py-4">
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
                                        <td>
                                            <button className="btn btn-sm btn-outline-success" title="관리자 위임" onClick={() => delegateAdmin({loginId: member.loginId})}>
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

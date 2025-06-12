// src/pages/SignUpdatePage.jsx

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignApiClient from '../service/SignApiClient';
import UserAuthentication from '../service/UserAuthentication';

const inputBoxStyle = {
    width: "100%",
    marginBottom: "22px",
};

const cardStyle = {
    maxWidth: "420px",
    width: "95%",
    margin: "40px auto",
    padding: "40px 34px 32px 34px",
    background: "rgba(255,255,255,0.97)",
    borderRadius: "1.5rem",
    boxShadow: "0 6px 36px 0 rgba(54,69,79,0.13)",
};

const titleGradient = {
    fontWeight: "bold",
    fontSize: "2rem",
    background: "#000000",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "30px"
};

const btnStyle = {
    fontWeight: "bold",
    fontSize: "1.07rem",
    letterSpacing: "0.03em",
    borderRadius: "2rem",
    marginTop: "18px"
};

const SignUpdatePage = () => {
    const [formData, setFormData] = useState({
        loginId: '',
        email: '',
        nickname: '',
        gender: '',
    });
    const navigate = useNavigate();

    const getMember = () => {
        SignApiClient.getMemberDetail({ loginId: UserAuthentication.getLoginIdFromToken() })
            .then(res => {
                if (res.ok) {
                    res.json().then(data => {
                        setFormData(data);
                    });
                }
                else {
                    alert("회원 정보 조회 실패");
                }
            })
    }

    const handleChange = (e) => {
        const { id, name, value } = e.target;
        const key = name || id;
        setFormData(prev => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await SignApiClient.updateMember(formData);
            if (res.ok) {
                alert("회원수정 성공");
                localStorage.setItem('nickname', formData.nickname);
                navigate("/")
            } else {
                alert("회원수정 실패");
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("에러가 발생했습니다.");
        }

    }

    useEffect(() => {
        getMember();
    }, []);

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
            display: "flex",
            flexDirection: "column",
        }}>
            <main className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div style={cardStyle}>
                    <div style={titleGradient} className="text-center mb-4">회원 정보 수정</div>
                    <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                        {/* 닉네임 */}
                        <div style={inputBoxStyle}>
                            <label htmlFor="nickname" className="form-label fw-semibold">닉네임</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nickname"
                                value={formData.nickname}
                                onChange={handleChange}
                                required
                                placeholder="닉네임을 입력하세요"
                            />
                            <div className="invalid-feedback">닉네임을 입력해주세요.</div>
                        </div>
                        {/* 아이디 */}
                        <div style={inputBoxStyle}>
                            <label htmlFor="loginId" className="form-label fw-semibold">아이디</label>
                            <input
                                type="text"
                                className="form-control"
                                id="loginId"
                                value={formData.loginId}
                                onChange={handleChange}
                                required
                                placeholder="아이디를 입력하세요"
                                disabled
                            />
                            <div className="invalid-feedback">아이디를 입력해주세요.</div>
                        </div>
                        {/* 이메일 */}
                        <div style={inputBoxStyle}>
                            <label htmlFor="email" className="form-label fw-semibold">
                                이메일
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="you@example.com"
                            />
                            <div className="invalid-feedback">유효한 이메일을 입력해주세요.</div>
                        </div>
                        {/* 성별 */}
                        <div style={inputBoxStyle}>
                            <label className="form-label fw-semibold mb-2">성별</label>
                            <div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="gender-male"
                                        value="남"
                                        checked={formData.gender === "남"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="gender-male">남</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="gender-female"
                                        value="여"
                                        checked={formData.gender === "여"}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="gender-female">여</label>
                                </div>
                            </div>
                            <div className="invalid-feedback">성별을 선택해주세요.</div>
                        </div>
                        <div className="d-flex gap-2">
                            <button
                                type="button"
                                className="btn btn-outline-secondary flex-fill"
                                style={{ ...btnStyle, marginTop: 0 }}
                                onClick={() => navigate('/sign/update/password')}
                            >
                                비밀번호 변경
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary flex-fill"
                                style={{ ...btnStyle, marginTop: 0 }}>
                                수정 완료
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default SignUpdatePage;

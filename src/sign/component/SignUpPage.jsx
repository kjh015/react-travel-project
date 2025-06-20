import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from 'react';
import SignApiClient from '../service/SignApiClient';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const cardStyle = {
    maxWidth: "410px",
    width: "95%",
    margin: "0 auto",
    borderRadius: "1.5rem",
    boxShadow: "0 6px 32px 0 rgba(54,69,79,0.13)",
    border: "none"
};

const titleGradient = {
    fontWeight: "bold",
    fontSize: "2.05rem",
    background: "#000000",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "24px"
};

const btnStyle = {
    fontWeight: "bold",
    fontSize: "1.08rem",
    letterSpacing: "0.03em",
    borderRadius: "2rem",
    padding: "0.75rem",
    marginTop: "12px",
    background: "#3f51b5",
    border: "none"
};

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        loginId: '',
        password: '',
        email: '',
        nickname: '',
        gender: '',
    });

    const [alert, setAlert] = useState({ show: false, message: '', type: '' });
    const [birthDate, setBirthDate] = useState('');
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await SignApiClient.signUp(formData);
            const msg = await res.json();
            if (res.ok) {                
                setAlert({ show: true, message: msg.message, type: "success" });
                setTimeout(() => { window.location.href = "/"; }, 500);
            } else {
                setAlert({ show: true, message: msg.message, type: "danger" });
            }
        } catch (error) {
            console.error("에러 발생:", error);
            setAlert({ show: true, message: "에러가 발생했습니다.", type: "danger" });
        }
    };

    useEffect(() => {
        document.body.classList.add('bg-body-tertiary');
        return () => document.body.classList.remove('bg-body-tertiary');
    }, []);

    return (
        <div className="min-vh-100 d-flex flex-column" style={{
            background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
        }}>
            <main className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div style={cardStyle} className="card shadow-sm">
                    <div className="card-body p-4">
                        <div className="text-center" style={titleGradient}>회원가입</div>
                        {/* Alert 메시지 */}
                        {alert.show && (
                            <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                                {alert.message}
                                <button
                                    type="button"
                                    className="btn-close"
                                    aria-label="Close"
                                    onClick={() => setAlert({ ...alert, show: false })}
                                ></button>
                            </div>
                        )}
                        <form className="needs-validation" noValidate onSubmit={handleSubmit}>

                            <div className="mb-3">
                                <label htmlFor="loginId" className="form-label fw-semibold">아이디</label>
                                <input type="text" className="form-control"
                                    id="loginId" name="loginId"
                                    value={formData.loginId}
                                    onChange={handleChange}
                                    placeholder="아이디를 입력하세요"
                                    required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label fw-semibold">비밀번호</label>
                                <input type="password" className="form-control"
                                    id="password" name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="비밀번호를 입력하세요"
                                    required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="nickname" className="form-label fw-semibold">닉네임</label>
                                <input type="text" className="form-control"
                                    id="nickname" name="nickname"
                                    value={formData.nickname}
                                    onChange={handleChange}
                                    placeholder="닉네임을 입력하세요"
                                    required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="email" className="form-label fw-semibold">이메일 <span className="text-body-secondary fs-7">(선택)</span></label>
                                <input type="email" className="form-control"
                                    id="email" name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com" />
                            </div>

                            {/* 성별 */}
                            <div className="mb-3">
                                <label className="form-label fw-semibold d-block mb-2">성별</label>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="genderMale"
                                        value="남"
                                        checked={formData.gender === '남'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="genderMale">남</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input"
                                        type="radio"
                                        name="gender"
                                        id="genderFemale"
                                        value="여"
                                        checked={formData.gender === '여'}
                                        onChange={handleChange}
                                        required
                                    />
                                    <label className="form-check-label" htmlFor="genderFemale">여</label>
                                </div>
                                {!formData.gender &&
                                    <div className="form-text text-danger mt-1">성별을 선택하세요.</div>
                                }
                            </div>

                            <div>
                                <label className="form-label">생년월일</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={birthDate}
                                    onChange={e => setBirthDate(e.target.value)}
                                    max={new Date().toISOString().split('T')[0]} // 오늘 날짜까지만 선택 가능
                                />
                            </div>

                            <div className="d-grid">
                                <button type="submit" className="btn text-white shadow" style={btnStyle}>회원가입 완료</button>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default SignUpPage;

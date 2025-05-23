import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from 'react';
import SignApiClient from '../service/SignApiClient';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        loginId: '',
        password: '',
        email: '',
        nickname: '',
        gender: '',
        role: 'user'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await SignApiClient.signUp(formData);
            if (res.ok) {
                alert("회원가입 성공!");
                window.location.href = "/";
            } else {
                alert("회원가입 실패");
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("에러가 발생했습니다.");
        }
    };

    useEffect(() => {
        document.body.classList.add('bg-body-tertiary');
        return () => document.body.classList.remove('bg-body-tertiary');
    }, []);

    return (
        <div



            className="min-vh-100 d-flex flex-column">

            <main className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="col-md-6 col-lg-5">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">회원가입</h2>
                            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="loginId" className="form-label">아이디</label>
                                    <input type="text" className="form-control" id="loginId" name="loginId" value={formData.loginId} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">비밀번호</label>
                                    <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="nickname" className="form-label">닉네임</label>
                                    <input type="text" className="form-control" id="nickname" name="nickname" value={formData.nickname} onChange={handleChange} required />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">이메일</label>
                                    <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label d-block">성별</label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="genderMale" value="male" checked={formData.gender === 'male'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="genderMale">남</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="gender" id="genderFemale" value="female" checked={formData.gender === 'female'} onChange={handleChange} />
                                        <label className="form-check-label" htmlFor="genderFemale">여</label>
                                    </div>
                                </div>

                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary">회원가입 완료</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center text-muted py-4 small">
                <p className="mb-1">© 2017–2025 Company Name</p>
                <ul className="list-inline">
                    <li className="list-inline-item"><a href="#">Privacy</a></li>
                    <li className="list-inline-item"><a href="#">Terms</a></li>
                    <li className="list-inline-item"><a href="#">Support</a></li>
                </ul>
            </footer>
        </div>
    );
};

export default SignUpPage;

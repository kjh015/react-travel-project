import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from 'react';
import SignApiClient from '../service/SignApiClient';
import { useNavigate } from 'react-router-dom';

const SignInPage = () => {
    const [loginData, setLoginData] = useState({
        loginId: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await SignApiClient.signIn(loginData);
            if (res.ok) {
                const data = await res.json();
                localStorage.setItem('accessToken', data.accessToken);
                const resNN = await SignApiClient.getNickname(getUserIdFromToken());
                const message = await resNN.text();
                if (resNN.ok) {
                    localStorage.setItem('nickname', message);
                    alert("로그인 성공!");
                    navigate("/");
                }
                else {
                    alert(message);
                }
            } else {
                const message = await res.text();
                alert(message);
            }
        } catch (error) {
            console.error("에러 발생:", error);
            alert("에러가 발생했습니다.");
        }
    };

    const getUserIdFromToken = () => {
        const token = localStorage.getItem("accessToken");
        if (!token) return null;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.sub || payload.loginId;
        } catch (e) {
            console.error("토큰 디코딩 실패:", e);
            return null;
        }
    }

    useEffect(() => {
        document.body.classList.add('bg-body-tertiary');
        return () => document.body.classList.remove('bg-body-tertiary');
    }, []);

    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                overflowX: "hidden",
                background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                position: "relative"
            }}
            className="min-vh-100 d-flex flex-column">
            <main className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="col-md-5 col-lg-4">
                    <div className="card shadow-sm">
                        <div className="card-body p-4">
                            <h2 className="text-center mb-4">로그인</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="loginId" className="form-label">아이디</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="loginId"
                                        name="loginId"
                                        value={loginData.loginId}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">비밀번호</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={loginData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* 버튼 영역: 회원가입 왼쪽, 로그인 오른쪽 */}
                                <div className="d-flex justify-content-between mt-4">
                                    <button
                                        type="button"
                                        className="btn btn-outline-success"
                                        onClick={() => navigate('/sign/component/SignUpPage')}
                                    >
                                        회원가입
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                    >
                                        로그인
                                    </button>
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

export default SignInPage;

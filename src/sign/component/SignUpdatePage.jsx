import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const inputBoxStyle = {
    width: "60%",
    minWidth: "220px",
    maxWidth: "400px",
    margin: "0 auto 20px auto",
};

const SignUpdatePage = () => {
    return (
        <div
            style={{
                minHeight: "100vh",
                width: "100vw",
                overflowX: "hidden",
                background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                position: "relative"
            }}
        >
            <main>
                <div style={{ width: "100%", marginTop: '70px', padding: '20px', textAlign: 'center' }}>
                    <a className="btn btn-secondary" href="/">Travel React</a>
                    <div style={{ marginTop: '30px', padding: '20px' }}></div>
                    <h1 className="h2">회원 정보 수정</h1>
                </div>
                <form className="needs-validation" noValidate style={{ width: "100%", padding: "0 10vw" }}>
                    {/* 이름 */}
                    <div style={inputBoxStyle}>
                        <label htmlFor="firstName" className="form-label">이름</label>
                        <input type="text" className="form-control" id="firstName" required />
                        <div className="invalid-feedback">이름을 입력해주세요.</div>
                    </div>
                    {/* 아이디 */}
                    <div style={inputBoxStyle}>
                        <label htmlFor="username" className="form-label">아이디</label>
                        <input type="text" className="form-control" id="username" required />
                        <div className="invalid-feedback">아이디를 입력해주세요.</div>
                    </div>
                    {/* 이메일 */}
                    <div style={inputBoxStyle}>
                        <label htmlFor="email" className="form-label">
                            이메일 <span className="text-body-secondary">(선택)</span>
                        </label>
                        <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                        <div className="invalid-feedback">유효한 이메일을 입력해주세요.</div>
                    </div>
                    {/* 비밀번호 */}
                    <div style={inputBoxStyle}>
                        <label htmlFor="password" className="form-label">비밀번호</label>
                        <input type="password" className="form-control" id="password" required />
                        <div className="invalid-feedback">비밀번호를 입력해주세요.</div>
                    </div>
                    <div style={{ ...inputBoxStyle, marginBottom: "40px" }}>
                        <a className="btn btn-primary w-100" href="/">정보 수정 완료</a>
                    </div>
                </form>
            </main>
            <footer className="my-5 pt-5 text-body-secondary text-center text-small">
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

export default SignUpdatePage;

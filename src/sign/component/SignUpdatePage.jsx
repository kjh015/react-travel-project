import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../../common/Navbar';
import { Link } from 'react-router-dom';

const SignUpdatePage = () => {
    return (

        <div className="container">
            <main>
                <Navbar />

                <div style={{ flex: 1, marginTop: '70px', padding: '20px' }} className="py-5 text-center">
                    <a className="btn btn-secondary" href="/">Travel React</a>
                    <div style={{ flex: 1, marginTop: '30px', padding: '20px' }}></div>
                    <h1 className="h2">회원 정보 수정</h1>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-7 col-lg-8">
                        <form className="needs-validation" noValidate>
                            <div className="row g-3">
                                {/* 이름 */}
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">이름</label>
                                    <input type="text" className="form-control" id="firstName" required />
                                    <div className="invalid-feedback">이름을 입력해주세요.</div>
                                </div>

                                {/* 아이디 */}
                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">아이디</label>
                                    <div className="input-group has-validation">
                                        <input type="text" className="form-control" id="username" required />
                                        <div className="invalid-feedback">아이디를 입력해주세요.</div>
                                    </div>
                                </div>

                                {/* 이메일 */}
                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">
                                        이메일 <span className="text-body-secondary">(선택)</span>
                                    </label>
                                    <input type="email" className="form-control" id="email" placeholder="you@example.com" />
                                    <div className="invalid-feedback">유효한 이메일을 입력해주세요.</div>
                                </div>

                                {/* 주소 */}
                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">주소</label>
                                    <input type="text" className="form-control" id="address" required />
                                    <div className="invalid-feedback">주소를 입력해주세요.</div>
                                </div>

                                {/* 상세주소 */}
                                <div className="col-12">
                                    <label htmlFor="address2" className="form-label">
                                        상세주소 <span className="text-body-secondary">(선택)</span>
                                    </label>
                                    <input type="text" className="form-control" id="address2" placeholder="예: 아파트, 동/호수" />
                                </div>

                                {/* 국가 */}
                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">국가</label>
                                    <select className="form-select" id="country" required>
                                        <option value="">선택...</option>
                                        <option>대한민국</option>
                                        <option>United States</option>
                                    </select>
                                    <div className="invalid-feedback">국가를 선택해주세요.</div>
                                </div>

                                {/* 도 */}
                                <div className="col-md-4">
                                    <label htmlFor="state" className="form-label">도</label>
                                    <select className="form-select" id="state" required>
                                        <option value="">선택...</option>
                                        <option>서울특별시</option>
                                        <option>California</option>
                                    </select>
                                    <div className="invalid-feedback">도/시를 선택해주세요.</div>
                                </div>

                                {/* 우편번호 */}
                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">우편번호</label>
                                    <input type="text" className="form-control" id="zip" required />
                                    <div className="invalid-feedback">우편번호를 입력해주세요.</div>
                                </div>
                            </div>
                            <div style={{ flex: 1, marginTop: '30px', padding: '20px' }}></div>

                            <div class="d-grid gap-2">
                                <a class="btn btn-primary" href="/">정보 수정 완료</a>
                            </div>

                        </form>
                    </div>
                </div>
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

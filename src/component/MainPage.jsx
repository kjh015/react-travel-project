import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';

import Thumbnail from './Thumbnail';
import Footers from './Footers';

// 로그인 Form 컴포넌트를 분리해도 좋음

const MainPage = () => {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('로그인 시도:', { id, password });
    // 실제 로그인 로직 처리
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" aria-label="Main navbar">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Travel React</a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* 왼쪽 메뉴 */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" href="#">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/component/admnpage">관리자 페이지</a>
              </li>
            </ul>
              
            {/* 오른쪽 로그인 & 검색 */}
            <div className="d-flex align-items-center gap-3">
              {/* 로그인 폼 */}
              <form className="d-flex align-items-center" onSubmit={handleLogin}>
                  <div className="d-flex align-items-center me-2">
                    <span className="text-white me-2">로그인</span>  {/* 왼쪽 텍스트 */}
                    <input
                      className="form-control"
                      type="text"
                      placeholder="아이디"
                      value={id}
                      onChange={(e) => setid(e.target.value)}
                      style={{ width: '150px', height: '40px' }}
                    />
                  </div>
                  
                  <input
                    className="form-control me-2"
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '150px', height: '40px' }}
                  />

                  <button type="submit" className="btn btn-primary">로그인</button>
                </form>


              {/* 추가 버튼들 */}
              <a className="btn btn-success" href="/component/signup">Sign up</a>
              <a className="btn btn-danger" href="/component/place">상세보기</a>
              <form className="d-flex ms-4"></form>

              {/* 검색 폼 */}
              <form className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="검색"
                  style={{ width: '150px', height: '40px' }}
                />
                <button type="submit" className="btn btn-primary">검색</button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      {/* 본문 영역 */}
      <div style={{ marginTop: '80px' }}>
        <Thumbnail />
        <Thumbnail />
        <Footers />
      </div>
    </div>
  );
};

export default MainPage;

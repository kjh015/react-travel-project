import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Travel React</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">메뉴</h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/component/admnpage">관리자 메뉴</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/board/returnboard">게시판</Link>
              </li>
              {isLoggedIn && (
                <li className="nav-item">
                  <Link className="nav-link" to="/component/mypage">마이페이지</Link>
                </li>
              )}
            </ul>

            {/* 중앙 정렬된 버튼 그룹 */}
            <div className="d-flex flex-column align-items-center gap-2 my-3">
              {!isLoggedIn ? (
                <button className="btn btn-primary" onClick={handleLogin}>로그인</button>
              ) : (
                <button className="btn btn-secondary" onClick={handleLogout}>로그아웃</button>
              )}
              <Link to="/sign/component/SignUpPage" className="btn btn-success">회원가입</Link>
              <Link to="/board/component/page/BoardDetailPage" className="btn btn-danger">상세보기</Link>
            </div>

            {/* 검색 폼 */}
            <form className="d-flex mt-3 justify-content-center" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="검색"
                aria-label="검색"
              />
              <button
                className="btn btn-outline-light"
                type="submit"
                style={{ whiteSpace: 'nowrap', padding: '0.375rem 0.75rem' }}
              >
                검색
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SignApiClient from "../sign/service/SignApiClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Offcanvas } from 'bootstrap';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [curUser, setCurUser] = useState('');
  const offcanvasRef = useRef(null);        // 오프캔버스 DOM 참조
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    SignApiClient.signOut().then(
      res => {
        if (res.ok) {
          localStorage.removeItem('accessToken');
          window.location.href = '/';
          alert("로그아웃 성공");
        } else {
          alert("로그아웃 실패");
        }
      }
    )
  };

  const handleTest = () => {
    SignApiClient.test().then(
      res => {
        if (res.ok) {
          res.text().then(
            data => alert(data)
          )
        } else {
          alert("실패");
        }
      }
    )
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
  };

  // 최초 렌더링 시 현재 유저ID 셋팅
  useEffect(() => {
    setCurUser(getUserIdFromToken());
    document.body.style.overflow = 'auto';
    document.body.classList.remove('offcanvas-backdrop', 'modal-open');
    document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
  }, []);

  // 페이지 이동(라우트 변경) 시 오프캔버스/오버레이/스크롤 문제 모두 정리
  useEffect(() => {
    if (offcanvasRef.current) {
      const instance = Offcanvas.getOrCreateInstance(offcanvasRef.current);
      instance.hide();
    }
    // 오버레이와 스크롤 잠김 현상도 모두 정리
    document.body.style.overflow = 'auto';
    document.body.classList.remove('offcanvas-backdrop', 'modal-open');
    document.querySelectorAll('.offcanvas-backdrop').forEach(el => el.remove());
  }, [location]);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Travel React</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon" />
        </button>

        <div
          ref={offcanvasRef}
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ "--bs-offcanvas-width": "250px" }}
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
                <Link className="nav-link" to="/board/list">게시판</Link>
              </li>
            </ul>
            <div className="d-flex flex-column align-items-center gap-2 my-3">
              <Link to="/sign/component/SignInPage" className="btn btn-primary btn-sm w-50">로그인</Link>
              <Link to="/sign/component/SignUpPage" className="btn btn-success btn-sm w-50">Sign up</Link>

              <button className="btn btn-warning btn-sm w-50" onClick={handleTest}>AccessToken Test</button>
              <Link to="/common/MyPage" className="btn btn-success btn-sm w-50">마이페이지</Link>
              <button className="btn btn-outline-danger btn-sm w-50" onClick={handleLogout}>로그아웃</button>
              <button className="btn btn-outline-success btn-sm w-50" disabled>ID: {curUser}</button>
              {/* 검색 폼 */}
              <form className="d-flex mt-3 w-100 justify-content-center" role="search">
                <input
                  className="form-control form-control-sm me-2"
                  type="search"
                  placeholder="검색"
                  aria-label="검색"
                />
                <button
                  className="btn btn-outline-light btn-sm"
                  type="submit"
                  style={{ whiteSpace: 'nowrap', padding: '0.375rem 0.75rem' }}
                >
                  검색
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

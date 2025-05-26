import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import SignApiClient from "../sign/service/SignApiClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Offcanvas } from 'bootstrap';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [curUser, setCurUser] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const offcanvasRef = useRef(null);

  // 오프캔버스 닫힘 후 라우팅
  const handleMenuClick = (path) => {
    if (offcanvasRef.current) {
      const offcanvas = Offcanvas.getOrCreateInstance(offcanvasRef.current);
      const handleHidden = () => {
        navigate(path);
        offcanvasRef.current.removeEventListener('hidden.bs.offcanvas', handleHidden);
      };
      offcanvasRef.current.addEventListener('hidden.bs.offcanvas', handleHidden);
      offcanvas.hide();
    } else {
      navigate(path);
    }
  };
  const handleLogout = () => {
    SignApiClient.signOut().then(
      res => {
        if (res.ok) {
          localStorage.removeItem('accessToken');
          window.location.href = '/';
          alert("로그아웃 성공");
        }
        else {
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
            data =>
              alert(data)
          )
        }
        else {
          alert("실패");
        }
      }
    )
  }

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

  useEffect(() => {
    const userId = getUserIdFromToken();
    if (userId) {
      setIsLoggedIn(true);
      setCurUser(userId);
    } else {
      setIsLoggedIn(false);
      setCurUser('');
    }
  }, []);

  
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* 좌측 로고 */}
        <button className="navbar-brand btn btn-link text-white" style={{ textDecoration: "none" }} onClick={() => handleMenuClick("/")}>
          Travel React
        </button>

        {/* 검색 폼 */}
        <form className="d-flex justify-content-center align-items-center flex-grow-1 mx-3" style={{ maxWidth: 400 }}>
          <input className="form-control me-2" type="search" placeholder="검색" aria-label="검색" />
          <button className="btn btn-outline-light" type="submit" style={{ whiteSpace: 'nowrap' }}>
            검색
          </button>
        </form>

        {/* 오프캔버스 메뉴 버튼 */}
        <button className="navbar-toggler" type="button"
          data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
          <span className="navbar-toggler-icon" />
        </button>

        {/* 오프캔버스 메뉴 (★ 백드롭 없음) */}
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          style={{ width: '250px', maxWidth: '80vw' }}
          ref={offcanvasRef}
          data-bs-backdrop="false"   // ← 이 한 줄로 백드롭(overlay) 완전 제거!
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">메뉴</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>

          <div className="offcanvas-body">
            {/* 메뉴 네비게이션 */}
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleMenuClick("/component/admnpage")}>관리자 메뉴</button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link" onClick={() => handleMenuClick("/board/list")}>게시판</button>
              </li>
            </ul>

            <div className="d-flex flex-column align-items-center gap-2 my-3">
              {!isLoggedIn ? (
                <>
                  <button className="btn btn-primary w-100" onClick={() => handleMenuClick("/sign/component/SignInPage")}>로그인</button>
                  <button className="btn btn-success w-100" onClick={() => handleMenuClick("/sign/component/SignUpPage")}>회원가입</button>
                </>
              ) : (
                <button className="btn btn-outline-danger w-100" onClick={handleLogout}>로그아웃</button>
              )}
              <button className="btn btn-outline-light w-100" onClick={() => handleMenuClick("/mypage")}>마이페이지</button>
              <button className="btn btn-danger w-100" onClick={() => handleMenuClick("/board/component/page/BoardDetailPage")}>상세보기</button>
              <button className="btn btn-warning w-100" onClick={handleTest}>AccessToken Test</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

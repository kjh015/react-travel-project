import { Offcanvas, Button } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import SignApiClient from "../sign/service/SignApiClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; // 아이콘 사용을 위해 import
import UserAuthentication from '../sign/service/UserAuthentication';

const Navbar = () => {
  const [curUser, setCurUser] = useState('');
  const [show, setShow] = useState(false);
  const [alert, setAlert] = useState({ show: false, message: '', type: '' }); // type: 'success' | 'danger'
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 로그아웃
  const handleLogout = () => {
    SignApiClient.signOut().then(
      res => {
        if (res.ok) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('nickname');
          setAlert({ show: true, message: "로그아웃 성공!", type: "danger" });
          handleClose();
          setTimeout(() => {
            navigate("/");
            setAlert({ show: false, message: '', type: '' }); // 필요시 alert 제거
          }, 1200);
        } else {
          setAlert({ show: true, message: "로그아웃 실패", type: "danger" });
          console.log(res);
        }
      }
    );
  };

  // 기타 함수 (테스트, 로그인/회원가입 이동 등)
  const handleTest = () => {
    SignApiClient.test().then(
      res => {
        if (res.ok) {
          res.text().then(
            data => setAlert({ show: true, message: data, type: "success" })
          )
        } else {
          setAlert({ show: true, message: "실패", type: "danger" });
        }
      }
    )
  }

  const goToLogin = () => {
    if (localStorage.getItem('accessToken') != null) {
      setAlert({ show: true, message: "이미 로그인되어 있습니다.", type: "info" });
    }
    else {
      navigate("/sign/component/SignInPage");
    }
  }

  const goToSignup = () => {
    if (localStorage.getItem('accessToken') != null) {
      setAlert({ show: true, message: "이미 로그인되어 있습니다.", type: "info" });
    }
    else {
      navigate("/sign/component/SignUpPage");
    }
  }

  // 로그인 여부 체크
  const isLoggedIn = !!localStorage.getItem('accessToken');
  const isAdmin = UserAuthentication.isAdmin();

  useEffect(() => {
    setCurUser(localStorage.getItem('nickname'));
    document.body.style.overflow = 'auto';
    document.body.classList.remove('offcanvas-backdrop', 'modal-open');
  }, [handleShow]);

  // Alert 자동 사라짐
  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(() => setAlert(prev => ({ ...prev, show: false })), 1800);
      return () => clearTimeout(timer);
    }
  }, [alert.show]);

  return (
    <>
      {/* ----- Bootstrap Alert 메시지 ----- */}
      <div
        style={{
          position: "fixed",
          top: 80, // 네비게이션 아래
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: 260,
          zIndex: 2000,
        }}
      >
        {alert.show && (
          <div className={`alert alert-${alert.type || "info"} text-center shadow`} role="alert">
            {alert.message}
          </div>
        )}
      </div>
      {/* ----- 네비바 시작 ----- */}
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <div className="container-fluid px-3 d-flex align-items-center" style={{ minHeight: "60px" }}>
          {/* 왼쪽: 브랜드 */}
          <div style={{ minWidth: "130px" }}>
            <Link className="navbar-brand mb-0 h1" to="/" style={{ fontWeight: 600 }}>
              Travel React
            </Link>
          </div>
          {/* 가운데: 검색(비워둠) */}
          <div className="flex-grow-1 d-flex justify-content-center"></div>
          {/* 오른쪽: 햄버거(오프캔버스) 버튼 */}
          <div style={{ minWidth: "54px" }} className="d-flex justify-content-end">
            <Button
              variant="dark"
              className="navbar-toggler"
              onClick={handleShow}
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon" />
            </Button>
          </div>
        </div>

        {/* 오프캔버스 메뉴 */}
        <Offcanvas
          show={show}
          onHide={handleClose}
          placement="end"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          className="text-bg-dark"
          style={{ width: '270px' }}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">메뉴</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <div className="d-flex flex-column justify-content-between h-100">
              {/* 메뉴 영역 */}
              <div className="d-flex flex-column align-items-stretch gap-2">
                <div className="mb-2">
                  <Link
                    className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                    to="/board/list"
                    onClick={handleClose}
                  >
                    <i className="bi bi-card-list me-2"></i>여행지
                  </Link>
                </div>
                {!isLoggedIn && (
                  <>
                    <div className="mb-2">
                      <Link
                        className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                        to="sign/component/signinpage"
                        onClick={() => { goToLogin(); handleClose(); }}
                      >
                        <i className="bi bi-box-arrow-in-right me-2"></i>로그인
                      </Link>
                    </div>
                    <div className="mb-2">
                      <Link
                        className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                        to="sign/component/signuppage"
                        onClick={() => { goToSignup(); handleClose(); }}
                      >
                        <i className="bi bi-person-plus me-2"></i>회원 가입
                      </Link>
                    </div>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    {isAdmin &&
                      <div className="mb-2">
                        <Link
                          className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                          to="/component/admnpage"
                          onClick={handleClose}
                        >
                          <i className="bi bi-gear me-2"></i>관리자 메뉴
                        </Link>
                      </div>
                    }
                    <div className="mb-2">
                      <Link
                        className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                        to="/common/MyPage"
                        onClick={handleClose}
                      >
                        <i className="bi bi-person-circle me-2"></i>마이페이지
                      </Link>
                    </div>
                  </>
                )}
              </div>
              {/* 아래쪽: 로그아웃, 토큰 테스트, ID */}
              <div className="d-flex flex-column align-items-stretch gap-2 mt-4">
                <div className="mb-2">
                  <div className="mb-2">
                    <Link
                      className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>로그아웃
                    </Link>
                  </div>
                  <Link
                    className="nav-link w-100 fs-6 text-light bg-secondary bg-opacity-50 rounded px-3 py-2"
                    onClick={handleTest}
                  >
                    <i className="bi bi-key me-2"></i>AccessToken Test
                  </Link>
                </div>
                <div>


                  <span className="nav-link w-100 fs-6 text-light bg-secondary bg-opacity-50 rounded px-3 py-2 disabled" style={{ pointerEvents: 'none', opacity: 0.7 }}>
                    <i className="bi bi-person-badge me-2"></i>ID: {curUser}
                  </span>
                </div>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </nav>
    </>
  );
};

export default Navbar;

//  const handleLogout에 로그아웃 성공 경고창
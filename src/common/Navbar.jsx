import { Offcanvas, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import SignApiClient from "../sign/service/SignApiClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; // 아이콘 사용을 위해 import

const Navbar = () => {
  const [curUser, setCurUser] = useState('');
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    SignApiClient.signOut().then(
      res => {
        if (res.ok) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('nickname');
          alert("로그아웃 성공");
          handleClose();
          navigate("/");
        } else {
          alert("로그아웃 실패");
          console.log(res);
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
  }

  const goToLogin = () => {
    if (localStorage.getItem('accessToken') != null) {
      alert("이미 로그인되어 있습니다.");
    }
    else {
      navigate("/sign/component/SignInPage");
    }
  }

  const goToSignup = () => {
    if (localStorage.getItem('accessToken') != null) {
      alert("이미 로그인되어 있습니다.");
    }
    else {
      navigate("/sign/component/SignUpPage");
    }
  }

  useEffect(() => {
    setCurUser(localStorage.getItem('nickname'));
    document.body.style.overflow = 'auto';
    document.body.classList.remove('offcanvas-backdrop', 'modal-open');
  }, [handleShow]);

  // 로그인 여부 체크
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid px-3 d-flex align-items-center" style={{ minHeight: "60px" }}>
        {/* 왼쪽: 브랜드 */}
        <div style={{ minWidth: "130px" }}>
          <Link className="navbar-brand mb-0 h1" to="/" style={{ fontWeight: 600 }}>
            Travel React
          </Link>
        </div>
        {/* 가운데: 검색 */}
        <div className="flex-grow-1 d-flex justify-content-center">
          {/* 검색 폼 */}
          <Form className="d-flex  justify-content-center" role="search" style={{ width: '30%' }}>
            <Form.Control
              type="search"
              placeholder="검색"
              className="me-2"
              aria-label="검색"
            />
            <Button
              variant="outline-light btn-sm"
              type="submit"
              style={{ whiteSpace: 'nowrap', padding: '0.2rem 0.35rem' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
            </Button>
          </Form>
        </div>
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
          <div className="d-flex flex-column justify-content-between h-100 my-3">
            {/* 위쪽: 메뉴들 */}
            <div className="d-flex flex-column align-items-stretch gap-2">
              <div className="mb-2">
                <Link
                  className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                  to="/board/list"
                  onClick={handleClose}
                >
                  <i className="bi bi-card-list me-2"></i>게시판
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
                  <div className="mb-2">
                    <Link
                      className="nav-link w-100 fs-5 text-light bg-opacity-75 rounded px-3 py-2"
                      to="/component/admnpage"
                      onClick={handleClose}
                    >
                      <i className="bi bi-gear me-2"></i>관리자 메뉴
                    </Link>
                  </div>
                  <div className="mb-2">
                    <Link
                      className="nav-link w-100 fs-5 text-light                                                                                                                                                                                                                                                                                                                                                                             bg-opacity-75 rounded px-3 py-2"
                      to="/common/MyPage"
                      onClick={handleClose}
                    >
                      <i className="bi bi-person-circle me-2"></i>마이페이지
                    </Link>
                  </div>

                </>
              )}
            </div>
            {/* 아래쪽: AccessToken Test, ID */}
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
  );
};

export default Navbar;

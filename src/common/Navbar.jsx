import { Offcanvas, Button, Form } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import SignApiClient from "../sign/service/SignApiClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

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
      <div className="container-fluid">
        <p>New Test p태그</p>
        <Link className="navbar-brand" to="/">Travel React</Link>
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
        <Button
          variant="dark"
          className="navbar-toggler"
          onClick={handleShow}
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon" />
        </Button>

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
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">

              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/component/admnpage" onClick={handleClose}>관리자 메뉴</Link>
                  </li>
                </>
              )}

              <li className="nav-item">
                <Link className="nav-link" to="/board/list" onClick={handleClose}>게시판</Link>
              </li>
            </ul>
            <div className="d-flex flex-column align-items-center gap-2 my-3">
              {/* 로그인/회원가입: 로그인 안 했을 때만 */}
              {!isLoggedIn && (
                <>
                  <Button variant="primary btn-sm w-50" onClick={() => { goToLogin(); handleClose(); }}>로그인</Button>
                  <Button variant="success btn-sm w-50" onClick={() => { goToSignup(); handleClose(); }}>회원 가입</Button>
                </>
              )}
              <button className="btn btn-warning btn-sm w-50" onClick={handleTest}>AccessToken Test</button>
              {/* 마이페이지/로그아웃: 로그인 했을 때만 */}
              {isLoggedIn && (
                <>
                  <Link to="/common/MyPage" className="btn btn-success btn-sm w-50">마이페이지</Link>
                  <button className="btn btn-outline-danger btn-sm w-50" onClick={handleLogout}>로그아웃</button>
                </>
              )}
              <button className="btn btn-outline-success btn-sm w-50" disabled>ID: {curUser}</button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
};

export default Navbar;

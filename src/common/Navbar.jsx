import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import SignApiClient from "../sign/service/SignApiClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Offcanvas, Button, Form } from 'react-bootstrap';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            data => alert(data)
          )
        }
        else {
          alert("실패");
        }
      }
    )
  }

  const goToLogin = () => {
    if (localStorage.getItem('userID') != null) {
      alert("이미 로그인되어 있습니다.");
    }
    else{
      navigate("/sign/component/SignInPage");
    }
  }

  useEffect(() => {
    setCurUser(localStorage.getItem('userID'));
    document.body.style.overflow = 'auto';
    document.body.classList.remove('offcanvas-backdrop');
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Travel React</Link>

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
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">메뉴</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link className="nav-link" to="/component/admnpage" onClick={handleClose}>관리자 메뉴</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/board/list" onClick={handleClose}>게시판</Link>
              </li>
            </ul>
            <div className="d-flex flex-column align-items-center gap-2 my-3">
              <Button variant="primary" onClick={() => { goToLogin(); handleClose(); }}>로그인</Button>
              <Link to="/sign/component/SignUpPage" className="btn btn-success" onClick={handleClose}>
                Sign up
              </Link>
              <Link to="/board/component/page/BoardDetailPage" className="btn btn-danger" onClick={handleClose}>
                상세보기
              </Link>
              <button className="btn btn-warning" onClick={handleTest}>AccessToken Test</button>
              <button className="btn btn-outline-danger" onClick={handleLogout}>로그아웃</button>
              <button className="btn btn-outline-success" disabled>ID: {curUser}</button>

              {/* 검색 폼 */}
              <Form className="d-flex mt-3 justify-content-center" role="search">
                <Form.Control
                  type="search"
                  placeholder="검색"
                  className="me-2"
                  aria-label="검색"
                />
                <Button
                  variant="outline-light"
                  type="submit"
                  style={{ whiteSpace: 'nowrap', padding: '0.375rem 0.75rem' }}
                >
                  검색
                </Button>
              </Form>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </nav>
  );
};

export default Navbar;

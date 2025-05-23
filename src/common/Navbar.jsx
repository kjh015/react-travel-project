
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SignUpPage from '../sign/component/SignUpPage';
import SignApiClient from "../sign/service/SignApiClient";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [curUser, setCurUser] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoggedIn(true); // 로그인 상태로 변경
  };

  /**
   * 현재 Sign 문제점: 
   * - 로그인 실패해도 성공뜸 (백에서 member null로 처리되어 오류) -> member null(ID없음) or password fail(비번틀림) 시 프론트로 오류 보내기
   * - 현재 accessToken 없어도 로그아웃 버튼 클릭 가능 & 로그아웃 성공 알람 출력
   *    -> 로그인된 상태면 로그인&회원가입 접근 거부 되도록 / 로그인 안된 상태면 로그아웃 접근 거부되도록
   * - 로그인 안된 상태로 요청보내면 만료 메시지 나옴 
   *    -> refreshToken이 아예 없으면 "로그인 필요" 알람 출력 / refreshToken이 만료된 것이면 "재로그인" 알람 출력
   * - 회원탈퇴 기능 구현 필요
   *
   * 
   * 
   * 
   */
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
      return payload.sub || payload.loginId; // JWT 구조에 따라 다름
    } catch (e) {
      console.error("토큰 디코딩 실패:", e);
      return null;
    }
  }
  useEffect(() => {
    setCurUser(getUserIdFromToken());
  }, []);

  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Travel React</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar"
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
            </ul>
            <div className="d-flex flex-column align-items-center gap-2 my-3">
              <Link to={"/sign/component/SignInPage"} className="btn btn-primary"> 로그인 </Link>


              {/* 추가 버튼들 */}
              <Link to="/sign/component/SignUpPage" className="btn btn-success">
                Sign up
              </Link>
              <Link to="/board/component/page/BoardDetailPage" className="btn btn-danger">
                상세보기
              </Link>
              <button class="btn btn-warning" onClick={handleTest}>AccessToken Test</button>
              <button class="btn btn-outline-danger" onClick={handleLogout}>로그아웃</button>
              <button class="btn btn-outline-success">ID: {curUser}</button>


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
      </div>
    </nav>
  );
};

export default Navbar;

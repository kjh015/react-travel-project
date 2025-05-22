import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import SignUpPage from '../sign/component/SignUpPage';
import SignApiClient from "../sign/service/SignApiClient";

//네비게이션 바 파일
const Navbar = () => {
  const [id, setid] = useState('');
  const [password, setPassword] = useState('');
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
        else{
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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item"><a className="nav-link" href="/component/admnpage">관리자 페이지</a></li>
            <li className="nav-item"><a className="nav-link" href="/board/returnboard">게시판</a></li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {!isLoggedIn ? (
              // 로그인 버튼: 상태 변경만 수행
              <Link to={"/sign/component/SignInPage"} className="btn btn-primary"> 로그인 </Link>

            ) : (
              // 로그인 상태: 드롭다운 메뉴
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  UserName
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/component/mypage">마이페이지</a></li>
                  <li><button onClick={handleLogout} className="dropdown-item">로그아웃</button></li>
                  <li><a className="dropdown-item" href="#">기타</a></li>
                </ul>
              </div>
            )}

            {/* 추가 버튼들 */}
            <Link to="/sign/component/SignUpPage" className="btn btn-success">
              Sign up
            </Link>
            <Link to="/board/component/page/BoardDetailPage" className="btn btn-danger">
              상세보기
            </Link>
            <button onClick={handleTest}>AccessToken Test</button>
            <button onClick={handleLogout}>로그아웃</button>
            <button>ID: {curUser}</button>

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
  );
};

export default Navbar;

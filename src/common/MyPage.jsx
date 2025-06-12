import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import SignApiClient from '../sign/service/SignApiClient';

// 프로필 이미지 예시 (실제 사용자 이미지 URL로 대체 가능)
const myPageImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const MyPage = () => {
  const navigate = useNavigate();

  // 회원 탈퇴
  const handleDelete = () => {
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      SignApiClient.withdraw().then(res => {
        res.text().then(message => {
          if (res.ok) {
            localStorage.removeItem('accessToken');
            alert(message);
            window.location.href = '/';
          } else {
            alert(message);
          }
        });
      });
    }
  };

  // 로그아웃
  const handleLogout = () => {
    SignApiClient.signOut().then(res => {
      if (res.ok) {
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        alert("로그아웃 성공");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <div style={{ background: 'linear-gradient(135deg,#eaf4fc 60%,#fff 100%)', minHeight: '100vh' }}>
      {/* 헤더 */}
      <header className="container py-4 mb-3">
        <span className="navbar-brand d-flex align-items-center text-primary fs-3 fw-bold">
          <i className="bi bi-person-circle me-2 fs-2" />
          My Page
        </span>
      </header>

      {/* 메인 카드 */}
      <main>
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '70vh' }}>
          <div className="card shadow rounded-4 p-4" style={{ maxWidth: 460, width: "100%", background: '#ffffffd9', border: 0 }}>
            {/* 프로필 */}
            <div className="d-flex flex-column align-items-center mb-4">
              <img
                src={myPageImage}
                alt="프로필"
                className="rounded-circle shadow"
                style={{ width: 112, height: 112, objectFit: 'cover', background: '#f4f6fa', border: '4px solid #dee7ee' }}
              />
              <div className="mt-3 text-center">
                <h4 className="fw-bold mb-1" style={{ color: "#253e6b" }}>닉네임</h4>
                <span className="badge rounded-pill bg-primary-subtle text-primary">일반 회원</span>
                {/* 필요시 등급/이메일 등 표시 */}
              </div>
            </div>

            {/* 버튼 영역 */}
            <div className="d-flex justify-content-between mb-4">
              <Link to="/sign/update" className="btn btn-outline-primary rounded-pill w-100 me-2">
                <i className="bi bi-pencil-square me-1" /> 정보수정
              </Link>
              <Link to="/board/favorite-list" className="btn btn-outline-danger rounded-pill w-100 mx-2">
                <i className="bi bi-heart-fill me-1" /> 찜목록
              </Link>
              <Link to="/board/component/page/MyPlace" className="btn btn-outline-info rounded-pill w-100 ms-2 text-dark">
                <i className="bi bi-geo-alt-fill me-1" /> 여행지관리
              </Link>
            </div>

            {/* 작성글/댓글 등 추가 메뉴 */}
            <div className="d-flex justify-content-center gap-2 mb-4">
              <Link to="/page/chckmycom" className="btn btn-light border rounded-pill px-3 shadow-sm">
                <i className="bi bi-chat-text me-1" /> 작성 댓글
              </Link>
              {/* <Link ...>작성글</Link> 등 추가 가능 */}
            </div>

            {/* 구분선 */}
            <hr className="my-3" />

            {/* 탈퇴/로그아웃 */}
            <div className="d-flex flex-column gap-2">
              <button className="btn btn-outline-danger rounded-pill" onClick={handleDelete}>
                <i className="bi bi-person-x me-1" /> 회원 탈퇴
              </button>
              <button className="btn btn-outline-secondary rounded-pill" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1" /> 로그아웃
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="text-muted py-4" style={{ backgroundColor: '#d0e9fa' }}>
        <div className="container">
          <p className="float-end mb-1">
            <a href="/">Back to Top</a>
          </p>
          <p className="mb-1">이 사이트는 Bootstrap 기반의 맞춤 페이지입니다.</p>
          <p className="mb-0">더 많은 정보는 <a href="/">홈페이지</a> 참고.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyPage;

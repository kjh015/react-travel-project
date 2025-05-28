import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import SignApiClient from '../sign/service/SignApiClient';

// 기본 이미지 URL
const myPageImage = "#";

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
    <div style={{ backgroundColor: '#eaf4fc', minHeight: '100vh' }}>
      {/* 헤더 */}
      <header className="container d-flex align-items-center py-3">
        <span className="navbar-brand d-flex align-items-center text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-2" viewBox="0 0 24 24">
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <strong>My Page</strong>
        </span>
      </header>

      <main>
        <div className="album py-5">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10">
                <div className="card shadow-sm" style={{ backgroundColor: '#fff', color: '#003e6b' }}>
                  <img
                    src={myPageImage}
                    alt="나의 여행지"
                    className="card-img-top"
                    style={{ width: '100%', height: '320px', objectFit: 'cover', background: '#eee' }}
                  />
                  <div className="card-body">
                    <p className="card-text mb-4">나의 여행지 소개</p>

                    {/* 버튼 3개 1/4씩 가로배치 */}
                    <div className="d-flex justify-content-between gap-2 mb-3">
                      <Link to="/sign/component/SignUpdatePage" className="btn btn-primary rounded-pill px-3 btn-sm w-25 text-truncate">
                        회원 정보 수정
                      </Link>
                      <Link to="/board/component/page/LikeListPage" className="btn btn-danger rounded-pill px-3 btn-sm w-25 text-truncate">
                        찜목록
                      </Link>
                      <Link to="/board/component/page/MyPlace" className="btn btn-info text-white rounded-pill px-3 btn-sm w-25 text-truncate">
                        나의 여행지 관리
                      </Link>
                    </div>

                    {/* 작성글/댓글 */}
                    <div className="mb-4 d-flex justify-content-center gap-2">
                      <Link to="/page/checkmyart" className="btn btn-outline-secondary btn-sm">
                        작성 글
                      </Link>
                      <Link to="/page/chckmycom" className="btn btn-outline-secondary btn-sm">
                        작성 댓글
                      </Link>
                    </div>

                    {/* 회원 탈퇴 */}
                    <div className="mb-3 text-center">
                      <button className="btn btn-danger btn-sm" onClick={handleDelete}>
                        회원 탈퇴
                      </button>
                    </div>

                    {/* 로그아웃 */}
                    <div className="mb-2 text-center">
                      <button className="btn btn-secondary btn-sm" onClick={handleLogout}>
                        로그아웃
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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

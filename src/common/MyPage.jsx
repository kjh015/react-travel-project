import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';


//mypage파일
const MyPage = () => {
  const navigate = useNavigate();

  const handleDelete = () => {
    const confirmed = window.confirm('정말 탈퇴하시겠습니까?');
    if (confirmed) {
      alert('회원을 탈퇴합니다');
      navigate('/');
    }
  };

  return (
    <div style={{ backgroundColor: '#eaf4fc', minHeight: '100vh' }}>

      <div className="container d-flex justify-content-between align-items-center py-3">
        <a href="#" className="navbar-brand d-flex align-items-center text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
            className="me-2"
            viewBox="0 0 24 24"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
            <circle cx="12" cy="13" r="4"></circle>
          </svg>
          <strong>My Page</strong>
        </a>
      </div>

      <main>
        <div className="album py-5">
          <div className="container">
            <div className="col">
              <div
                className="card shadow-sm"
                style={{ backgroundColor: '#ffffff', color: '#003e6b' }}
              >
                <img
                  src=""
                  alt="나의 여행지"
                  className="card-img-top"
                  style={{ width: '100%', height: '500px', objectFit: 'cover' }}
                />

                <div className="card-body">
                  <p className="card-text">나의 여행지 소개</p>

                  {/* 회원 정보 수정 버튼 */}
                  <div className="mb-3">
                    <Link to="/sign/component/SignUpdatePage" className="btn btn-primary">
                      회원 정보 수정
                    </Link>
                  </div>

                  {/* 작성글 보기 + 댓글 보기 버튼 */}
                  <div className="mb-3 d-flex justify-content-center gap-2">
                    <Link to="/page/checkmyart" className="btn btn-outline-secondary">
                      작성 글
                    </Link>
                    <Link to="/page/chckmycom" className="btn btn-outline-secondary">
                      작성 댓글
                    </Link>
                  </div>

                  {/* 회원 탈퇴 버튼 */}
                  <div className="mb-4">
                    <button className="btn btn-danger" onClick={handleDelete}>
                      회원 탈퇴
                    </button>
                  </div>

                  {/* View / Edit */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-muted py-4" style={{ backgroundColor: '#d0e9fa' }}>
        <div className="container">
          <p className="float-end mb-1">
            <a type="button" href="/">Back to Top</a>
          </p>
          <p className="mb-1">이 사이트는 Bootstrap을 기반으로 사용자 맞춤 제작되었습니다.</p>
          <p className="mb-0">
            더 많은 정보는 <a href="/">홈페이지</a>를 참고하세요.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyPage;

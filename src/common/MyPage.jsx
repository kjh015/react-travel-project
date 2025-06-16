import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate } from 'react-router-dom';
import SignApiClient from '../sign/service/SignApiClient';
import { useEffect, useState } from 'react';
import UserAuthentication from '../sign/service/UserAuthentication';

// 프로필 이미지 예시
const myPageImage = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

const MyPage = () => {
  const [member, setMember] = useState({
    loginId: '',
    email: '',
    nickname: '',
    gender: '',
    roles: [],
    regDate: ''
  });
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [showConfirm, setShowConfirm] = useState(false);

  // Alert 띄우기
  const showAlert = (message, type = "success", delay = 1600, redirect) => {
    setAlert({ show: true, message, type });
    setTimeout(() => {
      setAlert({ show: false, message: '', type: '' });
      if (redirect) redirect();
    }, delay);
  };

  // 회원 탈퇴 (모달에서 OK 클릭 시)
  const handleDelete = () => {
    setShowConfirm(false);
    SignApiClient.withdraw().then(res => {
      res.text().then(message => {
        if (res.ok) {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('nickname');
          showAlert(message, "success", 1200, () => window.location.href = '/');
        } else {
          showAlert(message, "danger");
        }
      });
    });
  };
  const getMember = () => {
    SignApiClient.getMemberDetail({ loginId: UserAuthentication.getLoginIdFromToken() })
      .then(res => {
        if (res.ok) {
          res.json().then(data => {
            setMember(data);
          });
        }
        else {
          alert("회원 정보 조회 실패");
        }
      })
  }

  // 로그아웃
  const handleLogout = () => {
    SignApiClient.signOut().then(res => {
      if (res.ok) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('nickname');
        showAlert("로그아웃 성공", "success", 1000, () => window.location.href = '/');
      } else {
        showAlert("로그아웃 실패", "danger");
      }
    });
  };
  useEffect(() => {
    getMember();
  }, []);

  return (
    <div style={{ background: 'linear-gradient(135deg,#eaf4fc 60%,#fff 100%)', minHeight: '100vh' }}>
      {/* Bootstrap Alert */}
      {alert.show && (
        <div className={`alert alert-${alert.type} text-center`}
          style={{
            position: "fixed",
            top: 60, left: "50%", transform: "translateX(-50%)",
            minWidth: 200, zIndex: 2000
          }}
          role="alert"
        >
          {alert.message}
        </div>
      )}

      {/* Confirm Modal */}
      {showConfirm && (
        <div className="modal show fade d-block" tabIndex={-1} style={{ background: 'rgba(0,0,0,0.28)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">회원 탈퇴</h5>
                <button type="button" className="btn-close" onClick={() => setShowConfirm(false)} />
              </div>
              <div className="modal-body">
                <p>정말 탈퇴하시겠습니까?</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>취소</button>
                <button className="btn btn-danger" onClick={handleDelete}>탈퇴</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 헤더 */}
      <header className="container py-4 mb-3">
        <span className="navbar-brand d-flex align-items-center text-primary fs-3 fw-bold justify-content-center">
          <i className="bi bi-person-circle me-2 fs-2" />
          My Page
        </span>
      </header>

      {/* 메인 카드 */}
      <main>
        <div className="container d-flex justify-content-center align-items-center" >
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

                <h4 className="fw-bold mb-1" style={{ color: "#253e6b" }}>{member.nickname}</h4>
                {member.roles?.includes("ROLE_ADMIN") ?
                  <span className="badge rounded-pill bg-success-subtle text-success">관리자</span>
                  :
                  <span className="badge rounded-pill bg-primary-subtle text-primary">일반 회원</span>
                }
                {/* 필요시 등급/이메일 등 표시 */}
              </div >
            </div >

            {/* 버튼 영역 */}
            < div className="d-flex justify-content-between mb-4" >
              <Link to="/sign/update" className="btn btn-outline-primary rounded-pill w-100 me-2">
                <i className="bi bi-pencil-square me-1" /> 정보수정
              </Link>
              <Link to="/board/favorite-list" className="btn btn-outline-danger rounded-pill w-100 mx-2">
                <i className="bi bi-heart-fill me-1" /> 찜목록
              </Link>
              <Link to="/board/my-article" className="btn btn-outline-info rounded-pill w-100 ms-2 text-dark">
                <i className="bi bi-geo-alt-fill me-1" /> 여행지관리
              </Link>
            </div >

            {/* 작성글/댓글 등 추가 메뉴 */}
            < div className="d-flex justify-content-center gap-2 mb-4" >
              <Link to="/page/chckmycom" className="btn btn-light border rounded-pill px-3 shadow-sm">
                <i className="bi bi-chat-text me-1" /> 작성 댓글
              </Link>
            </div >

            <hr className="my-3" />

            {/* 탈퇴/로그아웃 */}
            <div className="d-flex flex-column gap-2">
              <button className="btn btn-outline-danger rounded-pill" onClick={() => setShowConfirm(true)}>
                <i className="bi bi-person-x me-1" /> 회원 탈퇴
              </button>

            </div>
          </div >
        </div >
      </main >
    </div >
  );
};

export default MyPage;

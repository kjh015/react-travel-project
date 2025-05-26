import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../../../common/Navbar';
import myImage from '../imgs/jeju.jpg';
import WriteComment from '../../../comment/component/WriteComment';
import CommentPage from '../../../comment/component/CommentPage';

// 상세보기 파일
const BoardDetailPage = () => {
  let [like, setLike] = useState(0);

  return (
    <>
      <Navbar />

      {/* 상단 네비 스타일 */}
      <div className="container d-flex justify-content-between align-items-center py-3">
        <a href="#" className="navbar-brand d-flex align-items-center">
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
          <strong>Place</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarHeader"
          aria-controls="navbarHeader"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>

      <main>
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-8"> {/* 카드 크기 조정 */}
                <div className="card shadow-sm border-0" style={{ borderRadius: '24px' }}>
                  {/* 이미지 중앙정렬 + 스타일 */}
                  <img
                    src={myImage}
                    alt="제주도 돌하르방"
                    className="card-img-top mx-auto d-block"
                    style={{
                      width: '70%',
                      height: '400px',
                      objectFit: 'cover',
                      borderRadius: '20px',
                      marginTop: '24px',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.10)'
                    }}
                  />

                  <div className="card-body text-center">
                    <h5 className="card-title mb-3 fw-bold">멋진 제주도 여행기</h5>
                    <p className="card-text">
                      This is a wider card with supporting text below as a natural lead-in to
                      additional content. 😎 제주에서의 멋진 여행이야기와 사진!
                    </p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                        <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                      </div>
                      <small className="text-body-secondary">9 mins ago</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <CommentPage />

      <footer className="text-body-secondary py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a type="button" href="/">Back to Top</a>
          </p>
          <p className="mb-1">Album example is © Bootstrap, customize it as you like!</p>
          <p className="mb-0">
            New to Bootstrap? <a href="/">Visit the homepage</a> or read the{" "}
            <a href="/docs/5.3/getting-started/introduction/">getting started guide</a>.
          </p>
        </div>
      </footer>
    </>
  );
};

export default BoardDetailPage;

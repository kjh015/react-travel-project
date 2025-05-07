import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from './Navbar';
import myImage from './imgs/jeju.jpg';


const Place = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === '' || comment.trim() === '') return;

    const newComment = { name, comment };
    setComments([...comments, newComment]);
    setName('');
    setComment('');
  };

  return (
    
    <>
        <Navbar />

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
            <div className="col">
              <div className="card shadow-sm">
                                  <img
                     src={myImage}
                      alt="제주도 돌하르방"
                      className="card-img-top"
                      style={{ width: '70%', height: '500px', objectFit: 'cover' }}
                    />

                <div className="card-body">
                  <p className="card-text">
                    This is a wider card with supporting text below as a natural lead-in to
                    additional content. 😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎😎 ☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠☠
                  </p>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="btn-group">
                      <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                    </div>
                    <small className="text-body-secondary">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      

          {/* 댓글 작성 폼 */}
          <hr className="my-4" />
          <div className="comment-box mt-5 mx-auto" style={{maxWidth: '600px'}}>
            <h4 className="mb-3">댓글 남기기</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">이름</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="comment" className="form-label">댓글</label>
                <textarea
                  className="form-control"
                  id="comment"
                  rows="3"
                  placeholder="댓글을 입력하세요"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">작성하기</button>
            </form>

            {/* 댓글 목록 */}
            <div className="mt-5">
              <h5>댓글 목록</h5>
              {comments.length === 0 && <p>아직 댓글이 없습니다.</p>}
              <ul className="list-group">
                {comments.map((c, idx) => (
                  <li key={idx} className="list-group-item">
                    <strong>{c.name}</strong>: {c.comment}
                  </li>
                ))}
              </ul>
            </div>
          </div>

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

export default Place;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link } from 'react-router-dom';
import RadioPage from './RegionRadioComp';

//글쓰기 파일

const BoardWritePage = () => {
    return (


        <div className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container mt-5" style={{ maxWidth: '1000px', backgroundColor: '#e7f3fe', padding: '30px', borderRadius: '8px' }}>
                <h1 className="mb-5 text-center">글 작성</h1>

                <div className="row">
                    {/* 제목 */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="writeTitle" className="form-label">제목</label>
                        <input type="text" className="form-control" id="writeTitle" required />
                    </div>

                    {/* 여행지 이름 */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="traName" className="form-label">여행지 이름</label>
                        <input
                            type="text"
                            className="form-control"
                            id="traName"
                            required
                        />
                    </div>

                    {/* 여행지 주소 */}
                    <div className="col-md-6 mb-4">
                        <label htmlFor="traAddr" className="form-label">여행지 주소</label>
                        <input type="text" className="form-control" id="traAddr" required />
                    </div>

                    {/* 카테고리 선택 */}
                    <div className="col-md-6 mb-4">
                        <label className="form-label">카테고리</label>
                        <div className="dropdown">
                            <button
                                className="btn btn-outline-secondary dropdown-toggle w-100"
                                type="button"
                                data-bs-toggle="dropdown"
                            >
                                카테고리 선택
                            </button>
                            <ul className="dropdown-menu w-100">
                                {["축제", "공연", "행사", "체험", "쇼핑", "자연", "역사", "가족", "음식"].map((category, index) => (
                                    <li key={index}>
                                        <a className="dropdown-item" href="#">{category}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 내용 및 옵션 */}
                <div className="row">
                    <div className="col-md-8 mb-4">
                        <label htmlFor="writeArticle" className="form-label">내용</label>
                        <textarea className="form-control" id="writeArticle" rows="10" required></textarea>
                    </div>

                    <div className="col-md-4 mb-4">
                        <label className="form-label">옵션 선택</label>
                        <RadioPage />
                    </div>
                </div>

                {/* 버튼 */}
                <div className="text-end">
                    <Link to="/board/returnboard" className="btn btn-primary px-4">글쓰기</Link>
                </div>
            </div>
        </div>
    );
};

export default BoardWritePage;

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useNavigate } from 'react-router-dom';
import RadioPage from './RegionRadioComp';

import BoardApiClient from '../../service/BoardApiClient';
import { useEffect, useState } from 'react';

const categoryList = [
    "축제", "공연", "행사", "체험", "쇼핑", "자연", "역사", "가족", "음식"
];

const BoardWritePage = () => {
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        title: '',
        content: '',
        memberNickname: 'user01',
        travelPlace: '',
        address: '',
        category: '',
        region: '서울'
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setBoard(prev => ({
            ...prev,
            [id]: value
        }));
    };

    

    const handleCategorySelect = (cat) => {
        setBoard(prev => ({
            ...prev,
            category: cat
        }));
    };

    const handleRegionChange = (regionValue) => {
        setBoard(prev => ({
            ...prev,
            region: regionValue
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);
        setImagePreviews(files.map(file => URL.createObjectURL(file)));
    };

    const handleImageRemove = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
        setImagePreviews(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const formData = new FormData();
        // Object.entries(board).forEach(([key, value]) => {
        //     formData.append(key, value);
        // });
        // images.forEach((file) => {
        //     formData.append('images', file);
        // });
        console.log(board);

        try {
            const response = await BoardApiClient.addBoard(board);
            if (response.ok) {
                alert('글 작성이 완료되었습니다.');
                navigate('/board/list');
            } else {
                alert('글 작성에 실패했습니다.');
            }
        } catch (err) {
            alert('오류가 발생했습니다.');
            console.error(err);
        }
    };

    const handleMember = () => {
        setBoard(prev => ({
            ...prev,
            memberNickname: localStorage.getItem("nickname")
        }));
    };
    useEffect(() => {
        let nickname = localStorage.getItem("nickname");
        setBoard(prev => ({
            ...prev,
            memberNickname: nickname
        }));
    }, []);

    return (
        <div className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <div className="container my-5" style={{ maxWidth: '900px' }}>
                <div className="card shadow-lg border-0 rounded-4 p-4" style={{ background: "#ffffffeb" }}>
                    <h2 className="mb-3 text-center fw-bold" style={{ letterSpacing: '2px' }}>글 작성</h2>
                    <div className="text-secondary text-center mb-4" style={{ fontSize: '1.07rem' }}>
                        여행지, 사진, 지역, 카테고리, 후기를 모두 입력해 주세요!
                    </div>
                    <form onSubmit={handleSubmit}>

                        {/* 제목 단독 줄 */}
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label fw-semibold">제목</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="title"
                                required
                                maxLength={30}
                                placeholder="제목을 입력하세요"
                                value={board.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* 여행지 이름 + 주소 한 줄 */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-5">
                                <label htmlFor="travelPlace" className="form-label fw-semibold">여행지 이름</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="travelPlace"
                                    required
                                    placeholder="예: 남산타워"
                                    value={board.travelPlace}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="col-md-7">
                                <label htmlFor="address" className="form-label fw-semibold">여행지 주소</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="address"
                                    required
                                    placeholder="예: 서울특별시 중구 남산공원길 105"
                                    value={board.address}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        {/* 카테고리/지역 한 줄 */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">카테고리</label>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-outline-primary dropdown-toggle w-100"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                        style={{ fontWeight: '500', fontSize: '1.08rem' }}
                                    >
                                        {board.category || "카테고리 선택"}
                                    </button>
                                    <ul className="dropdown-menu w-100">
                                        {categoryList.map((cat, idx) => (
                                            <li key={idx}>
                                                <button
                                                    className={`dropdown-item${board.category === cat ? ' active' : ''}`}
                                                    type="button"
                                                    onClick={() => handleCategorySelect(cat)}
                                                    style={{ fontWeight: '500' }}
                                                >
                                                    {cat}
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">지역 선택</label>
                                <div className="bg-light rounded-4 p-2 px-3 border">
                                    <RadioPage selectedRegion={board.region} setRegion={handleRegionChange} />
                                </div>
                            </div>
                        </div>

                        {/* 사진 첨부 */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">사진 첨부 <span className="text-secondary" style={{ fontSize: "0.95em" }}>(여러 장 첨부 가능)</span></label>
                            <div className="bg-light rounded-4 p-3 px-4 border">
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={handleImageChange}
                                    className="form-control mb-3"
                                />
                                <div className="d-flex flex-wrap gap-3">
                                    {imagePreviews.map((src, idx) => (
                                        <div key={idx} style={{ position: 'relative' }}>
                                            <img
                                                src={src}
                                                alt={`preview-${idx}`}
                                                style={{
                                                    width: 100,
                                                    height: 100,
                                                    objectFit: 'cover',
                                                    borderRadius: 14,
                                                    border: '1px solid #eee',
                                                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)"
                                                }}
                                            />
                                            <button
                                                type="button"
                                                className="btn btn-danger btn-sm"
                                                style={{
                                                    position: 'absolute', top: 5, right: 5, borderRadius: '50%', padding: '2px 7px', fontSize: "1.05rem"
                                                }}
                                                onClick={() => handleImageRemove(idx)}
                                            >×</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* 내용 */}
                        <div className="mb-4">
                            <label htmlFor="content" className="form-label fw-semibold">후기 / 내용</label>
                            <textarea
                                className="form-control"
                                id="content"
                                rows="7"
                                required
                                maxLength={1000}
                                placeholder="여행지에 대한 후기를 자유롭게 작성해 주세요 :)"
                                value={board.content}
                                onChange={handleChange}
                                style={{ minHeight: 140 }}
                            ></textarea>
                        </div>

                        {/* 버튼 */}
                        <div className="d-flex justify-content-end pt-2">
                            <button
                                type="submit"
                                className="btn btn-primary px-5 py-2 fs-5 fw-bold rounded-pill shadow"
                                style={{ minWidth: 140, letterSpacing: '1px' }}
                            >
                                글쓰기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BoardWritePage;

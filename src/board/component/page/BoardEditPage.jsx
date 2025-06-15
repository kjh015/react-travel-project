import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import RadioPage from './RegionRadioComp';
import { useEffect, useState } from 'react';
import BoardApiClient from '../../service/BoardApiClient';
import CategoryCard from './CategoryCard'; // ← 추가

//글 수정파일
const BoardEditPage = () => {
    const [searchParams] = useSearchParams();
    const no = searchParams.get('no');
    const navigate = useNavigate();
    const [board, setBoard] = useState({
        no: '',
        title: '',
        content: '',
        memberNickname: '',
        travelPlace: '',
        address: '',
        category: '',
        region: '',
        imagePaths: []
    });

    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);

    const viewBoard = () => {
        BoardApiClient.getBoard(no).then(
            res => {
                if (res.ok) {
                    res.json().then(data => {
                        setBoard(data);
                        setImages(data.imagePaths);
                        setImagePreviews(data.imagePaths);
                        
                    });
                } else {
                    console.log('에러');
                }
            }
        )
    }

    const removeBoard = () => {
        BoardApiClient.removeBoard(no).then(
            res => {
                if (res.ok) {
                    alert("삭제 성공");
                    navigate('/board/list');
                } else {
                    alert("삭제 실패");
                }
            }
        )
    }

    useEffect(() => {
        viewBoard();
        let nickname = localStorage.getItem("nickname");
        if (nickname == null) {
            alert("로그인 필요");
            navigate(-1);
        }
        setBoard(prev => ({
            ...prev,
            memberNickname: nickname
        }));

    }, [no]);


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

        // (옵션) 중복 파일 막기: 파일명 기준 예시
        const newFiles = files.filter(f => !images.some(img => img.name === f.name));

        setImages(prev => [...prev, ...newFiles]);
        setImagePreviews(prev => [
            ...prev,
            ...newFiles.map(file => URL.createObjectURL(file))
        ]);
    };

    const handleImageRemove = (idx) => {
        setImages(prev => prev.filter((_, i) => i !== idx));
        setImagePreviews(prev => prev.filter((_, i) => i !== idx));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        const boardBlob = new Blob([JSON.stringify(board)], { type: "application/json" });
        formData.append('board', boardBlob);
        images.forEach((file) => {
            formData.append('images', file);
        });

        try {
            const response = await BoardApiClient.editBoard(formData);
            if (response.ok) {
                alert('글 수정이 완료되었습니다.');
                navigate('/board/list');
            } else {
                alert('글 작성에 실패했습니다.');
            }
        } catch (err) {
            alert('오류가 발생했습니다.');
            console.error(err);
        }
    };

    return (
        <div className="py-5"
            style={{
                minHeight: "100vh",
                width: "100vw",
                overflowX: "hidden",
                position: "relative"
            }}
        >
            <div className="container my-5" style={{ maxWidth: '900px' }}>
                <div className="card shadow-lg border-0 rounded-4 p-4" style={{ background: "#ffffffeb" }}>
                    <h2 className="mb-3 fw-bold" style={{ textAlign: 'center', letterSpacing: '2px' }}>글 수정</h2>
                    <div className="text-secondary text-center mb-4" style={{ fontSize: '1.07rem' }}>
                        여행지, 사진, 지역, 카테고리, 후기를 모두 입력해 주세요!
                    </div>
                    <div className="mb-4 d-flex justify-content-end">
                        <span className="fw-semibold" style={{ fontSize: '1.08rem', color: '#222', marginRight: 6 }}>
                            작성자:
                        </span>
                        <span className="fw-bold" style={{ fontSize: '1.08rem', minWidth: 80, display: 'inline-block' }}>
                            {board.memberNickname || ""}
                        </span>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {/* 제목 */}
                        <div className="mb-4">
                            <label htmlFor="title" className="form-label fw-semibold">제목</label>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                id="title"
                                required
                                maxLength={40}
                                placeholder="제목을 입력하세요"
                                value={board.title}
                                onChange={handleChange}
                            />
                        </div>

                        {/* 여행지 이름 + 주소 */}
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

                        {/* 카테고리/지역 */}
                        <div className="row g-3 mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">카테고리</label>
                                <div className="bg-light rounded-4 p-2 px-3 border">
                                    <CategoryCard
                                        selectedCategory={board.category || ''}
                                        setCategory={handleCategorySelect}
                                    />
                                </div>

                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-semibold">지역 선택</label>
                                <div className="bg-light rounded-4 p-2 px-3 border">
                                    <RadioPage selectedRegion={board.region} setRegion={handleRegionChange} />
                                </div>
                            </div>
                        </div>

                        {/* 사진 첨부, 내용, 버튼 등 이하 동일 */}
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
                                                src={
                                                    src.startsWith('/images/')
                                                        ? `http://localhost:8000/board${src}`
                                                        : src
                                                }
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
                        <div className="d-flex justify-content-between pt-2">
                            <button className="btn btn-danger px-5 py-2 fs-5 fw-bold rounded-pill shadow"
                                type="button"
                                style={{ minWidth: 140, letterSpacing: '1px' }}
                                onClick={removeBoard}>
                                삭제
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary px-5 py-2 fs-5 fw-bold rounded-pill shadow"
                                style={{ minWidth: 140, letterSpacing: '1px' }}
                            >
                                완료
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BoardEditPage;

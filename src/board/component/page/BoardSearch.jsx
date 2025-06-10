import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

// --- 카드형 카테고리 선택 컴포넌트 ---
const CategoryCard = ({ categoryList, selectedList, onSelect }) => (
    <div className="row row-cols-3 g-2">
        {categoryList.map((cat) => {
            const selected = selectedList.includes(cat);
            return (
                <div className="col" key={cat}>
                    <div
                        className={`text-center shadow-sm ${selected ? "border border-primary" : "border-0"}`}
                        onClick={() => onSelect(cat)}
                        style={{
                            borderRadius: "14px",
                            background: selected ? "#e3f2fd" : "white",
                            color: selected ? "#1760c6" : "#7b8da3",
                            fontWeight: selected ? 700 : 500,
                            cursor: "pointer",
                            padding: "12px 0 10px",
                            fontSize: "1.05rem",
                            boxShadow: selected
                                ? "0 3px 16px 0 rgba(30,136,229,0.11)"
                                : "0 1px 6px 0 rgba(90,130,180,0.04)",
                            transition: "all 0.18s"
                        }}
                        tabIndex={0}
                        onKeyPress={e => {
                            if (e.key === "Enter" || e.key === " ") onSelect(cat);
                        }}
                        role="button"
                    >
                        <i
                            className="bi bi-tag-fill me-1"
                            style={{
                                fontSize: "1.05rem",
                                color: selected ? "#1760c6" : "#b0b7be",
                                transition: "color 0.15s"
                            }}
                        />
                        {cat}
                    </div>
                </div>
            );
        })}
    </div>
);

// --- 카드형 지역 선택 컴포넌트 ---
const RegionRadioCard = ({ selectedRegion, setRegion }) => {
    const cities = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기"];
    return (
        <div style={{ minWidth: 230, maxWidth: 330 }}>
            <div className="fw-bold mb-3" style={{ color: "#1e88e5", fontSize: "1.14rem" }}>
                <i className="bi bi-geo-alt-fill me-1" style={{ fontSize: "1.14rem", color: "#1e88e5" }} />
                지역 선택
            </div>
            <div className="row row-cols-3 g-2">
                {cities.map(city => (
                    <div className="col" key={city}>
                        <div
                            className={`text-center shadow-sm ${selectedRegion === city ? "border border-primary" : "border-0"}`}
                            onClick={() => setRegion(city)}
                            style={{
                                borderRadius: "14px",
                                background: selectedRegion === city ? "#e3f2fd" : "white",
                                color: selectedRegion === city ? "#1976d2" : "#7b8da3",
                                fontWeight: selectedRegion === city ? 700 : 500,
                                cursor: "pointer",
                                padding: "10px 0",
                                transition: "all 0.15s"
                            }}
                            tabIndex={0}
                            onKeyPress={e => {
                                if (e.key === "Enter" || e.key === " ") setRegion(city);
                            }}
                            role="button"
                        >
                            
                            {city}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- 메인 검색 컴포넌트 ---
const categoryList = [
    "축제", "공연", "행사", "체험", "쇼핑", "자연", "역사", "가족", "음식"
];

const BoardSearch = () => {
    const [board, setBoard] = useState({
        category: [],
        region: ""
    });
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleCategoryCheck = (cat) => {
        setBoard(prev => {
            const selected = prev.category;
            if (selected.includes(cat)) {
                return { ...prev, category: selected.filter(c => c !== cat) };
            } else {
                return { ...prev, category: [...selected, cat] };
            }
        });
    };

    const handleRegionChange = (region) => {
        setBoard(prev => ({ ...prev, region }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (board.category.length) params.append("category", board.category.join(","));
        if (board.region) params.append("region", board.region);
        if (keyword) params.append("keyword", keyword);
        navigate(`/board/list?${params.toString()}`);
    };

    return (
        <div style={{ marginTop: "90px" }}>
            <Card className="shadow-sm rounded-4 mx-auto" style={{ maxWidth: 700, padding: '32px 36px', background: '#fff' }}>
                <Form className="mb-4" onSubmit={handleSubmit}>
                    {/* 안내문 박스 */}
                    <div className="text-center">
                        <h4 className="card-title mb-2 fw-bold" style={{ fontSize: "1.07rem" }}>
                            여행의 모든 순간, 함께!
                        </h4>
                        여러분의 소중한 여행 경험을 나누고,<br />
                        새로운 인연을 만나보세요.<br />
                        이곳에서 사진, 후기, 꿀팁을 자유롭게 공유할 수 있습니다.
                        <Link to={"/board/list?keyword=전체보기"} className="btn btn-danger">전체 보기</Link>
                    </div>
                    <Row className="g-2 align-items-center">
                        <Col xs={9}>
                            <Form.Control
                                type="search"
                                placeholder="검색어를 입력하세요"
                                value={keyword}
                                aria-label="검색"
                                onChange={e => setKeyword(e.target.value)}
                                style={{ height: "40px" }}
                            />
                        </Col>
                        <Col xs={3}>
                            <Button
                                variant="dark btn-sm"
                                type="submit"
                                style={{
                                    whiteSpace: 'nowrap',
                                    padding: '0.2rem 0.35rem'
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="g-3">
                    <Col md={6}>
                        <label className="form-label fw-semibold">카테고리</label>
                        <CategoryCard
                            categoryList={categoryList}
                            selectedList={board.category}
                            onSelect={handleCategoryCheck}
                        />
                    </Col>
                    <Col md={6}>
                        <label className="form-label fw-semibold">지역</label>
                        <div className="bg-light rounded-4 p-2 px-3 border">
                            <RegionRadioCard selectedRegion={board.region} setRegion={handleRegionChange} />
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default BoardSearch;

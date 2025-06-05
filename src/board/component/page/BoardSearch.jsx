import { useState, useRef, useEffect } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import RadioPage from './RegionRadioComp';

const categoryList = [
    "축제", "공연", "행사", "체험", "쇼핑", "자연", "역사", "가족", "음식"
];

const BoardSearch = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [board, setBoard] = useState({
        category: "",
        region: ""
    });
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCategorySelect = (cat) => {
        setBoard(prev => ({ ...prev, category: cat }));
        setDropdownOpen(false);
    };

    const handleRegionChange = (region) => {
        setBoard(prev => ({ ...prev, region }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (board.category) params.append("category", board.category);
        if (board.region) params.append("region", board.region);
        if (keyword) params.append("keyword", keyword);
        navigate(`/board/list?${params.toString()}`);
    };

    return (
        <div style={{ marginTop: "90px" }}>
            <Card className="shadow-sm rounded-4 mx-auto" style={{ maxWidth: 700, padding: '32px 36px', background: '#fff' }}>
                <Form className="mb-4" onSubmit={handleSubmit}>
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
                                variant="primary"
                                type="submit"
                                className="w-100 d-flex align-items-center justify-content-center"
                                style={{ height: "40px", fontWeight: 500 }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="me-1" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
                                검색
                            </Button>
                        </Col>
                    </Row>
                </Form>
                <Row className="g-3">
                    <Col md={6}>
                        <label className="form-label fw-semibold">카테고리</label>
                        <div className="dropdown w-100" ref={dropdownRef}>
                            <button
                                className="btn btn-outline-primary w-100"
                                type="button"
                                onClick={() => setDropdownOpen(open => !open)}
                                style={{ fontWeight: '500', fontSize: '1.08rem' }}
                            >
                                {board.category || "카테고리 선택"}
                            </button>
                            <ul className={`dropdown-menu w-100${dropdownOpen ? " show" : ""}`}>
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
                    </Col>
                    <Col md={6}>
                        <label className="form-label fw-semibold">지역 선택</label>
                        <div className="bg-light rounded-4 p-2 px-3 border">
                            <RadioPage selectedRegion={board.region} setRegion={handleRegionChange} />
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default BoardSearch;

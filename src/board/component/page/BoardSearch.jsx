import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import RegionRadioComp from "./RegionRadioComp";
import CategoryCard from "./CategoryCard";

const BoardSearch = () => {
    const [board, setBoard] = useState({
        category: "",
        region: ""
    });
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const handleCategoryChange = (category) => {
        setBoard(prev => ({ ...prev, category }));
    };

    const handleRegionChange = (region) => {
        setBoard(prev => ({ ...prev, region }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (board.category.length) params.append("category", board.category);
        if (board.region) params.append("region", board.region);
        if (keyword) params.append("keyword", keyword);
        navigate(`/board/list?${params.toString()}`);
    };

    return (
        <div>
            <Card className="shadow-sm rounded-4 mx-auto" style={{ maxWidth: 700, padding: '32px 36px', background: '#fff' }}>
                <Form className="mb-4" onSubmit={handleSubmit}>
                    {/* 안내문 박스 */}
                    <div className="text-center mb-3">
                        <h4 className="card-title mb-2 fw-bold" style={{ fontSize: "1.07rem" }}>
                            여행의 모든 순간, 함께!
                        </h4>
                    </div>
                    <div className="d-flex" style={{ gap: 8 }}>
                        <Form.Control
                            type="search"
                            placeholder="검색어를 입력하세요"
                            value={keyword}
                            aria-label="검색"
                            onChange={e => setKeyword(e.target.value)}
                            style={{ height: "40px", flexGrow: 1 }}
                        />
                        <Button
                            variant="dark btn-sm"
                            type="submit"
                            style={{
                                whiteSpace: 'nowrap',
                                padding: '0.2rem 0.35rem',
                                height: "40px"
                            }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="mx-3" role="img" viewBox="0 0 24 24"><title>Search</title><circle cx="10.5" cy="10.5" r="7.5"></circle><path d="M21 21l-5.2-5.2"></path></svg>
                        </Button>
                    </div>

                </Form>
                <Row className="g-3">
                    <Col md={6}>
                        <div className="bg-light rounded-4 p-2 px-3 border">
                            <CategoryCard selectedCategory={board.category} setCategory={handleCategoryChange} />
                        </div>

                    </Col>
                    <Col md={6}>
                        <div className="bg-light rounded-4 p-2 px-3 border">
                            <RegionRadioComp selectedRegion={board.region} setRegion={handleRegionChange} />
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    );
};

export default BoardSearch;

import { useState } from "react";
import { Form, Button, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import RegionRadioComp from "./RegionRadioComp";
import CategoryCard from "./CategoryCard";

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
                    <div>
                        <h4 className="card-title mb-2 fw-bold " style={{ fontSize: "1.07rem" }}>
                            여행의 모든 순간, 함께!
                        </h4>
                        여러분의 소중한 여행 경험을 나누고,<br />
                        새로운 인연을 만나보세요.<br />
                        이곳에서 사진, 후기, 꿀팁을 자유롭게 공유할 수 있습니다.
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
                            selectedList={board.category}
                            onSelect={handleCategoryCheck}
                        />
                    </Col>
                    <Col md={6}>
                        <label className="form-label fw-semibold">지역</label>
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

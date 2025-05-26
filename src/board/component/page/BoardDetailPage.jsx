import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSearchParams, Link } from "react-router-dom";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

import { Card, Badge, Carousel } from "react-bootstrap";
import Navbar from "../../../common/Navbar";
import BoardApiClient from "../../service/BoardApiClient";
import CommentPage from "../../../comment/component/CommentPage";

const categoryColors = {
  축제: "danger", 공연: "primary", 행사: "success", 체험: "warning",
  쇼핑: "info", 자연: "success", 역사: "secondary", 가족: "dark", 음식: "warning",
};

const regionColors = {
  서울: "primary", 부산: "info", 제주: "success",
};

const BoardDetailPage = () => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => setLiked(prev => !prev);
  const [searchParams] = useSearchParams();
  const no = searchParams.get('no');
  const [board, setBoard] = useState({
    no: '', title: '', content: '', memberNickname: '',
    travelPlace: '', address: '', category: '', region: '', images: [],
    createdDate: '', modifiedDate: ''
  });

  const formatDate = (isoString) => {
    if (!isoString) return "";
    return isoString.substring(0, 16).replace("T", " ");
  };

  const viewBoard = () => {
    BoardApiClient.getBoard(no).then(
      res => {
        if (res.ok) {
          res.json().then(data => setBoard({ ...data, images: data.images || [] }));
        } else {
          alert('게시글을 불러오지 못했습니다.');
        }
      }
    )
  }

  useEffect(() => {
    viewBoard();
    // eslint-disable-next-line
  }, [no]);

  return (
    <>
      <Navbar />
      <div className="container py-5" style={{ minHeight: "100vh" }}>
        <div className="d-flex justify-content-center" style={{ marginTop: "50px" }}>
          <Link to="/board/list" className="fw-bold text-dark text-decoration-none"
            style={{ fontSize: "2rem", letterSpacing: "1px" }}>
            게시판 목록
          </Link>
        </div>
        {/* 상세 카드 */}
        <Card className="shadow-lg" style={{ maxWidth: "650px", margin: "0 auto", borderRadius: "18px", marginTop: "50px" }}>
          <Card.Body>
            {/* 이미지 캐러셀 */}
            {board.images && board.images.length > 0 && (
              <div className="mb-4">
                <Carousel>
                  {board.images.map((img, idx) => (
                    <Carousel.Item key={idx}>
                      <img
                        src={img}
                        className="d-block w-100"
                        alt={`여행지 이미지${idx + 1}`}
                        style={{ maxHeight: "320px", objectFit: "cover", borderRadius: "12px" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0 fw-bold">{board.title}</h4>
              <Badge bg={categoryColors[board.category] || "secondary"} className="fs-6">
                {board.category}
              </Badge>
            </div>
            <div className="mb-2 text-muted" style={{ fontSize: "0.95rem" }}>
              글 번호: <span className="fw-semibold">{board.no}</span> &nbsp;|&nbsp;
              작성자: <span className="fw-semibold">{board.memberNickname}</span>
            </div>
            <div className="mb-2" style={{ fontSize: "0.92rem", color: "#8b929e" }}>
              <span>{formatDate(board.modifiedDate || board.createdDate)}</span>
            </div>
            <hr />
            <div className="mb-3">
              <span className="fw-semibold"><i className="bi bi-geo-alt-fill"></i> 여행지</span>: {board.travelPlace}
              <br />
              <span className="text-muted" style={{ fontSize: "0.97rem" }}>{board.address}</span>
            </div>
            <div className="mb-3">
              <span className="fw-semibold"><i className="bi bi-map-fill"></i> 지역</span>:&nbsp;
              <Badge bg={regionColors[board.region] || "secondary"}>{board.region}</Badge>
            </div>
            <Card className="mb-3" style={{ background: "#f7fafc", border: "none" }}>
              <Card.Body>
                <div style={{ whiteSpace: "pre-line", fontSize: "1.05rem" }}>
                  {board.content}
                </div>
              </Card.Body>
            </Card>

            {/* 하단 버튼 영역 */}
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-link p-0"
                onClick={handleLike}
                style={{
                  fontSize: "1.7rem",
                  color: liked ? "#e64980" : "#b0b0b0",
                  textDecoration: "none"
                }}
                aria-label={liked ? "찜 취소" : "찜하기"}
              >
                <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}></i>
              </button>
              <Link to={`/board/edit?no=${board.no}`} className="btn btn-sm btn-outline-primary">
                수정
              </Link>
            </div>
          </Card.Body>
        </Card>
        {/* 댓글 영역 */}
        <div className="mt-4" style={{ maxWidth: "650px", margin: "0 auto" }}>
          <CommentPage boardNo={board.no} />
        </div>
      </div>
    </>
  );
};

export default BoardDetailPage;

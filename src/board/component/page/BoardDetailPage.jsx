import React, { useEffect, useRef, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Tooltip, Card, Badge, OverlayTrigger, Carousel } from "react-bootstrap";

import Navbar from "../../../common/Navbar";
import BoardApiClient from "../../service/BoardApiClient";
import { useSearchParams, Link, useNavigate, useLocation } from "react-router-dom";
import CommentPage from "../../../comment/component/CommentPage";
import FavoriteApiClient from "../../service/FavoriteApiClient";

const categoryColors = {
  축제: "danger", 공연: "primary", 행사: "success", 체험: "warning",
  쇼핑: "info", 자연: "success", 역사: "secondary", 가족: "dark", 음식: "warning",
};

const regionColors = {
  서울: "primary", 부산: "info", 제주: "success",
};

const BoardDetailPage = () => {
  const enterTime = useRef(Date.now());
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const no = searchParams.get('no');
  const navigate = useNavigate();
  const [board, setBoard] = useState({
    id: '', title: '', content: '', memberNickname: '',
    travelPlace: '', address: '', category: '', region: '', imagePaths: [],
    createdDate: '', modifiedDate: ''
  });

  const [liked, setLiked] = useState(false);
  const [shared, setShared] = useState(false);
  const handleShare = () => setShared(prev => !prev);

  const handleLike = () => {
    const nickname = localStorage.getItem("nickname");
    const payload = {
      boardId: no,
      memberNickname: nickname
    }
    FavoriteApiClient.toggleFavorite(payload)
      .then(res => res.json()
        .then(data => {
          if (res.ok) {
            setLiked(data);
            if (data) {
              window.dataLayer = window.dataLayer || [];
              window.dataLayer.push({
                event: "travel_favorite_add",
                boardId: no,
              });
              alert("찜 목록에 추가되었습니다.");
            }
            else {
              alert("찜 목록에서 삭제되었습니다.")
            }
          }
          else {
            alert("Error");
          }
        }
        )
      )
  }

  const getLike = () => {
    const nickname = localStorage.getItem("nickname");
    const payload = {
      boardId: no,
      memberNickname: nickname
    }
    FavoriteApiClient.existsFavorite(payload)
      .then(res => res.json()
        .then(data => {
          if (res.ok) {
            setLiked(data);
          }
          else {
            alert("Error");
          }
        }
        )
      )
  }

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
  const goToEdit = () => {
    if (localStorage.getItem('nickname') == board.memberNickname) {
      navigate(`/board/edit?no=${board.id}`);
    }
    else {
      alert("권한이 없습니다.");
    }
  }

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "travel_detail_pageview", boardId: no });
    viewBoard();
    getLike();

    enterTime.current = Date.now();
    // 페이지 진입 시점 기록
    return () => {
      // 페이지를 벗어날 때
      const leaveTime = Date.now();
      const stayDuration = Math.floor((leaveTime - enterTime.current) / 1000); // 초 단위
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "travel_detail_exit",
        boardId: no, // 여행지ID
        staySeconds: stayDuration
      });
    }

  }, [no]);
  const isLoggedIn = !!localStorage.getItem('accessToken');

  return (
    <>
      {/* 하트 hover/active 효과 CSS */}
      <style>
        {`
        .heart-btn {
          font-size: 1.7rem;
          color: #b0b0b0;
          transition: color 0.15s;
        }
        .heart-btn.liked,
        .heart-btn:hover {
          color: #e64980 !important;
        }
        `}
      </style>
      <div
        style={{
          minHeight: "100vh",
          width: "100vw",
          overflowX: "hidden",
          position: "relative"
        }}
      >
        <div className="container py-5 mt-5" style={{ minHeight: "100vh", maxWidth: "1600px" }}>
          {/* 상단 게시판 목록 링크 */}
          <div className="d-flex justify-content-center mb-3">
            <Link to="/board/list" className="fw-bold text-dark text-decoration-none"
              style={{ fontSize: "2rem", letterSpacing: "1px" }}>
              게시판 목록
            </Link>
          </div>

          {/* 카드 전체를 크게, flexbox로 넓게 */}
          <div style={{
            display: "flex",
            gap: "32px",
            width: "95%",
            margin: "0 auto",
            alignItems: "stretch"
          }}>
            {/* 상세 카드 */}
            <Card className="shadow-sm flex-fill"
              style={{
                borderRadius: "18px",
                width: "100%",
                minWidth: "0",
                background: "#fff",
                display: "flex",
                flexDirection: "column"
              }}>
              <Card.Body className="pb-2 pt-4 d-flex flex-column" style={{ flex: 1 }}>
                {/* 이미지 Carousel */}
                {board.imagePaths && board.imagePaths.length > 0 && (
                  <Carousel
                    interval={null}
                    indicators={board.imagePaths.length > 1}
                    style={{
                      maxWidth: 800,
                      margin: "0 auto 24px auto",
                      borderRadius: 16,
                      overflow: "hidden",
                      boxShadow: "0 6px 18px #0001"
                    }}
                  >
                    {board.imagePaths.map(filename => (
                      <Carousel.Item key={filename}>
                        <img
                          src={`http://localhost:8000/board${filename}`}
                          alt="uploaded"
                          style={{
                            width: "100%",
                            height: 400,
                            objectFit: "cover",
                            display: "block",
                            background: "#eee"
                          }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <h4 className="fw-bold mb-1">{board.title}</h4>
                  <Badge bg={categoryColors[board.category] || "secondary"} style={{ fontSize: "1rem" }}>
                    {board.category}
                  </Badge>
                </div>
                <div className="mb-2 text-muted" style={{ fontSize: "0.96rem" }}>
                  {/* 조회수 */}
                  조회수: <span className="fw-semibold">{ }</span> | 작성자: <span className="fw-semibold">{board.memberNickname}</span> |


                </div>



                <hr className="my-2" />
                <div className="mb-2">
                  <span className="fw-semibold"><i className="bi bi-geo-alt-fill"></i> 여행지:</span> {board.travelPlace}
                  <div className="text-muted" style={{ fontSize: "0.97rem" }}>{board.address}</div>
                </div>
                <div className="mb-2 d-flex align-items-center justify-content-between">
                  <div>
                    <span className="fw-semibold"><i className="bi bi-map-fill"></i> 지역:</span>
                    <Badge bg={regionColors[board.region] || "secondary"} className="ms-1">{board.region}</Badge>
                  </div>
                  {isLoggedIn && (
                    <OverlayTrigger placement="top" overlay={<Tooltip id="tooltip-edit">수정하기</Tooltip>}>
                      <Link
                        to={`/board/edit?no=${board.id}`}
                        className="btn btn-outline-primary btn-sm ms-2"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        🖊
                      </Link>
                    </OverlayTrigger>
                  )}
                </div>
                {/* 본문 */}
                <Card className="mb-0" style={{ background: "#f7fafc", border: "none" }}>
                  <Card.Body className="py-2 px-3" style={{ minHeight: "50px", fontSize: "1.08rem" }}>
                    {board.content}
                  </Card.Body>
                </Card>
                {/* 하트/공유 버튼 (맨 하단으로 내리기 위해 mt-auto) */}
                <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
                  {/* 하트버튼 */}
                  <button
                    className={`favorite-btn btn btn-link p-0 heart-btn${liked ? " liked" : ""}`}
                    data-travel="123"
                    onClick={handleLike}
                    style={{ textDecoration: "none" }}
                    aria-label={liked ? "찜 취소" : "찜하기"}
                  >
                    <i className={liked ? "bi bi-heart-fill" : "bi bi-heart"}>

                      {/* 찜개수 */}
                      0 <span className="fw-semibold">{board.liked}</span>
                    </i>
                  </button>




                  {/* 공유버튼 */}
                  <button
                    type="button"
                    className="btn btn-primary px-4"
                    onClick={handleShare}
                  >
                    {shared ? "공유취소" : "공유하기"}
                  </button>
                </div>
              </Card.Body>
            </Card>
            {/* 댓글 카드 */}
            <Card className="shadow-sm flex-fill"
              style={{
                borderRadius: "18px",
                width: "70%",
                minWidth: "0",
                background: "#fff",
                display: "flex",
                flexDirection: "column"
              }}>
              {board.id &&
                <Card.Body className="d-flex flex-column py-4" style={{ flex: 1 }}>
                  <CommentPage no={board.id} isLoggedIn={isLoggedIn} />
                </Card.Body>}
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default BoardDetailPage;

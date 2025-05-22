import React from "react";
import { Link } from "react-router-dom";

const AdmnMenu = () => (
    <div className="d-flex flex-column align-items-start p-3 min-vh-100" style={{ background: "#f8f9fa" }}>
        <h5 className="mb-4 fw-bold">관리자 메뉴</h5>
        <ul className="nav nav-pills flex-column w-100">
            <li className="nav-item mb-2">
                <Link className="nav-link" to="/component/campaignplan">캠페인 기획</Link>
            </li>
            <li className="nav-item mb-2">
                <Link className="nav-link" to="/log/process">프로세스 관리</Link>
            </li>
            <li className="nav-item mb-2">
                <Link className="nav-link" to="/component/admnboard">게시판 관리 페이지</Link>
            </li>
        </ul>
    </div>
);

export default AdmnMenu;

// AdmnMenu.jsx
import React from 'react';

const AdmnMenu = ({ onMenuClick }) => {
    return (
        <div className="list-group">
            <h4>관리자 메뉴</h4>
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('campaign')}>
                캠페인 기획
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('process')}>
                프로세스 관리
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('board')}>
                게시판 관리 페이지
            </button>
        </div>
    );
};

export default AdmnMenu;

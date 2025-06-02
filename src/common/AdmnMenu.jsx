// AdmnMenu.jsx
import React from 'react';

const AdmnMenu = ({ onMenuClick }) => {
    return (
        <div className="list-group text-center" style={{ marginTop: '100px'}}>
            <h4>관리자 메뉴</h4>
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('campaign')}>
                캠페인 기획
            </button>            
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('board')}>
                게시판 관리 페이지
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('process')}>
                프로세스 관리
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('log')}>
                로그 DB
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => onMenuClick('dashboard')}>
                DashBoard
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => window.open('http://localhost:9080')}>
                Matomo
            </button>
            <button className="list-group-item list-group-item-action" onClick={() => window.open('http://localhost:8085')}>
                Kibana
            </button>
            
            
        </div>
    );
};

export default AdmnMenu;

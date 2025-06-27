import React from 'react';
import TopFormatDashboard from './TopFormatDashboard';
import PageVisitStatsDashboard from './PageVisitStatsDashboard';

// 간단한 CSS-in-JS 스타일
const sectionStyle = {
    marginBottom: 48,
    padding: 24,
    borderRadius: 18,
    background: 'white',
    boxShadow: '0 4px 24px rgba(50, 55, 100, 0.12)',
    transition: 'box-shadow 0.3s',
    position: 'relative',
};
const iconStyle = {
    fontSize: 32,
    marginRight: 14,
    verticalAlign: 'middle',
    color: '#448aff'
};
const headlineStyle = {
    display: 'flex',
    alignItems: 'center',
    fontSize: 22,
    fontWeight: 700,
    marginBottom: 18,
    borderBottom: '2px solid #e3e6f2',
    paddingBottom: 8,
    letterSpacing: '-0.5px'
};
const pageStyle = {
    maxWidth: 950,
    margin: '0 auto',
    padding: '36px 12px 80px',
    // background: 'linear-gradient(140deg, #F6FAFF 60%, #E6F0FF 100%) min(100vw,1400px)',
    minHeight: '100vh',
    
};

const Dashboard = () => {
    return (
        <div style={pageStyle} >
            <h2 className="text-center mb-5" style={{ fontWeight: 800, letterSpacing: '-1px', fontSize: 36, color: '#183153' }}>
                주요 데이터 보기
            </h2>
            
            <section style={sectionStyle}>
                <div style={headlineStyle}>
                    <span style={iconStyle}>📈</span> 메인 페이지 방문자 현황 (시간/일/월)
                </div>
                <PageVisitStatsDashboard />
            </section>
            <section style={sectionStyle}>
                <div style={headlineStyle}>
                    <span style={iconStyle}>🏆</span> 포맷별 Top5 인기 차트
                </div>
                <TopFormatDashboard />
            </section>
        </div>
    );
};

export default Dashboard;

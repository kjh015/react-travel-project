// AdmnPage.jsx
import React, { useState } from 'react';
import AdmnMenu from './AdmnMenu';
import CampaignPlan from './CampaignPlan';
import FormatManagement from '../../../log/components/format/FormatManagement';
import ProcessManagement from '../../../log/components/process/ProcessManagement';
import Navbar from '../../../common/Navbar';
import FilterManagement from '../../../log/components/filter/FilterManagement';


import AdmnBoard from './AdmnBoard';

const AdmnPage = () => {
  const [activeMenu, setActiveMenu] = useState('campaign');
  const [processId, setProcessId] = useState('processId');

  // 렌더링할 컴포넌트 결정
  const renderContent = () => {
    switch (activeMenu) {
      case 'campaign':
        return <CampaignPlan />;
      case 'process':
        return <ProcessManagement setPID={setProcessId} onMenuClick={setActiveMenu} />;
      case 'board':
        return <AdmnBoard />;
      case 'format':
        return <FormatManagement processId={processId} onMenuClick={setActiveMenu} />
      case 'filter':
        return <FilterManagement processId={processId} onMenuClick={setActiveMenu} />

      default:
        return <div>선택된 메뉴가 없습니다.</div>;
    }
  };

  const renderProcessId = () => {
    return processId;
  }

  return (
    <div style={{ marginTop: '60px' }} className="container-fluid">
      <Navbar />
      <div className="row">
        {/* 왼쪽: 메뉴 (props로 onMenuClick 전달) */}
        <div className="col-md-3 col-lg-2 p-0 border-end bg-body-tertiary min-vh-100">
          <AdmnMenu onMenuClick={setActiveMenu} />
        </div>

        {/* 오른쪽: 본문 */}
        <div className="col-md-9 col-lg-10 p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdmnPage;

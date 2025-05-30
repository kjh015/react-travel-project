import React, { useEffect, useState } from 'react';
import InputDeduplication from './InputDeduplication';
import DeduplicationApiClient from '../../service/DeduplicationApiClient';
import DetailDeduplication from './DetailDeduplication';

const DeduplicationManagement = ({ processId, onMenuClick }) => {
  const [ddpList, setDdpList] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [showDetail, setShowDetail] = useState(0);


  const getDeduplicationList = () => {
    DeduplicationApiClient.getDeduplicationList(processId)
      .then(res => {
        res.json()
          .then(data => {
            if (res.ok) {
              setDdpList(data);
              console.log(data);
            }
            else {
              alert(data);
            }
          })
      });
  }



  useEffect(() => {
    getDeduplicationList();
  }, [showInput, showDetail]);

  return (
    <div style={{ marginTop: '80px' }}>
      <table>
        <thead>
          <tr>
            <th>이름</th>
            <th>생성 날짜</th>
            <th>수정 날짜</th>
            <th>활성화</th>
          </tr>
        </thead>
        {ddpList.map(ddp => (
          <tbody key={ddp.id}>
            <tr>
              <td>
                <span role="button" onClick={() => setShowDetail(ddp.id)}>
                  {ddp.name}
                </span>
                
              </td>
              <td>{ddp.createdTime}</td>
              <td>{ddp.updatedTime}</td>
              <td>{ddp.active ? "on" : "off"}</td>
            </tr>
            <tr >
              <td colSpan="4">
                {showDetail === ddp.id && <DetailDeduplication processId={processId} id={ddp.id} onClose={() => setShowDetail(0)} />}              
              </td>
              
            </tr>

          </tbody>
        ))}
      </table>

      <button onClick={() => setShowInput(!showInput)}>
        설정 추가
      </button>
      {showInput && <InputDeduplication processId={processId} onClose={() => setShowInput(!showInput)} />}
    </div>
  );
};

export default DeduplicationManagement;

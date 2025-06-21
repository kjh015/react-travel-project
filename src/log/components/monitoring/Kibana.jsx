import React from 'react';

const Kibana = () => {
    return (
        <div style={{
            width: '80vw',
            height: '100vh',
            marginTop: "-75px",
            padding: 0,
            overflow: 'hidden',
        }}>
            <iframe src="http://14.63.178.160:8085/app/dashboards#/view/cda75653-fe83-4bcf-b630-8f11acae0996?embed=false&_g=(refreshInterval:(pause:!t,value:5000),time:(from:now-3h,to:now))&_a=()&show-top-menu=true&show-query-input=true&show-time-filter=true"
                height="100%"
                width="100%"
                style={{
                    border: 'none',
                    width: '80vw',
                    height: '100vh',
                }}
                allowFullScreen
            >
            </iframe>

        </div>

    );
};

export default Kibana;
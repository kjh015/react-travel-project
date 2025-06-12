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
            <iframe
                src="http://localhost:8085/app/dashboards#/view/a3d1aa29-7d0c-46bc-b512-9a0298cd084c?embed=false&_g=(refreshInterval:(pause:!f,value:5000),time:(from:now-3h,to:now))&_a=()&show-top-menu=true&show-query-input=true&show-time-filter=true"
                height="100%"
                width="100%"
                style={{
                    border: 'none',
                    width: '80vw',
                    height: '100vh',                    
                }}
                allowFullScreen>


                </iframe>

        </div>

    );
};

export default Kibana;
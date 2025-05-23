import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const RegionRadioComp = ({ selectedRegion, setRegion }) => {
    const cities = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기"];

    const handleChange = (e) => {
        setRegion(e.target.value);
    };

    return (
        <div
            className="radiopage rounded-4 p-4"
            style={{
                background: "#f4f8fc",
                boxShadow: "0 4px 20px rgba(40,100,200,0.08)",
                minWidth: 220
            }}
        >
            <h5 className="fw-bold mb-3 text-primary" style={{ letterSpacing: '1px' }}>지역 선택</h5>
            <div className="row row-cols-3 g-2">
                {cities.map((city, index) => (
                    <div className="col" key={index}>
                        <input
                            type="radio"
                            className="btn-check"
                            name="radioDefault"
                            id={`radioDefault${index + 1}`}
                            value={city}
                            checked={selectedRegion === city}
                            onChange={handleChange}
                            autoComplete="off"
                        />
                        <label
                            className={`btn w-100 fw-semibold border-0 rounded-3 py-2 px-0 ${selectedRegion === city ? 'btn-primary shadow-sm' : 'btn-outline-primary'}`}
                            htmlFor={`radioDefault${index + 1}`}
                            style={{
                                fontSize: '1.05rem',
                                letterSpacing: '0.5px',
                                transition: 'all 0.18s'
                            }}
                        >
                            {city}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegionRadioComp;

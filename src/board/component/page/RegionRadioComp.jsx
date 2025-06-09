import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css'; // 아이콘 사용

const RegionRadioCard = ({ selectedRegion, setRegion }) => {
    const cities = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기"];

    return (
        <div className="rounded-4 p-4" style={{ background: "#fafdff", minWidth: 230, maxWidth: 330 }}>
            <div className="fw-bold mb-3" style={{ color: "#1e88e5", fontSize: "1.14rem" }}>
                지역 선택
            </div>
            <div className="row row-cols-3 g-3">
                {cities.map(city => (
                    <div className="col" key={city}>
                        <div
                            className={`text-center shadow-sm ${selectedRegion === city ? "border border-primary" : "border-0"}`}
                            onClick={() => setRegion(city)}
                            style={{
                                borderRadius: "14px",
                                background: selectedRegion === city ? "#e3f2fd" : "white",
                                color: "#1976d2",
                                fontWeight: selectedRegion === city ? 700 : 500,
                                cursor: "pointer",
                                padding: "10px 0",
                                transition: "all 0.15s"
                            }}
                        >
                            <i className="bi bi-geo-alt-fill me-1" style={{ fontSize: "1rem" }} />
                            {city}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RegionRadioCard;

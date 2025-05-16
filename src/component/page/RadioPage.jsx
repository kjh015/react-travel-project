import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const RadioPage = () => {
    const cities = ["전체", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", "경기"];
    const [selectedCity, setSelectedCity] = useState("서울"); // 기본값: 서울

    const handleChange = (e) => {
        setSelectedCity(e.target.value);
        console.log("선택한 지역:", e.target.value);
    };

    return (
        <div className="radiopage container mt-4">
            <h3>지역 선택</h3>
            <div style={{ flex: 1, marginTop: '30px', padding: '20px' }}></div>
            <div className="mb-4">
                {cities.map((city, index) => (
                    <div className="form-check" key={index}>
                        <input
                            className="form-check-input"
                            type="radio"
                            name="radioDefault"
                            id={`radioDefault${index + 1}`}
                            value={city}
                            checked={selectedCity === city}
                            onChange={handleChange}
                        />
                        <label className="form-check-label" htmlFor={`radioDefault${index + 1}`}>
                            {city}
                        </label>
                    </div>
                ))}
            </div>


        </div>
    );
};

export default RadioPage;

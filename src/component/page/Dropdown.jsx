import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState } from 'react';

const Dropdown = () => {
    return (
        <div className="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                UserName
            </button>
            <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="#">마이페이지</a></li>
                <button onClick={handleLogout} className="btn btn-warning">로그아웃</button>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
        </div>
    );
}

export default Dropdown;


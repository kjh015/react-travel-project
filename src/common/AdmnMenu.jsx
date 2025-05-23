import { Link } from "react-router-dom";

const AdmnMenu = () => {
    return (
        <div className="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
            <div className="offcanvas-md offcanvas-end bg-body-tertiary" tabIndex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                    <h5 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
                        <span>관리자 메뉴</span>
                    </h5>
                    <ul className="nav flex-column mb-auto">
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/component/campaignplan">
                                캠페인 기획
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/log/process">
                                프로세스 관리
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link d-flex align-items-center gap-2" to="/component/admnboard">
                                게시판 관리 페이지
                            </Link>
                        </li>
                    </ul>
                    <hr className="my-3" />
                    <ul className="nav flex-column mb-auto"></ul>
                </div>
            </div>
        </div>
    );
};

export default AdmnMenu;
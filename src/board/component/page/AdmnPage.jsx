import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Navbar from '../../../common/Navbar';

//관리자 페이지
const AdmnPage = () => {
  return (
    <div>

      <header style={{ marginTop: '80px' }}>        {/* 간격조정 */}
        <Navbar />
      </header>




      <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu" aria-labelledby="sidebarMenuLabel">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">Company name</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">


            <h5 class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-body-secondary text-uppercase">
              <span>관리자 메뉴</span>
              <a class="link-secondary" href="#" aria-label="Add a new report">

              </a>
            </h5>
            <ul class="nav flex-column mb-auto">



              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="/component/campaignplan">

                  캠페인 기획
                </a>
              </li>

              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="/log/process">

                  프로세스 관리
                </a>
              </li>



              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="/log/format?processId=1">

                  데이터 포맷
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="/log/db">

                  로그 DB
                </a>
              </li>



            </ul>

            <hr class="my-3" />

            <ul class="nav flex-column mb-auto">
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="#">

                  Settings
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link d-flex align-items-center gap-2" href="#">

                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>



      <footer className="text-body-secondary py-5">
        <div className="container">
          <p className="float-end mb-1">
            <a type="button" href="/">Back to Top</a>
          </p>
          <p className="mb-1">Album example is © Bootstrap, customize it as you like!</p>
          <p className="mb-0">
            New to Bootstrap? <a href="/">Visit the homepage</a> or read the{" "}
            <a href="/docs/5.3/getting-started/introduction/">getting started guide</a>.
          </p>
        </div>
      </footer>
    </div>

  );
}

export default AdmnPage;
import { BrowserRouter, Routes, Route } from "react-router-dom";

//sign
import SignUpPage from '../sign/component/SignUpPage';
import SignUpdatePage from "../sign/component/SignUpdatePage";
import LogIn from "../notUse/LogIn";
import SignInPage from "../sign/component/SignInPage";

//board
import MainPage from "./MainPage";
import AdmnPage from "./AdmnPage";
import BoardDetailPage from '../board/component/page/BoardDetailPage';
import MyPage from "./MyPage";
import CampaignPlan from "../board/component/page/CampaignPlan";
import BoardWritePage from "../board/component/page/BoardWritePage";
import BoardEditPage from "../board/component/page/BoardEditPage";

import CheckMyArt from "../board/component/page/CheckMyArt";

//comment
import ChckMyCom from '../comment/component/ChckMyCom';

//others
import BoardList from "../board/component/page/BoardList";
import FormatManagement from "../log/components/format/FormatManagement";
import ProcessManagement from "../log/components/process/ProcessManagement";
import FilterManagement from "../log/components/filter/FilterManagement";
import LogManagement from "../log/components/db/LogManagement";
import Navbar from "./Navbar";

const PageRouter = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                {/* common */}
                <Route index path="/" element={<MainPage />}></Route>
                <Route index path="/component/admnpage" element={<AdmnPage />}></Route>
                <Route index path="/component/mypage" element={<MyPage />}></Route>

                {/* board */}
                <Route path="/board/list" element={<BoardList />} />
                <Route path="/board/component/page/BoardDetailPage" element={<BoardDetailPage />} />

                <Route path="/board/write" element={<BoardWritePage />} />
                <Route path="/board/edit" element={<BoardEditPage />} />

                {/* sign */}
                <Route index path="/component/login" element={<LogIn />}></Route>
                <Route path="/sign/component/signupdatepage" element={<SignUpdatePage />} />
                <Route path="/sign/component/SignUpPage" element={<SignUpPage />} />
                <Route path="/sign/component/SignInPage" element={<SignInPage />} />

                {/* log */}
                <Route index path="/log/format" element={<FormatManagement />}></Route>
                <Route index path="/log/process" element={<ProcessManagement />}></Route>
                <Route index path="/log/filter" element={<FilterManagement />}></Route>
                <Route index path="/log/db" element={<LogManagement />}></Route>

                {/* comment */}
                <Route path="page/chckmycom" element={<ChckMyCom />} />


                <Route index path="/component/campaignplan" element={<CampaignPlan />}></Route>


                <Route path="page/checkmyart" element={<CheckMyArt />} />
                <Route path="/mypage" element={<MyPage />} />
            </Routes>
        </BrowserRouter>
    );
};


export default PageRouter;    
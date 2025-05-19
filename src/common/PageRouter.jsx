import { BrowserRouter, Routes, Route } from "react-router-dom";

//sign
import SignUpPage from '../sign/component/SignUpPage';
import SignUpdatePage from "../sign/component/SignUpdatePage";
import LogIn from "../notUse/LogIn";
//sign

//board
import MainPage from '../board/component/page/MainPage';
import AdmnPage from "../board/component/page/AdmnPage";
import BoardDetailPage from '../board/component/page/BoardDetailPage';

import MyPage from "../board/component/page/MyPage";
import CampaignPlan from "../board/component/page/CampaignPlan";
import BoardWritePage from "../board/component/page/BoardWritePage";
import BoardEditPage from "../board/component/page/BoardEditPage";
import DataFormat2 from "../notUse/DataFormat2";
import ProcessAdmn from "../notUse/ProcessAdmn";
import CheckMyArt from "../board/component/page/CheckMyArt";
//board

//comment
import ChckMyCom from '../comment/component/ChckMyCom';
//comment

//others
import SseSubscriber from "../sse/components/SseSubscriber";
import ReturnBoard from "../board/service/BoardList";
import FormatManagement from "../log/components/format/FormatManagement";
import ProcessManagement from "../log/components/process/ProcessManagement";
import FilterManagement from "../log/components/filter/FilterManagement";
//others



const PageRouter = () => {
    return (
        <BrowserRouter>
            <Routes>

                <Route index path="/board/returnboard" element={<ReturnBoard />}        ></Route>
                <Route index path="/service/sse" element={<SseSubscriber />}></Route>
                <Route index path="/log/format" element={<FormatManagement />}></Route>
                <Route index path="/log/process" element={<ProcessManagement />}></Route>
                <Route index path="/log/filter" element={<FilterManagement />}></Route>

                {/* sign */}
                <Route index path="/component/login" element={<LogIn />}></Route>
                <Route path="/sign/component/signupdatepage" element={<SignUpdatePage />} />
                <Route path="/sign/component/SignUpPage" element={<SignUpPage />} />


                {/* //comment */}
                <Route path="page/chckmycom" element={<ChckMyCom />} />


                {/* //board */}
                <Route index path="/component/admnpage" element={<AdmnPage />}></Route>\
                <Route path="/board/boardwritepage" element={<BoardWritePage />} />
                <Route path="/component/page/boardeditpage" element={<BoardEditPage />} />
                <Route index path="/component/mypage" element={<MyPage />}></Route>
                <Route index path="/" element={<MainPage />}></Route>
                <Route path="/board/component/page/BoardDetailPage" element={<BoardDetailPage />} />

                <Route index path="/component/campaignplan" element={<CampaignPlan />}        ></Route>



                <Route path="page/checkmyart" element={<CheckMyArt />} />
            </Routes>
        </BrowserRouter>
    );
};


export default PageRouter;    
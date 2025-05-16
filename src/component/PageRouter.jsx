import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./page/Signup";
import MainPage from "./page/MainPage";
import Place from "./page/Place";
import AdmnPage from "./AdmnPage";
import SseSubscriber from "../sse/components/SseSubscriber";
import MyPage from "./page/MyPage";
import CampaignPlan from "./page/CampaignPlan";
import ReturnBoard from "../board/ReturnBoard";
import ProcessAdmn from "./ProcessAdmn";
import DataFormat2 from "./DataFormat2";
import FormatManagement from "../log/components/format/FormatManagement";
import ProcessManagement from "../log/components/process/ProcessManagement";
import LogIn from "./page/LogIn";
import WritePage from "./page/WritePage";
import Change from "./page/Change";
import SignupChange from "./page/SignupChange";
import ChckMyCom from "./page/ChckMyCom";
import CheckMyArt from "./page/CheckMyArt";


const PageRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path="/" element={<MainPage />}></Route>
                <Route index path="/component/signup" element={<Signup />}></Route>
                <Route index path="/component/place" element={<Place />}></Route>
                <Route index path="/component/admnpage" element={<AdmnPage />}></Route>
                <Route index path="/component/mypage" element={<MyPage />}></Route>
                <Route index path="/component/processadmn" element={<ProcessAdmn />}></Route>
                <Route index path="/component/dataformat2" element={<DataFormat2 />}></Route>
                <Route index path="/component/campaignplan" element={<CampaignPlan />}        ></Route>
                <Route index path="/board/returnboard" element={<ReturnBoard />}        ></Route>
                <Route index path="/service/sse" element={<SseSubscriber />}></Route>
                <Route index path="/log/format" element={<FormatManagement />}></Route>
                <Route index path="/log/process" element={<ProcessManagement />}></Route>
                <Route index path="/component/login" element={<LogIn />}></Route>
                <Route path="/board/write" element={<WritePage />} />
                <Route path="/component/page/change" element={<Change />} />
                <Route path="/page/signupchange" element={<SignupChange />} />
                <Route path="page/chckmycom" element={<ChckMyCom />} />
                <Route path="page/checkmyart" element={<CheckMyArt />} />





            </Routes>
        </BrowserRouter>
    );
};


export default PageRouter;    
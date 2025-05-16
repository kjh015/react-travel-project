import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "./Signup";
import MainPage from "./MainPage";
import Place from "./Place";
import AdmnPage from "./AdmnPage";
import SseSubscriber from "../sse/components/SseSubscriber";
import MyPage from "./MyPage";
import CampaignPlan from "./CampaignPlan";
import ReturnBoard from "../board/ReturnBoard";
import ProcessAdmn from "./ProcessAdmn";
import DataFormat2 from "./DataFormat2";
import FormatManagement from "../log/components/format/FormatManagement";
import ProcessManagement from "../log/components/process/ProcessManagement";
import FilterManagement from "../log/components/filter/FilterManagement";
import ConditionBuilder from "../log/components/filter/ConditionBuilder";


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
                <Route index path="/log/filter" element={<FilterManagement />}></Route>
            </Routes>
        </BrowserRouter>
    );
};


export default PageRouter;

import { BrowserRouter, Routes, Route } from "react-router-dom";


import Signup from "./Signup";
import MainPage from "./MainPage";
import Place from "./Place";
import AdmnPage from "./AdmnPage";
import MyPage from "./MyPage";
import CampaignPlan from "./CampaignPlan"

const PageRouter = () => {
    return (
        <BrowserRouter>
            <Routes>    
                <Route index path="/" element={<MainPage />}></Route>
                <Route index path="/component/signup" element={<Signup />}></Route>
                <Route index path="/component/place" element={<Place />}></Route>
                <Route index path="/component/admnpage" element={<AdmnPage />}></Route>
                <Route index path="/component/mypage" element={<MyPage />}></Route>
                <Route index path="/component/campaignplan" element={<CampaignPlan />}></Route>

            </Routes>
        </BrowserRouter>

        
    );
}

export default PageRouter;


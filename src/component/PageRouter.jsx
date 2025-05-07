import { BrowserRouter, Routes, Route } from "react-router-dom";


import Signup from "./Signup";
import MainPage from "./MainPage";
import Place from "./Place";
import AdmnPage from "./AdmnPage";
import SseSubscriber from "../service/SseSubscriber";


const PageRouter = () => {
    return (
        <BrowserRouter>
            <Routes>    
                <Route index path="/" element={<MainPage />}></Route>
                <Route index path="/component/signup" element={<Signup />}></Route>
                <Route index path="/component/place" element={<Place />}></Route>
                <Route index path="/component/admnpage" element={<AdmnPage />}></Route>
                <Route index path="/service/sse" element={<SseSubscriber />}></Route>

            </Routes>
        </BrowserRouter>

        
    );
}

export default PageRouter;


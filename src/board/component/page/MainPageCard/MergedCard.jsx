import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import MainPageCard from './MainPageCard';
import MainPageCard2 from './MainPageCard2';

const MergedCard = () => {
    return (
        <div className="row justify-content-center align-items-stretch">
            <div className="col-md-6 mb-3">
                <MainPageCard />
            </div>
            <div className="col-md-6 mb-3">
                <MainPageCard2 />
                <MainPageCard2 />
                <MainPageCard2 />
                <MainPageCard2 />
            </div>
        </div>
    );
}

export default MergedCard;

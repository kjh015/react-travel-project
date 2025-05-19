import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import viewImage from '../../imgs/view.jpg';

//MainPage에 있는 사진들어간 카드 부분을 나타낸 파일
const MainPageCard = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className="col">
          <div className="card shadow-sm">
            <img
              src={viewImage}
              alt="view"
              className="card-img-top"
              style={{ width: '70%', height: '500px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <p className="card-text">
                This is a wider card with supporting text below as a natural lead-in to additional content.
                This content is a little bit longer.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-body-secondary">9 mins</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default MainPageCard;

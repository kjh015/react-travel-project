import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import trainImg from '../../imgs/train.jpg';


const MainPageCard2 = () => {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow rounded-4 overflow-hidden">
            <img
              src={trainImg}
              alt="Main visual"
              className="img-fluid"
              style={{ height: '350px', objectFit: 'cover' }}
            />
            <div className="card-body p-4">
              <h5 className="card-title mb-3 fw-semibold">Main Card Title</h5>
              <p className="card-text text-secondary mb-4">

                This is a larger card with more supporting text below. You can expand this content further as needed to fit the design of your main page.
              </p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group gap-2">
                  <button type="button" className="btn btn-primary px-4">View</button>
                  <button type="button" className="btn btn-outline-secondary px-4">Edit</button>
                </div>
                <small className="text-muted">9 minutes ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPageCard2;

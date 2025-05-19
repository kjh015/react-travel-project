import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './board/component/css/App.css';

import PageRouter from './common/PageRouter';

function App() {
  return (
    <div className="App">
      <PageRouter />
    </div>
  );
}

export default App;

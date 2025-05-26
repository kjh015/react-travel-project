import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/index.css';
import Navbar from './common/Navbar';

import PageRouter from './common/PageRouter';
import { useEffect } from 'react';

function App() {
  

  return (
    <div className="App">   
     
      
      <PageRouter />
      
    </div>
  );
}

export default App;

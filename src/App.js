import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './board/component/css/App.css';

import PageRouter from './common/PageRouter';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
        var _mtm = window._mtm = window._mtm || [];
        _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
        (function() {
          var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
          g.async=true; g.src='http://localhost:9090/js/container_hiItR3pN.js'; s.parentNode.insertBefore(g,s);
        })();

  `;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="App">
      <PageRouter />
    </div>
  );
}

export default App;

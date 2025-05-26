import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './css/index.css';


import App from './App';

function insertMatomoScript() {
  if (!document.getElementById('matomo-container-script')) {
    const script = document.createElement('script');
    script.id = 'matomo-container-script';
    script.innerHTML = `
      var _mtm = window._mtm = window._mtm || [];
      _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtm.Start'});
      (function() {
        var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
        g.async=true; g.src='http://localhost:9090/js/container_hiItR3pN.js'; s.parentNode.insertBefore(g,s);
      })();
    `;
    document.body.appendChild(script);
  }
}

// index.js에서 최초 1회만 실행!
insertMatomoScript();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





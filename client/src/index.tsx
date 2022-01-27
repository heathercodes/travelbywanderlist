import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { GlobalProvider } from './provider/GlobalProvider';
import { bodyStyles } from './index.styles';
import App from './App';
// import * as serviceWorker from "./serviceWorker";

render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalProvider>
        <Global styles={bodyStyles} />
        <App />
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();

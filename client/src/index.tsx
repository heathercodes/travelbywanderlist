import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './provider/GlobalProvider';
import App from './App';

import './index.scss';

render(
    <BrowserRouter>
        <GlobalProvider>
            <App />
        </GlobalProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

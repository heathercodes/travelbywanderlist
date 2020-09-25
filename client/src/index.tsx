import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Global } from '@emotion/core';
import { GlobalProvider } from './provider/GlobalProvider';
import { bodyStyles } from './index.styles';
import App from './App';

render(
    <BrowserRouter>
        <GlobalProvider>
            <Global styles={bodyStyles} />
            <App />
        </GlobalProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

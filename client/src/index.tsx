import React from 'react';
import { render } from 'react-dom';
import { Global, css } from '@emotion/core';
import { BrowserRouter } from 'react-router-dom';
import emotionNormalize from 'emotion-normalize';
import App from './App';

const body = css`
    ${emotionNormalize}
    html,
    body {
        font-family: 'Josefin Sans', sans-serif;
        background-color: #f8f4ed;
    }
`;

render(
    <BrowserRouter>
        <Global styles={body} />
        <App />
    </BrowserRouter>,
    document.getElementById('root')
);

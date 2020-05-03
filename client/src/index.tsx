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
        background-color: #F8F4ED;
    }
`;

render(
    <BrowserRouter>
        <Global
            styles={body}
        />
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);

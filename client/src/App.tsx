/** @jsx jsx */
import React, { Fragment, Suspense, lazy } from 'react';
import { Global, css, jsx } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
const Map = lazy(() => import('./map/map'));

const body = css`
    ${emotionNormalize}
    html,
    body {
        font-family: 'Josefin Sans', sans-serif;
        background-color: #F8F4ED;
    }
`;

if (module.hot) {
    module.hot.accept()
}

// import 'mapbox-gl/dist/mapbox-gl.css';

export default function App(): JSX.Element {
    return (
        <Fragment>
            <Global
                styles={body}
            />
            <Suspense fallback={<div>Loading...</div>}>
                <Map />
            </Suspense>
        </Fragment>
    );
}

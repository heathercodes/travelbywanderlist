/** @jsx jsx */
import React, { Fragment } from 'react';
import { Global, css, jsx } from '@emotion/core';
import emotionNormalize from 'emotion-normalize';
import WanderlistMap from './map/map';

const body = css`
    ${emotionNormalize}
    html,
    body {
        font-family: 'Josefin Sans', sans-serif;
        background-color: #F8F4ED;
    }
`;

// import 'mapbox-gl/dist/mapbox-gl.css';

export default function App(): JSX.Element {
    return (
        <Fragment>
            <Global
                styles={body}
            />
            <WanderlistMap />
        </Fragment>
    );
}

/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { Login } from '../features';
import { sectionStyles, headerStyles, subTitleStyles } from './Landing.styles';

export function LandingPage(): React.ReactElement {
    return (
        <section css={sectionStyles}>
            <header css={sectionStyles}>
                <h1 css={headerStyles}>Wanderlist</h1>
                <p css={subTitleStyles}>Welcome to travel, by Wanderlist</p>
            </header>

            <Login />
        </section>
    );
}

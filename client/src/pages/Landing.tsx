/** @jsxImportSource @emotion/react */
import React from 'react';
import { Login } from '../features';
import globe from './globe.gif';
import { sectionStyles, headerStyles, subTitleStyles } from './Landing.styles';

export function LandingPage(): React.ReactElement {
  return (
    <section css={sectionStyles}>
      <header css={sectionStyles}>
        <h1 css={headerStyles}>Wanderlist</h1>
        <img src={globe} alt="" />
        <p css={subTitleStyles}>Plan your trip with Wanderlist</p>
      </header>

      <Login />
    </section>
  );
}

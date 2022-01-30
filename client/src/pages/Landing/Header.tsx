/** @jsxImportSource @emotion/react */
import React from 'react';
import { sectionStyles, headerStyles, subTitleStyles } from './Landing.styles';

export function LandingHeader({ children }: any): React.ReactElement {
  return (
    <section css={sectionStyles}>
      <header css={sectionStyles}>
        <h1 css={headerStyles}>Wanderlist</h1>
        <p css={subTitleStyles}>Plan your trip with Wanderlist</p>
      </header>

      {children}
    </section>
  );
}

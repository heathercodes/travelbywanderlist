import React from 'react';

export function LandingHeader({ children }: any): React.ReactElement {
  return (
    <section className="flex items-center justify-center flex-col h-screen">
      <header className="flex items-center justify-center flex-col mt-32">
        <h1 className="font-display text-9xl font-bold">Wanderlist</h1>
      </header>

      {children}
    </section>
  );
}

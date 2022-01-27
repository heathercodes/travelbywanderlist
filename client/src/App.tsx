import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { InteractiveMap } from './pages/Map';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/map">
        <InteractiveMap />
      </Route>

      <Route path="/">
        <LandingPage />
      </Route>
    </Routes>
  );
}

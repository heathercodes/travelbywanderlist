import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { LandingPage } from './pages/Landing';
import { InteractiveMap } from './pages/Map';

export default function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/map/:id" element={<InteractiveMap />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}

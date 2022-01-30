import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { LandingPage, Login, Register } from './pages/Landing';
import { InteractiveMap } from './pages/Map';

import './App.css';

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }: any) {
  const auth = true;
  return auth ? children : <Navigate to="/login" />;
}

export default function App(): JSX.Element {
  const [token, setToken] = useState(null);

  if (!token) {
    <LandingPage setToken={setToken} />;
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      {/* <Route
        path="/map/:id"
        element={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <PrivateRoute>
            <InteractiveMap />
          </PrivateRoute>
        }
      /> */}
      <Route path="/map/:id" element={<InteractiveMap />} />
    </Routes>
  );
}

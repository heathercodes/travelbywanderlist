import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LandingHeader } from './Header';

export function LandingPage({ setToken }: any) {
  const navigate = useNavigate();

  return (
    <LandingHeader>
      <p className="text-4xl font-thin">Plan your trip with Wanderlist</p>
      <div className="flex justify-center mt-40 w-full">
        <Button onClick={(): void => navigate('/login')}>Login</Button>
        <Button type="primary" onClick={(): void => navigate('/signup')}>
          Sign Up
        </Button>
      </div>
    </LandingHeader>
  );
}

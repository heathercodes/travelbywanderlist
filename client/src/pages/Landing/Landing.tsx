/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LandingHeader } from './Header';
import { inputContainer, buttonContainer } from './Form.styles';

export function LandingPage({ setToken }: any) {
  const navigate = useNavigate();

  return (
    <LandingHeader>
      <div css={[inputContainer, buttonContainer]}>
        <Button onClick={(): void => navigate('/login')}>Login</Button>
        <Button type="primary" onClick={(): void => navigate('/signup')}>
          Sign Up
        </Button>
      </div>
    </LandingHeader>
  );
}

/** @jsxImportSource @emotion/react */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingHeader } from './Header';
import { Button } from '../../blocks';
import { inputContainer, buttonContainer } from './Form.styles';

export function LandingPage({ setToken }: any) {
  const navigate = useNavigate();

  return (
    <LandingHeader>
      <div css={[inputContainer, buttonContainer]}>
        <Button type="button" text="Login" onClick={(): void => navigate('/login')} />
        <Button
          type="button"
          text="Sign up"
          isSecondary
          onClick={(): void => navigate('/signup')}
        />
      </div>
    </LandingHeader>
  );
}

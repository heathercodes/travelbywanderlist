import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from 'antd';
import { LandingHeader } from './Header';
import { ErrorMessage, useErrorHandler } from '../../blocks';
import { GlobalContext } from '../../provider/GlobalProvider';
import { loginUser, validateLoginForm } from '../../utils';

export function Login(): React.ReactElement {
  const [userSettings, setUserSettings] = useState<any>({
    email: '',
    password: '',
  });
  const { error, showError } = useErrorHandler('');
  const {
    updateWanderlist,
    setIsFetching,
    setUser,
    ui: { isFetching },
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const loginHandler = async (): Promise<void> => {
    try {
      setIsFetching(true);

      const data = await loginUser(userSettings);
      setUser(data.user);
      updateWanderlist(data.wanderlist);

      navigate(`/map/${data.wanderlist.id}`);

      setIsFetching(false);
    } catch (err: any) {
      showError(err.message);
      setIsFetching(false);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (validateLoginForm(userSettings, showError)) {
      loginHandler();
    }
  };

  return (
    <LandingHeader>
      <form className="flex justify-center items-center flex-col" name="login">
        <fieldset className="block">
          <Input
            id="wanderlist-email"
            placeholder="Enter your email"
            onChange={(e: any): void => setUserSettings({ email: e.target.value })}
            value={userSettings.email}
          />
          <label className="sr-only" htmlFor="wanderlist-email">
            Enter your email
          </label>

          <Input.Password
            id="wanderlist-password"
            placeholder="Enter your password"
            onChange={(e: any): void => setUserSettings({ password: e.target.value })}
            value={userSettings.password}
          />
          <label className="sr-only" htmlFor="wanderlist-password">
            Enter your password
          </label>
        </fieldset>

        <fieldset className="flex justify-center justify-between mt-40 w-full">
          <Button type="primary" disabled={Boolean(isFetching || error)} onClick={handleSubmit}>
            Submit
          </Button>

          <Button onClick={(): void => navigate('/')}>Back</Button>

          {error && <ErrorMessage errorMessage={error} />}
        </fieldset>
      </form>
    </LandingHeader>
  );
}

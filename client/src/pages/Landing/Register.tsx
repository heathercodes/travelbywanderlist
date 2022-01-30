import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from 'antd';
import { LandingHeader } from './Header';
import { ErrorMessage, useErrorHandler } from '../../blocks';
import { GlobalContext } from '../../provider/GlobalProvider';
import { signupUser, validateLoginForm } from '../../utils';

export function Register(): React.ReactElement {
  const [userSettings, setUserSettings] = useState<any>({
    email: '',
    password: '',
  });

  const { error, showError } = useErrorHandler('');
  const {
    updateWanderlist,
    setIsFetching,
    ui: { isFetching },
    setUser,
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const registerHandler = async (): Promise<void> => {
    try {
      setIsFetching(true);

      const data = await signupUser(userSettings);

      updateWanderlist(data.user.wanderlists);
      setUser(data.user);
      navigate(`/map/${data.user.wanderlists.id}`);

      setIsFetching(false);
    } catch (err: any) {
      showError(err.message);
      setIsFetching(false);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (validateLoginForm(userSettings, showError)) {
      registerHandler();
    }
  };

  return (
    <LandingHeader>
      <form className="flex justify-center items-center flex-col" name="register">
        <fieldset className="block">
          <Input
            id="user-email"
            placeholder="Enter your email"
            onChange={(e: any): void =>
              setUserSettings((prevState: any) => ({ ...prevState, email: e.target.value }))
            }
            value={userSettings.email}
          />
          <label className="sr-only" htmlFor="user-email">
            Enter your email
          </label>

          <Input.Password
            id="user-password"
            placeholder="Enter a password"
            onChange={(e: any): void =>
              setUserSettings((prevState: any) => ({ ...prevState, password: e.target.value }))
            }
            value={userSettings.password}
          />
          <label className="sr-only" htmlFor="user-password">
            Enter a password
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

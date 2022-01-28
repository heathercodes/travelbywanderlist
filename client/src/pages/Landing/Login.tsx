/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingHeader } from './Header';
import { ErrorMessage, useErrorHandler, Button, Input } from '../../blocks';
import { GlobalContext } from '../../provider/GlobalProvider';
import { loginUser, validateLoginForm } from '../../utils';
import { labelStyles, formStyles, inputContainer, buttonContainer } from './Form.styles';

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
      <form css={formStyles} name="login">
        <fieldset css={inputContainer}>
          <Input
            id="wanderlist-email"
            placeholder="Enter email"
            labelIsHidden
            styles={labelStyles}
            labelText="Please enter your email"
            type="text"
            onChange={(e: any): void => setUserSettings({ email: e.target.value })}
            value={userSettings.email}
          />
          <Input
            id="wanderlist-password"
            placeholder="Enter password"
            labelIsHidden
            styles={labelStyles}
            labelText="Please enter your password"
            type="password"
            onChange={(e: any): void => setUserSettings({ password: e.target.value })}
            value={userSettings.password}
          />
        </fieldset>

        <fieldset css={[inputContainer, buttonContainer]}>
          <Button type="button" text="Back" onClick={(): void => navigate('/')} />

          <Button
            type="submit"
            disabled={Boolean(isFetching || error)}
            text="Submit"
            onClick={handleSubmit}
          />

          {error && <ErrorMessage errorMessage={error} />}
        </fieldset>
      </form>
    </LandingHeader>
  );
}

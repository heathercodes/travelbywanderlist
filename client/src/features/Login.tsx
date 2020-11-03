/** @jsx jsx */
import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { jsx } from '@emotion/core';
import { ErrorMessage, useErrorHandler, Button, Input } from '../blocks';
import { GlobalContext } from '../provider/GlobalProvider';
import { post, get } from '../utils/fetch';
import { validateRegisterForm, validateLoginForm } from '../utils/login-validation';
import { labelStyles, formStyles, inputContainer, buttonContainer } from './Login.styles';

export function Login(): React.ReactElement {
  const [wanderlistId, setWanderlistId] = useState('');
  const [wanderlistName, setWanderlistName] = useState('');
  const [openLogin, toggleOpenLogin] = useState(false);
  const [openSignUp, toggleOpenSignUp] = useState(false);
  const { error, showError } = useErrorHandler('');
  const {
    updateWanderlist,
    setIsFetching,
    ui: { isFetching },
  } = useContext(GlobalContext);
  const history = useHistory();

  const registerHandler = async (): Promise<void> => {
    try {
      setIsFetching(true);

      const wanderlist = await post('collection', {
        collection: { name: wanderlistName },
      });
      updateWanderlist(wanderlist.data);

      history.push(`/map/${wanderlistId}`);
      setIsFetching(false);
    } catch (err) {
      showError(err.message);
      setIsFetching(false);
    }
  };

  const loginHandler = async (): Promise<void> => {
    try {
      setIsFetching(true);

      const wanderlist = await get(`collection/${wanderlistId}`);
      updateWanderlist(wanderlist.data);

      history.push(`/map/${wanderlistId}`);

      setIsFetching(false);
    } catch (err) {
      showError(err.message);
      setIsFetching(false);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (wanderlistId && validateLoginForm(wanderlistId, showError)) {
      loginHandler();
      return;
    }

    if (wanderlistName && validateRegisterForm(wanderlistName, showError)) {
      registerHandler();
    }
  };

  return (
    <React.Fragment>
      <form css={formStyles} name="login">
        <div css={inputContainer}>
          {openLogin && !openSignUp && (
            <Input
              id="wanderlist-id"
              placeholder="Enter Wanderlist ID"
              labelIsHidden
              styles={labelStyles}
              labelText="Please enter your Wanderlist ID"
              type="number"
              onChange={(e: any): void => setWanderlistId(e.target.value)}
              value={wanderlistId}
            />
          )}
        </div>

        <div css={inputContainer}>
          {openSignUp && !openLogin && (
            <Input
              id="wanderlist-name"
              placeholder="Enter trip name"
              labelIsHidden
              styles={labelStyles}
              labelText="Enter the name of your next trip"
              type="text"
              onChange={(e: any): void => setWanderlistName(e.target.value)}
              value={wanderlistName}
            />
          )}
        </div>

        <div css={[inputContainer, buttonContainer]}>
          {!openSignUp && !openLogin && (
            <Button type="button" text="Login" onClick={(): void => toggleOpenLogin(true)} />
          )}
          {!openLogin && !openSignUp && (
            <Button
              type="button"
              text="Sign up"
              isSecondary
              onClick={(): void => toggleOpenSignUp(true)}
            />
          )}
        </div>

        <div css={[inputContainer, buttonContainer]}>
          {(openSignUp || openLogin) && (
            <React.Fragment>
              <Button
                type="button"
                text="Back"
                onClick={(): void => {
                  toggleOpenSignUp(false);
                  toggleOpenLogin(false);
                }}
              />

              <Button
                type="submit"
                disabled={Boolean(isFetching || error)}
                text="Submit"
                onClick={handleSubmit}
              />
            </React.Fragment>
          )}

          {error && <ErrorMessage errorMessage={error} />}
        </div>
      </form>
    </React.Fragment>
  );
}

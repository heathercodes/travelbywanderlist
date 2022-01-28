/** @jsxImportSource @emotion/react */
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { LandingHeader } from './Header';
import { ErrorMessage, useErrorHandler, Button, Input } from '../../blocks';
import { GlobalContext } from '../../provider/GlobalProvider';
import { post, validateRegisterForm } from '../../utils';
import { labelStyles, formStyles, inputContainer, buttonContainer } from './Form.styles';

export function Register(): React.ReactElement {
  const [wanderlistName, setWanderlistName] = useState('');

  const { error, showError } = useErrorHandler('');
  const {
    updateWanderlist,
    setIsFetching,
    ui: { isFetching },
  } = useContext(GlobalContext);
  const navigate = useNavigate();

  const registerHandler = async (): Promise<void> => {
    try {
      setIsFetching(true);

      const wanderlist = await post('collection', {
        collection: { name: wanderlistName },
      });
      updateWanderlist(wanderlist.data);

      navigate(`/map/${wanderlist.data.id}`);
      setIsFetching(false);
    } catch (err: any) {
      showError(err.message);
      setIsFetching(false);
    }
  };

  const handleSubmit = (e: any): void => {
    e.preventDefault();

    if (wanderlistName && validateRegisterForm(wanderlistName, showError)) {
      registerHandler();
    }
  };

  return (
    <LandingHeader>
      <form css={formStyles} name="register">
        <fieldset css={inputContainer}>
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

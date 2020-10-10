/** @jsx jsx */
import React from "react";
import { jsx } from "@emotion/core";
import { errorMessageStyles } from "./ErrorMessage.styles";

function ErrorMessage(message: { errorMessage: string }): React.ReactElement {
  return <p css={errorMessageStyles}>{message.errorMessage}</p>;
}

export { ErrorMessage };

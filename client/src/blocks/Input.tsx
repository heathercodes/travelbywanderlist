/* eslint-disable react/button-has-type */
/** @jsxImportSource @emotion/react */
import React from 'react';
import {
  inputStyles,
  labelStyles,
  primaryInputStyles,
  secondaryInputStyles,
  fieldsetStyles,
  accessiblyHiddenStyles,
} from './Input.styles';

interface InputProps {
  labelText?: string;
  labelIsHidden?: boolean;
  id: string;
  type: string;
  value: any;
  disabled?: boolean;
  onChange(val: any): void;
  styles?: any;
  placeholder?: string;
  isSecondary?: boolean;
}

export function Input({
  disabled,
  labelText,
  type,
  id,
  onChange,
  labelIsHidden,
  value,
  styles,
  placeholder,
  isSecondary,
}: InputProps): React.ReactElement {
  const isHidden = labelIsHidden ? accessiblyHiddenStyles : labelStyles;
  const inputClasses = isSecondary ? secondaryInputStyles : primaryInputStyles;

  return (
    <fieldset disabled={disabled} css={[fieldsetStyles, styles]}>
      <label htmlFor={id} css={isHidden}>
        {labelText}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        onChange={onChange}
        css={[inputStyles, inputClasses]}
        value={value}
        placeholder={placeholder}
      />
    </fieldset>
  );
}

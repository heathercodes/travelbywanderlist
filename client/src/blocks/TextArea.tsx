/* eslint-disable react/button-has-type */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import {
  fieldsetStyles,
  accessiblyHiddenStyles,
  labelStyles,
  secondaryTextareaStyles,
  primaryTextareaStyles,
  textareaStyles,
} from './TextArea.styles';

interface TextAreaProps {
  labelText?: string;
  id: string;
  value: any;
  onChange(val: any): void;
  styles?: any;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  labelIsHidden?: boolean;
  isSecondary?: boolean;
}

export function TextArea({
  labelText,
  id,
  value,
  onChange,
  styles,
  placeholder,
  rows,
  disabled,
  labelIsHidden,
  isSecondary,
}: TextAreaProps): React.ReactElement {
  const isHidden = labelIsHidden ? accessiblyHiddenStyles : labelStyles;
  const inputClasses = isSecondary ? secondaryTextareaStyles : primaryTextareaStyles;

  return (
    <fieldset disabled={disabled} css={[fieldsetStyles, styles]}>
      <label htmlFor={id} css={isHidden}>
        {labelText}
      </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        css={[textareaStyles, inputClasses]}
      />
    </fieldset>
  );
}

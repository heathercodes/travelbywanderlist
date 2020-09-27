/* eslint-disable react/button-has-type */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';
import { buttonStyles } from './Button.styles';

interface ButtonProps {
    type: 'button' | 'submit' | 'reset';
    onClick(value?: any): void;
    text: string;
    disabled?: boolean;
    styles?: any;
}

export function Button({ type, text, onClick, disabled, styles }: ButtonProps): React.ReactElement {
    return (
        <button type={type} onClick={onClick} css={[buttonStyles, styles]} disabled={disabled}>
            {text}
        </button>
    );
}

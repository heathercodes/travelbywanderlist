/* eslint-disable react/button-has-type */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

interface InputProps {
    labelText?: string;
    id: string;
    type: string;
    value: any;
    onChange(val: any): void;
    styles?: any;
}

export function Input({
    labelText,
    id,
    type,
    value,
    onChange,
    styles,
}: InputProps): React.ReactElement {
    return (
        <label htmlFor={id} css={styles}>
            {labelText && <span>{labelText}</span>}
            <input id={id} type={type} value={value} onChange={onChange} />
        </label>
    );
}

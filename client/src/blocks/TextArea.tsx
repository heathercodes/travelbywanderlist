/* eslint-disable react/button-has-type */
/** @jsx jsx */
import React from 'react';
import { jsx } from '@emotion/core';

interface TextAreaProps {
    labelText?: string;
    id: string;
    value: any;
    onChange(val: any): void;
    styles?: any;
    placeholder?: string;
    rows?: number;
}

export function TextArea({
    labelText,
    id,
    value,
    onChange,
    styles,
    placeholder,
    rows,
}: TextAreaProps): React.ReactElement {
    return (
        <label htmlFor={id} css={styles}>
            {labelText && <span>{labelText}</span>}
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                rows={rows}
            />
        </label>
    );
}

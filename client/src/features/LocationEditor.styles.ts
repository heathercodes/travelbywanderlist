import { css } from '@emotion/core';

export const editorOverlayStyles = css`
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
`;

export const editorStyles = css`
    position: absolute;
    top: 50%;
    right: 0;
    left: 50%;
    bottom: 0;
    background: white;
    padding: 10px 10px 15px;
    display: grid;
    width: 50%;
    transform: translate(-50%, -50%);
    grid-template-rows: 50% 50%;
`;

export const labelContainerStyles = css`
    display: flex;
    align-items: center;
    flex-direction: column;

    input,
    textarea {
        width: 60%;
    }
`;

export const lowerLabelStyles = css`
    justify-content: flex-start;
`;

export const upperLabelStyles = css`
    justify-content: center;
`;

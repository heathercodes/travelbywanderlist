import React from 'react';

function ErrorMessage(message): React.ReactElement {
    return <p className="errorMessage">{message}</p>;
}

export { ErrorMessage };

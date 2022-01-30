import React from 'react';

function ErrorMessage({ errorMessage }: { errorMessage: string }): React.ReactElement {
  return <p className="mt-10 text-rose-700 text-center">{errorMessage}</p>;
}

export { ErrorMessage };

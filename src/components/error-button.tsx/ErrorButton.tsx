import { useState } from 'react';

const style = {
  padding: '3px 6px',
  height: '50px',
  backgroundColor: 'transparent',
  cursor: 'pointer',
};

function ErrorButton() {
  const [error, setErrror] = useState(false);

  if (error) {
    throw new Error('Oops, there was a problem');
  }
  return (
    <button style={style} onClick={() => setErrror(true)}>
      Throw an Error
    </button>
  );
}

export default ErrorButton;

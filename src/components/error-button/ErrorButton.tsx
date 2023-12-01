import { useState } from 'react';

import styles from './index.module.scss';

function ErrorButton() {
  const [error, setErrror] = useState(false);

  if (error) {
    throw new Error('Oops, there was a problem');
  }
  return (
    <button id={styles.error__btn} onClick={() => setErrror(true)}>
      Throw an Error
    </button>
  );
}

export default ErrorButton;

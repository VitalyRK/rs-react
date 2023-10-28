import { Component } from 'react';
import styles from './index.module.scss';

class Footer extends Component {
  render() {
    return (
      <footer className={styles.footer}>
        <h1 className={styles.footer}>
          “Your path you must decide.” &ndash; Yoda
        </h1>
      </footer>
    );
  }
}

export default Footer;

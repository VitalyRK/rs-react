import { Component } from 'react';

import styles from './index.module.scss';

interface IState {
  error: boolean;
}
class Footer extends Component {
  state: IState = {
    error: false,
  };
  handleTest = () => {
    this.setState({
      error: true,
    });
  };
  render() {
    if (this.state.error) {
      throw new Error('Oops, something went wrong!');
    }
    return (
      <footer className={styles.footer}>
        <button className={styles.footer__btn} onClick={this.handleTest}>
          TestErrorBoundary
        </button>
        <h1 className={styles.footer__title}>
          “Your path you must decide.” &ndash; Yoda
        </h1>
      </footer>
    );
  }
}

export default Footer;

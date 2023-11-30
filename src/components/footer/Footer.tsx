import { NavLink } from 'react-router-dom';

import ErrorButton from '@/components/error-button/ErrorButton';

import GitHubSVG from './GitHubSVG';
import styles from './index.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <NavLink
        className={styles.footer__link__github}
        to={'https://github.com/VitalyRK'}
        target="_blank"
      >
        <GitHubSVG />
        <span>Visit My GitHub</span>
      </NavLink>
      <ErrorButton />
    </footer>
  );
}

export default Footer;

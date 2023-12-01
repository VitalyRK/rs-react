import styles from './index.module.scss';

function ErrorPage() {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Sorry... There was an error </h1>
      <video
        autoPlay={true}
        className={styles.video}
        height="380"
        loop={true}
        muted
        src="/public/pexels.mp4"
      />
      <a className={styles.button} href={'/'}>
        Main Page
      </a>
    </div>
  );
}

export default ErrorPage;

import HashLoader from 'react-spinners/HashLoader';
import styles from '../loading-screen/loading-screen.module.css';

function LoadingScreen(): JSX.Element {

  return (
    <div
      className={styles.container}
    >
      <HashLoader
        color="#4481c3"
        cssOverride={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px'
        }}
        loading
        size={100}
        speedMultiplier={1}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p
        className={styles.text}
      >
        Loading...
      </p>
    </div>
  );
}

export default LoadingScreen;

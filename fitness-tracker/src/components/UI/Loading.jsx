import PropTypes from 'prop-types';
import styles from './Loading.module.css';

const Loading = ({ message = 'Loading...', progress = 64 }) => (
  <div className={styles.loading} role="status" aria-live="polite">
    <div className={styles.spinner} />
    <p>{message}</p>
    <div className={styles.track}>
      <span className={styles.bar} style={{ width: `${Math.min(progress, 100)}%` }} />
    </div>
  </div>
);

Loading.propTypes = {
  message: PropTypes.string,
  progress: PropTypes.number
};

export default Loading;

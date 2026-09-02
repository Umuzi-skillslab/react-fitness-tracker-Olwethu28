import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button.jsx';
import styles from './VideoPlayer.module.css';

const VideoPlayer = ({ src, title = 'Exercise demonstration', poster = '' }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleToggle = async () => {
    if (!videoRef.current || hasError) {
      return;
    }

    if (!isPlaying) {
      await videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <figure className={styles.media}>
      <video
        ref={videoRef}
        controls
        poster={poster}
        className={hasError ? styles.error : ''}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video element.
      </video>
      <figcaption>
        <span>{hasError ? 'Video unavailable' : title}</span>
        <Button size="small" variant={isPlaying ? 'secondary' : 'primary'} onClick={handleToggle} disabled={hasError}>
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
      </figcaption>
      {hasError && <p className={styles.fallback}>Use the written instructions while the video source is unavailable.</p>}
    </figure>
  );
};

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string,
  poster: PropTypes.string
};

export default VideoPlayer;

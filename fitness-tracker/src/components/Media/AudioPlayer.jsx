import { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button.jsx';
import styles from './Media.module.css';

const AudioPlayer = ({ src, title = 'Motivation mix' }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);

  const handleToggle = async () => {
    if (!audioRef.current) {
      return;
    }

    if (!isPlaying) {
      await audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (event) => {
    const nextVolume = Number(event.target.value);
    setVolume(nextVolume);
    if (audioRef.current) {
      audioRef.current.volume = nextVolume;
    }
  };

  return (
    <section className={styles.player} aria-label={title}>
      <div>
        <p className={styles.kicker}>Workout audio</p>
        <h2>{title}</h2>
      </div>
      <audio ref={audioRef} controls src={src} onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)}>
        Your browser does not support the audio element.
      </audio>
      <div className={styles.controls}>
        <Button variant={isPlaying ? 'secondary' : 'primary'} onClick={handleToggle}>
          {isPlaying ? 'Pause audio' : 'Play audio'}
        </Button>
        <label>
          Volume
          <input type="range" min="0" max="1" step="0.1" value={volume} onChange={handleVolumeChange} />
        </label>
      </div>
    </section>
  );
};

AudioPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string
};

export default AudioPlayer;

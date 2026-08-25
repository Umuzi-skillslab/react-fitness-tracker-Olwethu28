import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import Badge from '../UI/Badge.jsx';
import Button from '../UI/Button.jsx';
import Card from '../UI/Card.jsx';
import { weekDays } from '../../utils/storage.js';
import styles from './Exercise.module.css';

const ExerciseCard = ({ exercise, onAddExerciseToDay, defaultDay = 'Monday', isPlanned = false }) => {
  const [selectedDay, setSelectedDay] = useState(defaultDay);
  const [isHovered, setIsHovered] = useState(false);
  const [lastAction, setLastAction] = useState('');
  const navigate = useNavigate();

  const handleMouseEnter = (event) => {
    // Store the hovered exercise name so screen-reader-visible status text reflects the preview action.
    setIsHovered(true);
    setLastAction(`Previewing ${event.currentTarget.dataset.exerciseName}`);
  };

  const handleAddClick = () => {
    onAddExerciseToDay(selectedDay, exercise);
    setLastAction(`Added to ${selectedDay}`);
  };

  return (
    <Card className={styles.card} tone={exercise.category === 'Strength' ? 'primary' : 'accent'}>
      <div
        className={`${styles.imageWrap} ${isHovered ? styles.hovered : ''}`}
        data-exercise-name={exercise.name}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={exercise.image} alt={`${exercise.name} preview`} loading="lazy" />
        {isPlanned ? <span className={styles.plannedFlag}>Planned</span> : null}
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h2>{exercise.name}</h2>
          <Badge label={exercise.difficulty} strong={exercise.difficulty === 'Advanced'} />
        </div>
        <p>{exercise.muscleGroups.join(', ')}</p>
        <div className={styles.badges}>
          <Badge label={exercise.category} />
          <Badge label={`${exercise.duration} min`} tone="default" />
          <Badge label={`${exercise.caloriesBurn} cal`} tone="default" />
        </div>

        <label className={styles.daySelect}>
          Add to day
          <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
            {weekDays.map((day) => (
              <option key={day} value={day}>
                {day}
              </option>
            ))}
          </select>
        </label>

        <div className={styles.actions}>
          <Button variant="ghost" onClick={() => navigate(`/exercises/${exercise.id}`)}>
            Details
          </Button>
          <Button variant={isPlanned ? 'secondary' : 'primary'} onClick={handleAddClick}>
            {isPlanned ? 'Add again' : 'Add'}
          </Button>
        </div>
        {lastAction && <small className={styles.status}>{lastAction}</small>}
      </div>
    </Card>
  );
};

ExerciseCard.propTypes = {
  exercise: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroups: PropTypes.arrayOf(PropTypes.string).isRequired,
    difficulty: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    caloriesBurn: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired
  }).isRequired,
  onAddExerciseToDay: PropTypes.func.isRequired,
  defaultDay: PropTypes.string,
  isPlanned: PropTypes.bool
};

export default ExerciseCard;

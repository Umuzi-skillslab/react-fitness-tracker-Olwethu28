import { useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '../UI/Badge.jsx';
import Button from '../UI/Button.jsx';
import Card from '../UI/Card.jsx';
import styles from './DayCard.module.css';

const DayCard = ({ day, exercises, onRemoveExercise, onPreviewExercise }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const totalMinutes = exercises.reduce((sum, exercise) => sum + exercise.duration, 0);
  const totalCalories = exercises.reduce((sum, exercise) => sum + exercise.caloriesBurn, 0);

  return (
    <Card
      title={day}
      eyebrow={`${exercises.length} planned`}
      tone={exercises.length > 0 ? 'primary' : 'neutral'}
      actions={
        <Button variant="ghost" size="small" onClick={() => setIsExpanded((expanded) => !expanded)}>
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      }
    >
      <div className={styles.metrics}>
        <Badge label={`${totalMinutes} min`} tone="default" />
        <Badge label={`${totalCalories} cal`} tone="default" />
      </div>

      {isExpanded ? (
        exercises.length > 0 ? (
          <ul className={styles.list}>
            {exercises.map((exercise) => (
              <li key={exercise.planItemId} className={styles.item}>
                <button type="button" onClick={() => onPreviewExercise(exercise)} className={styles.itemButton}>
                  <strong>{exercise.name}</strong>
                  <span>{exercise.category} - {exercise.difficulty}</span>
                  {exercise.plannedNote ? <small>{exercise.plannedNote}</small> : null}
                </button>
                <Button variant="danger" size="small" onClick={() => onRemoveExercise(day, exercise.planItemId)}>
                  Remove
                </Button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.empty}>No exercises planned for {day}.</p>
        )
      ) : null}
    </Card>
  );
};

DayCard.propTypes = {
  day: PropTypes.string.isRequired,
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRemoveExercise: PropTypes.func.isRequired,
  onPreviewExercise: PropTypes.func.isRequired
};

export default DayCard;

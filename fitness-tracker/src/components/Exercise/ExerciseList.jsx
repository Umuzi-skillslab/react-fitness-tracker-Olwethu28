import PropTypes from 'prop-types';
import ExerciseCard from './ExerciseCard.jsx';
import Card from '../UI/Card.jsx';
import styles from './Exercise.module.css';

const ExerciseList = ({ exercises, onAddExerciseToDay, plannedExerciseIds = [], emptyMessage = 'No exercises found.' }) => {
  if (exercises.length === 0) {
    return (
      <Card title="No matching exercises" tone="accent">
        <p className={styles.empty}>{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className={styles.grid} aria-live="polite">
      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          exercise={exercise}
          onAddExerciseToDay={onAddExerciseToDay}
          isPlanned={plannedExerciseIds.includes(exercise.id)}
          defaultDay={exercise.category === 'Cardio' ? 'Saturday' : 'Monday'}
        />
      ))}
    </div>
  );
};

ExerciseList.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddExerciseToDay: PropTypes.func.isRequired,
  plannedExerciseIds: PropTypes.arrayOf(PropTypes.string),
  emptyMessage: PropTypes.string
};

export default ExerciseList;

import PropTypes from 'prop-types';
import WorkoutLog from '../components/WorkoutLog/WorkoutLog.jsx';
import Header from '../components/common/Header.jsx';
import { calculateLoggedCalories } from '../utils/storage.js';

const HistoryPage = ({ exercises, workoutHistory, onAddWorkoutLog, onDeleteWorkoutLog }) => (
  <>
    <Header
      eyebrow="Workout history"
      title="Log completed training"
      description="Capture sets, reps, weight, notes, and dates so completed work can feed your progress dashboard."
      stats={[
        { label: 'Logged workouts', value: workoutHistory.length },
        { label: 'Calories tracked', value: calculateLoggedCalories(workoutHistory, exercises) },
        { label: 'Exercise options', value: exercises.length }
      ]}
    />
    <WorkoutLog
      exercises={exercises}
      workoutHistory={workoutHistory}
      onAddWorkoutLog={onAddWorkoutLog}
      onDeleteWorkoutLog={onDeleteWorkoutLog}
    />
  </>
);

HistoryPage.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddWorkoutLog: PropTypes.func.isRequired,
  onDeleteWorkoutLog: PropTypes.func.isRequired
};

export default HistoryPage;

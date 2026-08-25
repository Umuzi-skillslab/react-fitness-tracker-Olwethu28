import PropTypes from 'prop-types';
import ProgressChart from '../components/WorkoutLog/ProgressChart.jsx';
import Header from '../components/common/Header.jsx';
import { calculateLoggedCalories, calculateWorkoutStreak, countPlannedExercises } from '../utils/storage.js';

const ProgressPage = ({ exercises, workoutHistory, workoutPlan }) => (
  <>
    <Header
      eyebrow="Progress dashboard"
      title="Track your fitness journey"
      description="See completed workout volume, plan coverage, estimated calories, streaks, and category balance."
      stats={[
        { label: 'Workouts', value: workoutHistory.length },
        { label: 'Planned', value: countPlannedExercises(workoutPlan) },
        { label: 'Streak', value: calculateWorkoutStreak(workoutHistory) },
        { label: 'Calories', value: calculateLoggedCalories(workoutHistory, exercises) }
      ]}
    />
    <ProgressChart workoutHistory={workoutHistory} workoutPlan={workoutPlan} exercises={exercises} />
  </>
);

ProgressPage.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutPlan: PropTypes.objectOf(PropTypes.array).isRequired
};

export default ProgressPage;

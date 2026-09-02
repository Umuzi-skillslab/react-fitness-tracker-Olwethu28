import PropTypes from 'prop-types';
import Badge from '../UI/Badge.jsx';
import Card from '../UI/Card.jsx';
import {
  calculateLoggedCalories,
  calculateWorkoutStreak,
  countPlannedExercises,
  weekDays
} from '../../utils/storage.js';
import styles from './ProgressChart.module.css';

const getRecentDays = () =>
  Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    return date.toISOString().slice(0, 10);
  });

const ProgressChart = ({ workoutHistory, workoutPlan, exercises }) => {
  const totalCalories = calculateLoggedCalories(workoutHistory, exercises);
  const plannedExercises = countPlannedExercises(workoutPlan);
  const streak = calculateWorkoutStreak(workoutHistory);

  // Build a fixed seven-day window so the chart remains stable even with sparse history data.
  const recentDays = getRecentDays().map((date) => ({
    date,
    count: workoutHistory.filter((entry) => entry.date === date).length
  }));

  // Category totals join history with catalog metadata instead of duplicating category on log entries.
  const categoryTotals = ['Strength', 'Cardio', 'Flexibility', 'Balance'].map((category) => ({
    category,
    count: workoutHistory.filter((entry) => exercises.find((exercise) => exercise.id === entry.exerciseId)?.category === category)
      .length
  }));

  // Minimum max values prevent divide-by-zero and keep empty bars at a visible baseline.
  const maxDailyCount = Math.max(...recentDays.map((day) => day.count), 1);
  const maxCategoryCount = Math.max(...categoryTotals.map((item) => item.count), 1);

  if (workoutHistory.length === 0 && plannedExercises === 0) {
    return (
      <Card title="No progress data yet" tone="accent">
        <p className="muted">Plan exercises or log workouts to populate your progress dashboard.</p>
      </Card>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.summary}>
        <Card title="Total workouts" tone="primary">
          <strong className={styles.big}>{workoutHistory.length}</strong>
          <p className="muted">Completed sessions logged</p>
        </Card>
        <Card title="Planned exercises" tone="accent">
          <strong className={styles.big}>{plannedExercises}</strong>
          <p className="muted">Across {weekDays.length} training days</p>
        </Card>
        <Card title="Calories tracked" tone="success">
          <strong className={styles.big}>{totalCalories}</strong>
          <p className="muted">Estimated from logged sets</p>
        </Card>
        <Card title="Workout streak" tone="primary">
          <strong className={styles.big}>{streak}</strong>
          <p className="muted">{streak === 1 ? 'Consecutive day' : 'Consecutive days'}</p>
        </Card>
      </div>

      <Card title="Last seven days" eyebrow="Workout frequency">
        <div className={styles.columns}>
          {recentDays.map((day) => (
            <div className={styles.column} key={day.date}>
              <span className={styles.bar} style={{ height: `${(day.count / maxDailyCount) * 100}%` }}>
                <small>{day.count}</small>
              </span>
              <strong>{new Date(`${day.date}T00:00:00`).toLocaleDateString('en', { weekday: 'short' })}</strong>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Logged category mix" eyebrow="Training distribution">
        <div className={styles.rows}>
          {categoryTotals.map((item) => (
            <div className={styles.row} key={item.category}>
              <Badge label={item.category} />
              <span className={styles.track}>
                <span className={styles.fill} style={{ width: `${(item.count / maxCategoryCount) * 100}%` }} />
              </span>
              <strong>{item.count}</strong>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

ProgressChart.propTypes = {
  workoutHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutPlan: PropTypes.objectOf(PropTypes.array).isRequired,
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ProgressChart;

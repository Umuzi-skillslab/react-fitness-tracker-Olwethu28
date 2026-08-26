import PropTypes from 'prop-types';
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner.jsx';
import Header from '../components/common/Header.jsx';
import { countPlannedExercises, weekDays } from '../utils/storage.js';

const WorkoutPlannerPage = ({ exercises, workoutPlan, onAddExerciseToDay, onRemoveExerciseFromDay }) => {
  const plannedCount = countPlannedExercises(workoutPlan);
  const trainedDays = weekDays.filter((day) => workoutPlan[day].length > 0).length;

  return (
    <>
      <Header
        eyebrow="Weekly workout planner"
        title="Plan a balanced training week"
        description="Assign exercises from Monday to Sunday, preview planned movements, and remove work as your schedule changes."
        stats={[
          { label: 'Exercises planned', value: plannedCount },
          { label: 'Active days', value: trainedDays },
          { label: 'Library size', value: exercises.length }
        ]}
      />
      <WorkoutPlanner
        exercises={exercises}
        workoutPlan={workoutPlan}
        onAddExerciseToDay={onAddExerciseToDay}
        onRemoveExerciseFromDay={onRemoveExerciseFromDay}
      />
    </>
  );
};

WorkoutPlannerPage.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutPlan: PropTypes.objectOf(PropTypes.array).isRequired,
  onAddExerciseToDay: PropTypes.func.isRequired,
  onRemoveExerciseFromDay: PropTypes.func.isRequired
};

export default WorkoutPlannerPage;

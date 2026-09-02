export const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const PLAN_KEY = 'fitnessTracker.workoutPlan';
const HISTORY_KEY = 'fitnessTracker.workoutHistory';

export const createEmptyWeekPlan = () =>
  weekDays.reduce((plan, day) => ({ ...plan, [day]: [] }), {});

const safeParse = (value, fallback) => {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const loadWorkoutPlan = () => {
  const savedPlan = safeParse(window.localStorage.getItem(PLAN_KEY), createEmptyWeekPlan());

  // Merge with a fresh template so corrupted or older saved data cannot remove weekdays.
  return weekDays.reduce(
    (plan, day) => ({
      ...plan,
      [day]: Array.isArray(savedPlan[day]) ? savedPlan[day] : []
    }),
    createEmptyWeekPlan()
  );
};

export const saveWorkoutPlan = (plan) => {
  window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
};

export const loadWorkoutHistory = () => {
  const history = safeParse(window.localStorage.getItem(HISTORY_KEY), []);
  return Array.isArray(history) ? history : [];
};

export const saveWorkoutHistory = (history) => {
  window.localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
};

export const formatDate = (value) =>
  new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value));

export const calculateWorkoutStreak = (history) => {
  const uniqueDays = [...new Set(history.map((entry) => entry.date))]
    .filter(Boolean)
    .sort()
    .reverse();

  if (uniqueDays.length === 0) {
    return 0;
  }

  // Count backwards from the most recent workout so historical demo data still produces a useful streak.
  let streak = 1;
  let previous = new Date(`${uniqueDays[0]}T00:00:00`);

  for (let index = 1; index < uniqueDays.length; index += 1) {
    const current = new Date(`${uniqueDays[index]}T00:00:00`);
    const dayGap = Math.round((previous - current) / (1000 * 60 * 60 * 24));

    if (dayGap === 1) {
      streak += 1;
      previous = current;
    } else if (dayGap > 1) {
      break;
    }
  }

  return streak;
};

export const calculateLoggedCalories = (history, exercises) =>
  history.reduce((total, entry) => {
    const exercise = exercises.find((item) => item.id === entry.exerciseId);
    const setRatio = exercise ? Math.max(Number(entry.sets) || 1, 1) / Math.max(exercise.sets, 1) : 1;

    // The estimate scales a catalog exercise by completed set ratio to keep logging lightweight.
    return total + Math.round((exercise?.caloriesBurn || 0) * setRatio);
  }, 0);

export const countPlannedExercises = (plan) =>
  Object.values(plan).reduce((total, exercisesForDay) => total + exercisesForDay.length, 0);

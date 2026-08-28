import { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navigation/Navbar.jsx';
import Footer from './components/common/Footer.jsx';
import Loading from './components/UI/Loading.jsx';
import { exercises } from './data/exercisesData.js';
import Home from './pages/Home.jsx';
import ExercisesPage from './pages/ExercisesPage.jsx';
import WorkoutPlannerPage from './pages/WorkoutPlannerPage.jsx';
import HistoryPage from './pages/HistoryPage.jsx';
import ProgressPage from './pages/ProgressPage.jsx';
import NotFound from './pages/NotFound.jsx';
import ExerciseDetail from './components/Exercise/ExerciseDetail.jsx';
import {
  createEmptyWeekPlan,
  loadWorkoutHistory,
  loadWorkoutPlan,
  saveWorkoutHistory,
  saveWorkoutPlan
} from './utils/storage.js';

const App = () => {
  const [workoutPlan, setWorkoutPlan] = useState(createEmptyWeekPlan());
  const [workoutHistory, setWorkoutHistory] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Hydrate persisted state once so the first route render reflects saved user work.
    setWorkoutPlan(loadWorkoutPlan());
    setWorkoutHistory(loadWorkoutHistory());
    setIsReady(true);
  }, []);

  useEffect(() => {
    // Gate persistence until hydration completes to avoid overwriting existing localStorage.
    if (isReady) {
      saveWorkoutPlan(workoutPlan);
    }
  }, [isReady, workoutPlan]);

  useEffect(() => {
    // Workout history is stored separately from the plan because it changes through a different workflow.
    if (isReady) {
      saveWorkoutHistory(workoutHistory);
    }
  }, [isReady, workoutHistory]);

  const categoryCounts = useMemo(
    () =>
      // The home page receives aggregate counts instead of recalculating them during every render.
      exercises.reduce(
        (counts, exercise) => ({
          ...counts,
          [exercise.category]: (counts[exercise.category] || 0) + 1
        }),
        {}
      ),
    []
  );

  const handleAddExerciseToDay = (day, exercise, note = '') => {
    // Each planned exercise gets an occurrence id so the same exercise can appear more than once.
    setWorkoutPlan((currentPlan) => ({
      ...currentPlan,
      [day]: [
        ...currentPlan[day],
        {
          ...exercise,
          planItemId: `${exercise.id}-${Date.now()}`,
          plannedNote: note
        }
      ]
    }));
  };

  const handleRemoveExerciseFromDay = (day, planItemId) => {
    setWorkoutPlan((currentPlan) => ({
      ...currentPlan,
      [day]: currentPlan[day].filter((exercise) => exercise.planItemId !== planItemId)
    }));
  };

  const handleAddWorkoutLog = (entry) => {
    // New logs are prepended because the history view defaults to newest-first sorting.
    setWorkoutHistory((history) => [
      {
        ...entry,
        id: `log-${Date.now()}`
      },
      ...history
    ]);
  };

  const handleDeleteWorkoutLog = (id) => {
    setWorkoutHistory((history) => history.filter((entry) => entry.id !== id));
  };

  if (!isReady) {
    return <Loading message="Loading your training workspace..." />;
  }

  return (
    <div className="app-shell">
      <Navbar plannedCount={Object.values(workoutPlan).flat().length} />
      <main className="page-shell">
        <Routes>
          <Route
            path="/"
            element={<Home exercises={exercises} categoryCounts={categoryCounts} workoutHistory={workoutHistory} />}
          />
          <Route
            path="/exercises"
            element={
              <ExercisesPage
                exercises={exercises}
                workoutPlan={workoutPlan}
                onAddExerciseToDay={handleAddExerciseToDay}
              />
            }
          />
          <Route
            path="/exercises/:id"
            element={<ExerciseDetail exercises={exercises} onAddExerciseToDay={handleAddExerciseToDay} />}
          />
          <Route
            path="/workout-planner"
            element={
              <WorkoutPlannerPage
                exercises={exercises}
                workoutPlan={workoutPlan}
                onAddExerciseToDay={handleAddExerciseToDay}
                onRemoveExerciseFromDay={handleRemoveExerciseFromDay}
              />
            }
          />
          <Route
            path="/history"
            element={
              <HistoryPage
                exercises={exercises}
                workoutHistory={workoutHistory}
                onAddWorkoutLog={handleAddWorkoutLog}
                onDeleteWorkoutLog={handleDeleteWorkoutLog}
              />
            }
          />
          <Route
            path="/progress"
            element={<ProgressPage exercises={exercises} workoutHistory={workoutHistory} workoutPlan={workoutPlan} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

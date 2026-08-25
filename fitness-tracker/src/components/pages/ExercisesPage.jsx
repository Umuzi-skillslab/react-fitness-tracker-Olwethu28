import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ExerciseFilter from '../components/Exercise/ExerciseFilter.jsx';
import ExerciseList from '../components/Exercise/ExerciseList.jsx';
import Card from '../components/UI/Card.jsx';
import Loading from '../components/UI/Loading.jsx';
import Header from '../components/common/Header.jsx';
import styles from './pages.module.css';

const defaultFilters = {
  search: '',
  category: 'All',
  muscleGroup: 'All',
  difficulty: 'All'
};

const matchesSearch = (exercise, search) => {
  const query = search.trim().toLowerCase();
  if (!query) {
    return true;
  }

  // Search covers name, category, equipment, difficulty, and muscle groups so one input remains useful.
  return [exercise.name, exercise.category, exercise.equipment, exercise.difficulty, ...exercise.muscleGroups]
    .join(' ')
    .toLowerCase()
    .includes(query);
};

const ExercisesPage = ({ exercises, workoutPlan, onAddExerciseToDay }) => {
  const [filters, setFilters] = useState(defaultFilters);
  const [library, setLibrary] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const timer = window.setTimeout(() => {
      if (!Array.isArray(exercises) || exercises.length === 0) {
        setError('Exercise data could not be loaded.');
        setLibrary([]);
      } else {
        setError('');
        setLibrary(exercises);
      }
      setIsLoading(false);
    }, 90);

    return () => window.clearTimeout(timer);
  }, [exercises]);

  const plannedExerciseIds = useMemo(
    () => [...new Set(Object.values(workoutPlan).flat().map((exercise) => exercise.id))],
    [workoutPlan]
  );

  const filteredExercises = useMemo(
    () =>
      library
        .filter((exercise) => matchesSearch(exercise, filters.search))
        .filter((exercise) => filters.category === 'All' || exercise.category === filters.category)
        .filter((exercise) => filters.muscleGroup === 'All' || exercise.muscleGroups.includes(filters.muscleGroup))
        .filter((exercise) => filters.difficulty === 'All' || exercise.difficulty === filters.difficulty)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [filters, library]
  );

  const handleFilterChange = (name, value) => {
    setFilters((current) => ({ ...current, [name]: value }));
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSubmittedSearch(filters.search.trim());
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setSubmittedSearch('');
  };

  const stats = [
    { label: 'Visible', value: filteredExercises.length },
    { label: 'Planned', value: plannedExerciseIds.length },
    { label: 'Search', value: submittedSearch || 'All' }
  ];

  if (isLoading) {
    return <Loading message="Loading exercise library..." progress={78} />;
  }

  if (error) {
    return (
      <Card title="Exercise library error" tone="accent">
        <p className="muted">{error}</p>
      </Card>
    );
  }

  return (
    <>
      <Header
        eyebrow="Exercise library"
        title="Browse and filter exercises"
        description="Search by movement, category, equipment, muscle group, or difficulty, then add exercises directly to your weekly plan."
        stats={stats}
      />

      <div className={styles.layout}>
        <ExerciseFilter
          filters={filters}
          resultCount={filteredExercises.length}
          onFilterChange={handleFilterChange}
          onSearchSubmit={handleSearchSubmit}
          onResetFilters={resetFilters}
        />
        <ExerciseList
          exercises={filteredExercises}
          onAddExerciseToDay={onAddExerciseToDay}
          plannedExerciseIds={plannedExerciseIds}
          emptyMessage="Try broadening your filters or search terms."
        />
      </div>
    </>
  );
};

ExercisesPage.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutPlan: PropTypes.objectOf(PropTypes.array).isRequired,
  onAddExerciseToDay: PropTypes.func.isRequired
};

export default ExercisesPage;

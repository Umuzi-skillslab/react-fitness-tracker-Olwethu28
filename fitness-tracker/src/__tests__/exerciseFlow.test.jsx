import { describe, expect, it, vi } from 'vitest';
import { Routes, Route } from 'react-router-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ExerciseCard from '../components/Exercise/ExerciseCard.jsx';
import ExerciseDetail from '../components/Exercise/ExerciseDetail.jsx';
import ExerciseFilter from '../components/Exercise/ExerciseFilter.jsx';
import ExerciseList from '../components/Exercise/ExerciseList.jsx';
import ExercisesPage from '../pages/ExercisesPage.jsx';
import { exercises } from '../data/exercisesData.js';
import { createEmptyWeekPlan } from '../utils/storage.js';
import { renderWithRouter } from './testUtils.jsx';

const filters = {
  search: '',
  category: 'All',
  muscleGroup: 'All',
  difficulty: 'All'
};

describe('exercise browsing flow', () => {
  it('passes filter changes up from ExerciseFilter', async () => {
    const user = userEvent.setup();
    const onFilterChange = vi.fn();

    renderWithRouter(
      <ExerciseFilter
        filters={filters}
        resultCount={exercises.length}
        onFilterChange={onFilterChange}
        onSearchSubmit={vi.fn((event) => event.preventDefault())}
        onResetFilters={vi.fn()}
      />
    );

    await user.selectOptions(screen.getByLabelText(/category/i), 'Cardio');

    expect(onFilterChange).toHaveBeenCalledWith('category', 'Cardio');
  });

  it('renders an empty state when ExerciseList has no results', () => {
    renderWithRouter(<ExerciseList exercises={[]} onAddExerciseToDay={vi.fn()} emptyMessage="Nothing matched" />);

    expect(screen.getByText(/no matching exercises/i)).toBeInTheDocument();
    expect(screen.getByText(/nothing matched/i)).toBeInTheDocument();
  });

  it('adds an exercise from a card and navigates to the detail route', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    renderWithRouter(
      <Routes>
        <Route path="/" element={<ExerciseCard exercise={exercises[0]} onAddExerciseToDay={onAdd} />} />
        <Route path="/exercises/:id" element={<p>Detail route rendered</p>} />
      </Routes>
    );

    await user.selectOptions(screen.getByLabelText(/add to day/i), 'Tuesday');
    await user.click(screen.getByRole('button', { name: /^add$/i }));
    await user.click(screen.getByRole('button', { name: /details/i }));

    expect(onAdd).toHaveBeenCalledWith('Tuesday', exercises[0]);
    expect(screen.getByText(/detail route rendered/i)).toBeInTheDocument();
  });

  it('loads exercises asynchronously and filters by search text', async () => {
    const user = userEvent.setup();

    renderWithRouter(
      <ExercisesPage exercises={exercises} workoutPlan={createEmptyWeekPlan()} onAddExerciseToDay={vi.fn()} />
    );

    expect(screen.getByRole('status')).toHaveTextContent(/loading exercise library/i);
    await screen.findByRole('heading', { name: /browse and filter exercises/i });

    await user.type(screen.getByLabelText(/search exercises/i), 'cycling');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => expect(screen.getByRole('heading', { name: /stationary cycling/i })).toBeInTheDocument());
    expect(screen.queryByRole('heading', { name: /^push-up$/i })).not.toBeInTheDocument();
  });

  it('submits the detail page add-to-plan form for a route parameter', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail exercises={exercises} onAddExerciseToDay={onAdd} />} />
      </Routes>,
      { route: '/exercises/push-up' }
    );

    await user.selectOptions(screen.getByLabelText(/day/i), 'Friday');
    await user.type(screen.getByLabelText(/coaching note/i), 'Slow tempo');
    await user.click(screen.getByRole('button', { name: /add to friday/i }));

    expect(onAdd).toHaveBeenCalledWith('Friday', exercises[0], 'Slow tempo');
    expect(screen.getByText(/push-up added to friday/i)).toBeInTheDocument();
  });

  it('handles an invalid exercise detail route', () => {
    renderWithRouter(
      <Routes>
        <Route path="/exercises/:id" element={<ExerciseDetail exercises={exercises} onAddExerciseToDay={vi.fn()} />} />
      </Routes>,
      { route: '/exercises/not-real' }
    );

    expect(screen.getByText(/exercise not found/i)).toBeInTheDocument();
  });
});

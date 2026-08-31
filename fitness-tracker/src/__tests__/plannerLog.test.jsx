import { beforeEach, describe, expect, it, vi } from 'vitest';
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DayCard from '../components/WorkoutPlanner/DayCard.jsx';
import WorkoutPlanner from '../components/WorkoutPlanner/WorkoutPlanner.jsx';
import LogEntry from '../components/WorkoutLog/LogEntry.jsx';
import WorkoutLog from '../components/WorkoutLog/WorkoutLog.jsx';
import { exercises } from '../data/exercisesData.js';
import { createEmptyWeekPlan } from '../utils/storage.js';
import { renderWithRouter } from './testUtils.jsx';

const plannedPushUp = { ...exercises[0], planItemId: 'planned-1', plannedNote: 'Warm up first' };

describe('planner and workout log flows', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('quick-adds an exercise through WorkoutPlanner', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    renderWithRouter(
      <WorkoutPlanner
        exercises={exercises}
        workoutPlan={createEmptyWeekPlan()}
        onAddExerciseToDay={onAdd}
        onRemoveExerciseFromDay={vi.fn()}
      />
    );

    await user.selectOptions(screen.getByLabelText(/^day$/i), 'Wednesday');
    await user.selectOptions(screen.getByLabelText(/exercise/i), 'pull-up');
    await user.type(screen.getByLabelText(/notes/i), 'Controlled reps');
    await user.click(screen.getByRole('button', { name: /add pull-up to wednesday/i }));

    expect(onAdd).toHaveBeenCalledWith('Wednesday', expect.objectContaining({ id: 'pull-up' }), 'Controlled reps');
  });

  it('previews a planned exercise from a day card modal', async () => {
    const user = userEvent.setup();
    const plan = createEmptyWeekPlan();
    plan.Monday = [plannedPushUp];

    renderWithRouter(
      <WorkoutPlanner
        exercises={exercises}
        workoutPlan={plan}
        onAddExerciseToDay={vi.fn()}
        onRemoveExerciseFromDay={vi.fn()}
      />
    );

    await user.click(screen.getByRole('button', { name: /push-up strength - beginner/i }));

    expect(screen.getByRole('dialog', { name: /push-up/i })).toBeInTheDocument();
    expect(screen.getByText(plannedPushUp.instructions[0])).toBeInTheDocument();
  });

  it('removes an exercise from DayCard and toggles collapse', async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();

    renderWithRouter(
      <DayCard day="Monday" exercises={[plannedPushUp]} onRemoveExercise={onRemove} onPreviewExercise={vi.fn()} />
    );

    await user.click(screen.getByRole('button', { name: /collapse/i }));
    expect(screen.queryByText(/warm up first/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /expand/i }));
    await user.click(screen.getByRole('button', { name: /remove/i }));

    expect(onRemove).toHaveBeenCalledWith('Monday', 'planned-1');
  });

  it('submits a workout log entry and clears the saved draft', async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();

    renderWithRouter(
      <WorkoutLog exercises={exercises} workoutHistory={[]} onAddWorkoutLog={onAdd} onDeleteWorkoutLog={vi.fn()} />
    );

    await user.selectOptions(screen.getByLabelText(/exercise/i), 'plank');
    await user.clear(screen.getByLabelText(/sets/i));
    await user.type(screen.getByLabelText(/sets/i), '4');
    await user.clear(screen.getByLabelText(/reps/i));
    await user.type(screen.getByLabelText(/reps/i), '45');
    await user.type(screen.getByLabelText(/notes/i), 'Held steady');
    await user.click(screen.getByRole('button', { name: /save workout/i }));

    expect(onAdd).toHaveBeenCalledWith(expect.objectContaining({ exerciseId: 'plank', sets: '4', reps: '45' }));
    expect(window.localStorage.getItem('fitnessTracker.workoutLogDraft')).toBeNull();
  });

  it('loads a workout log draft from localStorage', async () => {
    window.localStorage.setItem(
      'fitnessTracker.workoutLogDraft',
      JSON.stringify({ exerciseId: 'cycling', notes: 'Draft ride' })
    );

    renderWithRouter(
      <WorkoutLog exercises={exercises} workoutHistory={[]} onAddWorkoutLog={vi.fn()} onDeleteWorkoutLog={vi.fn()} />
    );

    await waitFor(() => expect(screen.getByLabelText(/notes/i)).toHaveValue('Draft ride'));
    expect(screen.getByLabelText(/exercise/i)).toHaveValue('cycling');
  });

  it('renders logged entries and sends delete events up', async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const entry = {
      id: 'log-1',
      exerciseId: 'push-up',
      exerciseName: 'Push-Up',
      date: '2026-08-24',
      sets: '3',
      reps: '12',
      weight: '0',
      notes: 'Clean reps'
    };

    renderWithRouter(<LogEntry entry={entry} exercise={exercises[0]} onDelete={onDelete} />);
    const card = screen.getByText(/clean reps/i).closest('article');

    expect(within(card).getByText(/3 sets/i)).toBeInTheDocument();
    await user.click(within(card).getByRole('button', { name: /delete/i }));

    expect(onDelete).toHaveBeenCalledWith('log-1');
  });
});

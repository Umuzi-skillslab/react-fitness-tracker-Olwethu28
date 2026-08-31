import { beforeEach, describe, expect, it } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import AudioPlayer from '../components/Media/AudioPlayer.jsx';
import VideoPlayer from '../components/Media/VideoPlayer.jsx';
import ProgressChart from '../components/WorkoutLog/ProgressChart.jsx';
import Navbar from '../components/Navigation/Navbar.jsx';
import { exercises, motivationalAudioUrl, sampleVideoUrl } from '../data/exercisesData.js';
import { createEmptyWeekPlan } from '../utils/storage.js';
import { renderWithRouter } from './testUtils.jsx';

describe('routing, progress, and media', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('renders the home route and navigates with CTA buttons', async () => {
    const user = userEvent.setup();

    renderWithRouter(<App />);

    await screen.findByRole('heading', { name: /fitness tracker/i });
    await user.click(screen.getByRole('button', { name: /browse exercises/i }));

    expect(await screen.findByRole('heading', { name: /browse and filter exercises/i })).toBeInTheDocument();
  });

  it('renders exercise and not-found routes', async () => {
    renderWithRouter(<App />, { entries: ['/missing-page'] });

    await screen.findByText(/page not found/i);
    expect(screen.getByRole('button', { name: /go home/i })).toBeInTheDocument();
  });

  it('hydrates plan and history from localStorage for progress route', async () => {
    const plan = createEmptyWeekPlan();
    plan.Monday = [{ ...exercises[0], planItemId: 'saved-plan-1' }];
    window.localStorage.setItem('fitnessTracker.workoutPlan', JSON.stringify(plan));
    window.localStorage.setItem(
      'fitnessTracker.workoutHistory',
      JSON.stringify([
        {
          id: 'log-1',
          exerciseId: 'push-up',
          exerciseName: 'Push-Up',
          date: '2026-08-24',
          sets: '3',
          reps: '12',
          weight: '0'
        }
      ])
    );

    renderWithRouter(<App />, { entries: ['/progress'] });

    await waitFor(() => expect(screen.getByRole('heading', { name: /track your fitness journey/i })).toBeInTheDocument());
    expect(screen.getAllByText('1').length).toBeGreaterThan(0);
    expect(screen.getByText(/calories tracked/i)).toBeInTheDocument();
  });

  it('toggles the responsive navbar menu state', async () => {
    const user = userEvent.setup();

    renderWithRouter(<Navbar plannedCount={2} />);

    await user.click(screen.getByRole('button', { name: /open navigation menu/i }));
    expect(screen.getByRole('button', { name: /close navigation menu/i })).toBeInTheDocument();
    expect(screen.getByText(/2 planned/i)).toBeInTheDocument();
  });

  it('renders ProgressChart empty state and populated dashboard', () => {
    const plan = createEmptyWeekPlan();
    plan.Tuesday = [{ ...exercises[8], planItemId: 'cardio-plan' }];
    const history = [
      {
        id: 'log-1',
        exerciseId: 'treadmill-run',
        exerciseName: 'Treadmill Run',
        date: new Date().toISOString().slice(0, 10),
        sets: '1',
        reps: '20',
        weight: '0'
      }
    ];

    const { rerender } = renderWithRouter(
      <ProgressChart workoutHistory={[]} workoutPlan={createEmptyWeekPlan()} exercises={exercises} />
    );
    expect(screen.getByText(/no progress data yet/i)).toBeInTheDocument();

    rerender(<ProgressChart workoutHistory={history} workoutPlan={plan} exercises={exercises} />);
    expect(screen.getByRole('heading', { name: /total workouts/i })).toBeInTheDocument();
    expect(screen.getByText(/last seven days/i)).toBeInTheDocument();
  });

  it('plays and pauses video controls', async () => {
    const user = userEvent.setup();

    renderWithRouter(<VideoPlayer src={sampleVideoUrl} title="Demo video" />);

    await user.click(screen.getByRole('button', { name: /^play$/i }));
    expect(screen.getByRole('button', { name: /^pause$/i })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /^pause$/i }));
    expect(screen.getByRole('button', { name: /^play$/i })).toBeInTheDocument();
  });

  it('plays audio and updates volume', async () => {
    const user = userEvent.setup();

    renderWithRouter(<AudioPlayer src={motivationalAudioUrl} title="Audio test" />);

    await user.click(screen.getByRole('button', { name: /play audio/i }));
    expect(screen.getByRole('button', { name: /pause audio/i })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/volume/i), { target: { value: '0.4' } });

    expect(screen.getByLabelText(/volume/i)).toHaveValue('0.4');
  });
});

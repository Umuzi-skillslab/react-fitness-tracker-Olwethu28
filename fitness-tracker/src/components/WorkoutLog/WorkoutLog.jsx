import { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../UI/Button.jsx';
import Card from '../UI/Card.jsx';
import LogEntry from './LogEntry.jsx';
import styles from './WorkoutLog.module.css';

const draftKey = 'fitnessTracker.workoutLogDraft';

const today = () => new Date().toISOString().slice(0, 10);

const createInitialForm = (exerciseId = '') => ({
  exerciseId,
  date: today(),
  sets: '3',
  reps: '10',
  weight: '0',
  notes: ''
});

const WorkoutLog = ({ exercises, workoutHistory, onAddWorkoutLog, onDeleteWorkoutLog }) => {
  const [form, setForm] = useState(createInitialForm(exercises[0]?.id || ''));
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [formTouched, setFormTouched] = useState(false);

  useEffect(() => {
    // Restore an incomplete log so a refresh does not discard partially entered workout details.
    const savedDraft = window.localStorage.getItem(draftKey);
    if (savedDraft) {
      try {
        setForm({ ...createInitialForm(exercises[0]?.id || ''), ...JSON.parse(savedDraft) });
      } catch {
        setForm(createInitialForm(exercises[0]?.id || ''));
      }
    }
  }, [exercises]);

  useEffect(() => {
    // Persist only after user edits to avoid writing a default blank draft on first render.
    if (formTouched) {
      window.localStorage.setItem(draftKey, JSON.stringify(form));
    }
  }, [form, formTouched]);

  const exerciseLookup = useMemo(
    // A lookup map avoids repeated array scans while rendering every history entry.
    () => Object.fromEntries(exercises.map((exercise) => [exercise.id, exercise])),
    [exercises]
  );

  const sortedHistory = useMemo(
    // Sorting is derived state, so toggling order never mutates the parent-owned history array.
    () =>
      [...workoutHistory].sort((a, b) =>
        sortNewestFirst ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date)
      ),
    [sortNewestFirst, workoutHistory]
  );

  const updateField = (event) => {
    // A single field updater keeps the form DRY while preserving the controlled input model.
    const { name, value } = event.target;
    setFormTouched(true);
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const exercise = exerciseLookup[form.exerciseId];

    if (!exercise) {
      return;
    }

    // Store the display name with the log so old entries still render if catalog data changes later.
    onAddWorkoutLog({
      ...form,
      exerciseName: exercise.name
    });
    setForm(createInitialForm(form.exerciseId));
    setFormTouched(false);
    window.localStorage.removeItem(draftKey);
  };

  return (
    <div className={styles.layout}>
      <Card title="Log completed workout" eyebrow="Training history" tone="primary">
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Exercise
            <select name="exerciseId" value={form.exerciseId} onChange={updateField}>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Date
            <input name="date" type="date" value={form.date} onChange={updateField} />
          </label>

          <div className={styles.numbers}>
            <label>
              Sets
              <input name="sets" type="number" min="1" value={form.sets} onChange={updateField} />
            </label>
            <label>
              Reps
              <input name="reps" type="number" min="1" value={form.reps} onChange={updateField} />
            </label>
            <label>
              Weight kg
              <input name="weight" type="number" min="0" value={form.weight} onChange={updateField} />
            </label>
          </div>

          <label>
            Notes
            <textarea name="notes" value={form.notes} onChange={updateField} placeholder="How did the session feel?" />
          </label>

          <Button type="submit" fullWidth disabled={!form.exerciseId || !form.date}>
            Save workout
          </Button>
        </form>
      </Card>

      <section className={styles.history} aria-label="Workout history list">
        <div className={styles.historyHeader}>
          <h2>Logged workouts</h2>
          <Button variant="ghost" size="small" onClick={() => setSortNewestFirst((current) => !current)}>
            {sortNewestFirst ? 'Oldest first' : 'Newest first'}
          </Button>
        </div>

        {sortedHistory.length > 0 ? (
          <div className={styles.entries}>
            {sortedHistory.map((entry) => (
              <LogEntry
                key={entry.id}
                entry={entry}
                exercise={exerciseLookup[entry.exerciseId]}
                onDelete={onDeleteWorkoutLog}
              />
            ))}
          </div>
        ) : (
          <Card title="No workouts logged yet" tone="accent">
            <p className="muted">Use the form to save completed exercises and build your training history.</p>
          </Card>
        )}
      </section>
    </div>
  );
};

WorkoutLog.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutHistory: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddWorkoutLog: PropTypes.func.isRequired,
  onDeleteWorkoutLog: PropTypes.func.isRequired
};

export default WorkoutLog;

import { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Badge from '../UI/Badge.jsx';
import Button from '../UI/Button.jsx';
import Card from '../UI/Card.jsx';
import Modal from '../UI/Modal.jsx';
import DayCard from './DayCard.jsx';
import { weekDays } from '../../utils/storage.js';
import styles from './WorkoutPlanner.module.css';

const WorkoutPlanner = ({ exercises, workoutPlan, onAddExerciseToDay, onRemoveExerciseFromDay }) => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedExerciseId, setSelectedExerciseId] = useState(exercises[0]?.id || '');
  const [note, setNote] = useState('');
  const [previewExercise, setPreviewExercise] = useState(null);

  const exerciseOptions = useMemo(
    // Sort only for the select control so the canonical data order remains unchanged elsewhere.
    () => [...exercises].sort((a, b) => a.name.localeCompare(b.name)),
    [exercises]
  );

  const selectedExercise = exerciseOptions.find((exercise) => exercise.id === selectedExerciseId);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedExercise) {
      return;
    }

    onAddExerciseToDay(selectedDay, selectedExercise, note.trim());
    setNote('');
  };

  return (
    <>
      <div className={styles.layout}>
        <Card title="Quick add exercise" eyebrow="Weekly plan" tone="accent">
          <form className={styles.form} onSubmit={handleSubmit}>
            <label>
              Day
              <select value={selectedDay} onChange={(event) => setSelectedDay(event.target.value)}>
                {weekDays.map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </label>

            <label>
              Exercise
              <select value={selectedExerciseId} onChange={(event) => setSelectedExerciseId(event.target.value)}>
                {exerciseOptions.map((exercise) => (
                  <option key={exercise.id} value={exercise.id}>
                    {exercise.name} ({exercise.category})
                  </option>
                ))}
              </select>
            </label>

            <label>
              Notes
              <textarea value={note} onChange={(event) => setNote(event.target.value)} placeholder="Target pace, load, or focus" />
            </label>

            <Button type="submit" disabled={!selectedExercise} fullWidth>
              Add {selectedExercise ? selectedExercise.name : 'exercise'} to {selectedDay}
            </Button>
          </form>
        </Card>

        <Card title="Plan balance" eyebrow="Intensity mix" tone="primary">
          <div className={styles.balance}>
            {['Strength', 'Cardio', 'Flexibility', 'Balance'].map((category) => {
              // The balance panel summarizes sibling day-card state through the lifted plan object.
              const count = Object.values(workoutPlan)
                .flat()
                .filter((exercise) => exercise.category === category).length;

              return <Badge key={category} label={`${category}: ${count}`} tone={category} strong={count > 0} />;
            })}
          </div>
          <p className="muted">
            {Object.values(workoutPlan).flat().length > 0
              ? 'Your plan has variety across the week. Add recovery work where days look heavy.'
              : 'Start by adding a few exercises to create a balanced week.'}
          </p>
        </Card>
      </div>

      <section className={styles.weekGrid} aria-label="Weekly workout plan">
        {weekDays.map((day) => (
          <DayCard
            key={day}
            day={day}
            exercises={workoutPlan[day]}
            onRemoveExercise={onRemoveExerciseFromDay}
            onPreviewExercise={setPreviewExercise}
          />
        ))}
      </section>

      <Modal
        isOpen={Boolean(previewExercise)}
        title={previewExercise ? previewExercise.name : 'Exercise preview'}
        onClose={() => setPreviewExercise(null)}
        actions={
          previewExercise ? (
            // Adding from preview reuses the same parent callback as the quick-add form.
            <Button variant="secondary" onClick={() => onAddExerciseToDay(selectedDay, previewExercise, note.trim())}>
              Add to {selectedDay}
            </Button>
          ) : null
        }
      >
        {previewExercise ? (
          <div className={styles.preview}>
            <img src={previewExercise.image} alt="" />
            <p>{previewExercise.instructions[0]}</p>
            <Badge label={previewExercise.difficulty} />
          </div>
        ) : (
          <p>No exercise selected.</p>
        )}
      </Modal>
    </>
  );
};

WorkoutPlanner.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  workoutPlan: PropTypes.objectOf(PropTypes.array).isRequired,
  onAddExerciseToDay: PropTypes.func.isRequired,
  onRemoveExerciseFromDay: PropTypes.func.isRequired
};

export default WorkoutPlanner;

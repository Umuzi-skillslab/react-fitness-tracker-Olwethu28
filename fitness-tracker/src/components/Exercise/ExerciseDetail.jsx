import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import VideoPlayer from '../Media/VideoPlayer.jsx';
import Badge from '../UI/Badge.jsx';
import Button from '../UI/Button.jsx';
import Card from '../UI/Card.jsx';
import Header from '../common/Header.jsx';
import { weekDays } from '../../utils/storage.js';
import styles from './ExerciseDetail.module.css';

const ExerciseDetail = ({ exercises, onAddExerciseToDay }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [note, setNote] = useState('');
  const [wasAdded, setWasAdded] = useState(false);

  // Resolve the dynamic route param once per id change instead of searching during every JSX expression.
  const exercise = useMemo(() => exercises.find((item) => item.id === id), [exercises, id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddExerciseToDay(selectedDay, exercise, note.trim());
    setWasAdded(true);
  };

  if (!exercise) {
    return (
      <Card title="Exercise not found" tone="accent">
        <p className="muted">The exercise you requested is not in the library.</p>
        <Button onClick={() => navigate('/exercises')}>Back to exercises</Button>
      </Card>
    );
  }

  // Header stats are derived from the exercise record and passed as display-ready values.
  const stats = [
    { label: 'Minutes', value: exercise.duration },
    { label: 'Sets', value: exercise.sets },
    { label: 'Calories', value: exercise.caloriesBurn }
  ];

  return (
    <>
      <Header
        eyebrow={exercise.category}
        title={exercise.name}
        description={`${exercise.equipment} exercise for ${exercise.muscleGroups.join(', ').toLowerCase()}.`}
        stats={stats}
        actions={
          <>
            <Button variant="ghost" onClick={() => navigate('/exercises')}>
              Back
            </Button>
            <Button variant="secondary" onClick={() => navigate('/workout-planner')}>
              Open planner
            </Button>
          </>
        }
      />

      <div className="page-grid">
        <Card title="Form instructions" tone="primary">
          <div className={styles.badges}>
            <Badge label={exercise.difficulty} />
            {exercise.muscleGroups.map((group) => (
              <Badge key={group} label={group} tone="default" />
            ))}
          </div>
          <ol className={styles.instructions}>
            {exercise.instructions.map((instruction) => (
              <li key={instruction}>{instruction}</li>
            ))}
          </ol>
        </Card>

        <Card title="Add to weekly plan" tone={wasAdded ? 'success' : 'accent'}>
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
              Coaching note
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Tempo, target load, or warm-up reminder"
              />
            </label>
            <Button type="submit" fullWidth>
              Add to {selectedDay}
            </Button>
            {wasAdded ? <p className={styles.success}>{exercise.name} added to {selectedDay}.</p> : null}
          </form>
        </Card>
      </div>

      <section className={styles.videoSection}>
        <Card title="Demonstration video">
          <VideoPlayer src={exercise.videoUrl} poster={exercise.image} title={`${exercise.name} demonstration`} />
        </Card>
      </section>
    </>
  );
};

ExerciseDetail.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  onAddExerciseToDay: PropTypes.func.isRequired
};

export default ExerciseDetail;

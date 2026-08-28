import PropTypes from 'prop-types';
import Badge from '../UI/Badge.jsx';
import Button from '../UI/Button.jsx';
import Card from '../UI/Card.jsx';
import { formatDate } from '../../utils/storage.js';
import styles from './LogEntry.module.css';

const LogEntry = ({ entry, exercise, onDelete }) => (
  <Card className={styles.entry} tone="success">
    <div className={styles.header}>
      <div>
        <h3>{exercise?.name || entry.exerciseName}</h3>
        <p>{formatDate(entry.date)}</p>
      </div>
      <Button variant="danger" size="small" onClick={() => onDelete(entry.id)}>
        Delete
      </Button>
    </div>
    <div className={styles.metrics}>
      <Badge label={`${entry.sets} sets`} tone="default" />
      <Badge label={`${entry.reps} reps`} tone="default" />
      <Badge label={`${entry.weight || 0} kg`} tone="default" />
      {exercise ? <Badge label={exercise.category} /> : null}
    </div>
    {entry.notes ? <p className={styles.notes}>{entry.notes}</p> : null}
  </Card>
);

LogEntry.propTypes = {
  entry: PropTypes.shape({
    id: PropTypes.string.isRequired,
    exerciseId: PropTypes.string.isRequired,
    exerciseName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    sets: PropTypes.string.isRequired,
    reps: PropTypes.string.isRequired,
    weight: PropTypes.string,
    notes: PropTypes.string
  }).isRequired,
  exercise: PropTypes.object,
  onDelete: PropTypes.func.isRequired
};

export default LogEntry;

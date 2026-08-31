import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AudioPlayer from '../components/Media/AudioPlayer.jsx';
import Badge from '../components/UI/Badge.jsx';
import Button from '../components/UI/Button.jsx';
import Card from '../components/UI/Card.jsx';
import Header from '../components/common/Header.jsx';
import { calculateWorkoutStreak } from '../utils/storage.js';
import styles from './Home.module.css';

const Home = ({ exercises, categoryCounts, workoutHistory }) => {
  const navigate = useNavigate();
  const featuredExercises = exercises.filter((exercise) => exercise.difficulty === 'Beginner').slice(0, 4);
  const stats = [
    { label: 'Exercises', value: exercises.length },
    { label: 'Categories', value: Object.keys(categoryCounts).length },
    { label: 'Current streak', value: calculateWorkoutStreak(workoutHistory) }
  ];

  return (
    <>
      <Header
        eyebrow="Member training workspace"
        title="Fitness Tracker"
        description="Browse exercises, build a weekly plan, log completed sessions, and monitor progress from one responsive React application."
        stats={stats}
        actions={
          <>
            <Button variant="primary" onClick={() => navigate('/exercises')}>
              Browse exercises
            </Button>
            <Button variant="secondary" onClick={() => navigate('/workout-planner')}>
              Plan this week
            </Button>
          </>
        }
      />

      <div className="page-grid">
        <section className="stack" aria-label="Featured exercise library">
          <h2 className="section-title">Starter-friendly exercises</h2>
          <div className={styles.featureGrid}>
            {featuredExercises.map((exercise) => (
              <Card key={exercise.id} tone={exercise.category === 'Strength' ? 'primary' : 'accent'}>
                <div className={styles.feature}>
                  <img src={exercise.image} alt="" />
                  <div>
                    <h3>{exercise.name}</h3>
                    <p>{exercise.instructions[0]}</p>
                    <div className="cluster">
                      <Badge label={exercise.category} />
                      <Badge label={`${exercise.duration} min`} tone="default" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <aside className="stack" aria-label="Motivation and category overview">
          <Card title="Training library" eyebrow="Category coverage" tone="success">
            <div className={styles.categoryList}>
              {Object.entries(categoryCounts).map(([category, count]) => (
                <div key={category} className={styles.categoryRow}>
                  <Badge label={category} />
                  <strong>{count}</strong>
                </div>
              ))}
            </div>
          </Card>

          <Card tone="accent">
            <AudioPlayer src={'/assets/audios/Morning-Motivation.mp3'}/>
          </Card>
          <Card  tone="accent">
            <AudioPlayer src={'/assets/audios/Morning-Motivation.mp3'} />
          </Card>
        </aside>
      </div>
    </>
  );
};

Home.propTypes = {
  exercises: PropTypes.arrayOf(PropTypes.object).isRequired,
  categoryCounts: PropTypes.objectOf(PropTypes.number).isRequired,
  workoutHistory: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default Home;

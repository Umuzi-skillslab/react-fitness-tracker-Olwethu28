import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/Button.jsx';
import Card from '../components/UI/Card.jsx';
import styles from './NotFound.module.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.notFound}>
      <Card title="Page not found" eyebrow="404" tone="accent">
        <p className="muted">The route you requested does not exist in the fitness tracker.</p>
        <div className={styles.actions}>
          <Button onClick={() => navigate('/')}>Go home</Button>
          <Button variant="ghost" onClick={() => navigate('/exercises')}>
            Browse exercises
          </Button>
        </div>
      </Card>
    </section>
  );
};

export default NotFound;

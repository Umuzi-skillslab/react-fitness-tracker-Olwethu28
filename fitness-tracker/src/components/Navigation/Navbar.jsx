import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Badge from '../UI/Badge.jsx';
import Button from '../UI/Button.jsx';
import styles from './Navbar.module.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/exercises', label: 'Exercises' },
  { to: '/workout-planner', label: 'Planner' },
  { to: '/history', label: 'History' },
  { to: '/progress', label: 'Progress' }
];

const Navbar = ({ plannedCount = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const handleBrandClick = () => {
    navigate('/');
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        <button className={styles.brand} type="button" onClick={handleBrandClick}>
          <span className={styles.mark}>FT</span>
          <span>
            <strong>Fitness Tracker</strong>
            <small>Workout Planner</small>
          </span>
        </button>

        <Button
          variant="ghost"
          size="small"
          className={styles.menuButton}
          onClick={() => setIsOpen((open) => !open)}
          ariaLabel={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? 'Close' : 'Menu'}
        </Button>

        <nav className={`${styles.links} ${isOpen ? styles.open : ''}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <Badge label={`${plannedCount} planned`} tone={plannedCount > 0 ? 'success' : 'default'} />
        </nav>
      </div>
    </header>
  );
};

Navbar.propTypes = {
  plannedCount: PropTypes.number
};

export default Navbar;

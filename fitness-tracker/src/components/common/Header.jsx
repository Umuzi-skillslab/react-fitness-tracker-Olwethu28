import PropTypes from 'prop-types';
import styles from './Header.module.css';

const Header = ({ eyebrow = '', title, description, actions = null, stats = [] }) => (
  // The CSS custom property keeps the stats grid responsive without hardcoding column classes.
  <section className={styles.header} style={{ '--stat-count': Math.max(stats.length, 1) }}>
    <div className={styles.copy}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <h1>{title}</h1>
      <p>{description}</p>
      {actions ? <div className={styles.actions}>{actions}</div> : null}
    </div>

    {stats.length > 0 && (
      <div className={styles.stats} aria-label="Summary statistics">
        {stats.map((stat) => (
          <div className={styles.stat} key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    )}
  </section>
);

Header.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  actions: PropTypes.node,
  stats: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
    })
  )
};

export default Header;

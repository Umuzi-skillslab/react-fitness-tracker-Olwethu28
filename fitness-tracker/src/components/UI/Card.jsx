import PropTypes from 'prop-types';
import styles from './Card.module.css';

const toneColors = {
  neutral: '#d9e1ec',
  primary: '#0f766e',
  accent: '#f97316',
  success: '#15803d'
};

const Card = ({ children, title = '', eyebrow = '', actions = null, tone = 'neutral', className = '' }) => {
  const classes = [styles.card, className].filter(Boolean).join(' ');

  return (
    <article className={classes} style={{ borderTopColor: toneColors[tone] || toneColors.neutral }}>
      {(title || eyebrow || actions) && (
        <header className={styles.header}>
          <div>
            {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
            {title ? <h2 className={styles.title}>{title}</h2> : null}
          </div>
          {actions && <div className={styles.actions}>{actions}</div>}
        </header>
      )}
      {children}
    </article>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  eyebrow: PropTypes.string,
  actions: PropTypes.node,
  tone: PropTypes.oneOf(['neutral', 'primary', 'accent', 'success']),
  className: PropTypes.string
};

export default Card;

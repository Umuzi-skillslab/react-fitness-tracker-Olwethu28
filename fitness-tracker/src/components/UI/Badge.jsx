import PropTypes from 'prop-types';
import styles from './Badge.module.css';

const badgePalette = {
  Strength: { background: '#ecfdf5', color: '#065f46' },
  Cardio: { background: '#fff7ed', color: '#9a3412' },
  Flexibility: { background: '#eef2ff', color: '#3730a3' },
  Balance: { background: '#fefce8', color: '#854d0e' },
  Beginner: { background: '#f0fdf4', color: '#166534' },
  Intermediate: { background: '#fffbeb', color: '#92400e' },
  Advanced: { background: '#fff1f2', color: '#be123c' },
  default: { background: '#eef2f7', color: '#475569' }
};

const Badge = ({ label, tone = 'default', strong = false }) => {
  const palette = badgePalette[tone] || badgePalette[label] || badgePalette.default;

  return (
    <span
      className={`${styles.badge} ${strong ? styles.strong : ''}`}
      style={{ backgroundColor: palette.background, color: palette.color }}
    >
      {label}
    </span>
  );
};

Badge.propTypes = {
  label: PropTypes.string.isRequired,
  tone: PropTypes.string,
  strong: PropTypes.bool
};

export default Badge;

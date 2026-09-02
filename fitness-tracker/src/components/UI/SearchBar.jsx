import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from './Button.jsx';
import styles from './SearchBar.module.css';

const SearchBar = ({
  value,
  onChange,
  onSubmit,
  placeholder = 'Search',
  label = 'Search exercises',
  buttonLabel = 'Search'
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [lastKey, setLastKey] = useState('');

  const handleChange = (event) => {
    onChange(event.target.value);
  };

  const handleKeyPress = (event) => {
    // Keep Enter keyboard submission aligned with the visible search button behavior.
    setLastKey(event.key);
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  return (
    <form className={`${styles.search} ${isFocused ? styles.focused : ''}`} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="exercise-search">
        {label}
      </label>
      <div className={styles.controls}>
        <input
          id="exercise-search"
          type="search"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          aria-describedby="last-search-key"
        />
        <Button type="submit" variant={value.trim() ? 'primary' : 'ghost'}>
          {buttonLabel}
        </Button>
      </div>
      <span id="last-search-key" className={styles.assistive}>
        {lastKey ? `Last key pressed: ${lastKey}` : 'Type a name, category, or muscle group'}
      </span>
    </form>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  buttonLabel: PropTypes.string
};

export default SearchBar;

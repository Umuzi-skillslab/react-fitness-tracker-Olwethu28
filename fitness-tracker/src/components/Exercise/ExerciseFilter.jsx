import PropTypes from 'prop-types';
import Button from '../UI/Button.jsx';
import SearchBar from '../UI/SearchBar.jsx';
import { categories, difficulties, muscleGroups } from '../../data/exercisesData.js';
import styles from './ExerciseFilter.module.css';

const ExerciseFilter = ({ filters, resultCount, onFilterChange, onSearchSubmit, onResetFilters }) => {
  const handleSelectChange = (event) => {
    onFilterChange(event.target.name, event.target.value);
  };

  return (
    <section className={styles.filters} aria-label="Exercise filters">
      <SearchBar
        value={filters.search}
        onChange={(value) => onFilterChange('search', value)}
        onSubmit={onSearchSubmit}
        placeholder="Search push-up, cardio, legs..."
      />

      <div className={styles.grid}>
        <label>
          Category
          <select name="category" value={filters.category} onChange={handleSelectChange}>
            <option value="All">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label>
          Muscle group
          <select name="muscleGroup" value={filters.muscleGroup} onChange={handleSelectChange}>
            <option value="All">All muscle groups</option>
            {muscleGroups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>

        <label>
          Difficulty
          <select name="difficulty" value={filters.difficulty} onChange={handleSelectChange}>
            <option value="All">All levels</option>
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className={styles.summary}>
        <strong>{resultCount}</strong>
        <span>{resultCount === 1 ? 'exercise matches' : 'exercises match'}</span>
        <Button variant="ghost" size="small" onClick={onResetFilters}>
          Reset
        </Button>
      </div>
    </section>
  );
};

ExerciseFilter.propTypes = {
  filters: PropTypes.shape({
    search: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    muscleGroup: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired
  }).isRequired,
  resultCount: PropTypes.number.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  onSearchSubmit: PropTypes.func.isRequired,
  onResetFilters: PropTypes.func.isRequired
};

export default ExerciseFilter;

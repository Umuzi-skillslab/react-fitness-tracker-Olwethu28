import { beforeEach, describe, expect, it } from 'vitest';
import { exercises } from '../data/exercisesData.js';
import {
  calculateLoggedCalories,
  calculateWorkoutStreak,
  countPlannedExercises,
  createEmptyWeekPlan,
  loadWorkoutHistory,
  loadWorkoutPlan,
  saveWorkoutHistory,
  saveWorkoutPlan
} from '../utils/storage.js';

describe('storage utilities', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('creates and persists a seven-day workout plan', () => {
    const plan = createEmptyWeekPlan();
    plan.Monday = [{ ...exercises[0], planItemId: 'one' }];

    saveWorkoutPlan(plan);

    expect(loadWorkoutPlan().Monday).toHaveLength(1);
    expect(countPlannedExercises(loadWorkoutPlan())).toBe(1);
  });

  it('recovers safely from malformed localStorage values', () => {
    window.localStorage.setItem('fitnessTracker.workoutPlan', '{bad json');
    window.localStorage.setItem('fitnessTracker.workoutHistory', '{"wrong":true}');

    expect(loadWorkoutPlan().Sunday).toEqual([]);
    expect(loadWorkoutHistory()).toEqual([]);
  });

  it('persists history and calculates progress metrics', () => {
    const history = [
      { id: '1', exerciseId: 'push-up', date: '2026-08-24', sets: '3' },
      { id: '2', exerciseId: 'plank', date: '2026-08-23', sets: '3' },
      { id: '3', exerciseId: 'cycling', date: '2026-08-22', sets: '1' }
    ];

    saveWorkoutHistory(history);

    expect(loadWorkoutHistory()).toHaveLength(3);
    expect(calculateWorkoutStreak(history)).toBe(3);
    expect(calculateLoggedCalories(history, exercises)).toBeGreaterThan(0);
  });
});

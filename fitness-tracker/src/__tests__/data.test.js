import { describe, expect, it } from 'vitest';
import { exercises } from '../data/exercisesData.js';

const countBy = (field, value) => exercises.filter((exercise) => exercise[field] === value).length;

describe('exercise data', () => {
  it('contains the required exercise volume and category distribution', () => {
    expect(exercises).toHaveLength(21);
    expect(countBy('category', 'Strength')).toBeGreaterThanOrEqual(8);
    expect(countBy('category', 'Cardio')).toBeGreaterThanOrEqual(6);
    expect(countBy('category', 'Flexibility')).toBeGreaterThanOrEqual(4);
    expect(countBy('category', 'Balance')).toBeGreaterThanOrEqual(3);
  });

  it('covers required difficulty levels and muscle groups', () => {
    const allMuscles = new Set(exercises.flatMap((exercise) => exercise.muscleGroups));

    expect(countBy('difficulty', 'Beginner')).toBeGreaterThanOrEqual(8);
    expect(countBy('difficulty', 'Intermediate')).toBeGreaterThanOrEqual(7);
    expect(countBy('difficulty', 'Advanced')).toBeGreaterThanOrEqual(5);
    expect([...allMuscles].sort()).toEqual(['Arms', 'Back', 'Chest', 'Core', 'Legs', 'Shoulders']);
  });

  it('provides complete structured records for every exercise', () => {
    exercises.forEach((exercise) => {
      expect(exercise).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          category: expect.any(String),
          difficulty: expect.any(String),
          duration: expect.any(Number),
          sets: expect.any(Number),
          reps: expect.any(String),
          equipment: expect.any(String),
          caloriesBurn: expect.any(Number),
          image: expect.any(String),
          videoUrl: expect.any(String)
        })
      );
      expect(exercise.instructions.length).toBeGreaterThanOrEqual(3);
      expect(exercise.muscleGroups.length).toBeGreaterThanOrEqual(1);
    });
  });
});

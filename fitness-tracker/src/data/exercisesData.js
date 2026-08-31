export const categories = ['Strength', 'Cardio', 'Flexibility', 'Balance'];
export const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
export const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Arms', 'Core', 'Legs'];

export const exercises = [
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'Strength',
    muscleGroups: ['Chest', 'Arms', 'Core'],
    difficulty: 'Beginner',
    duration: 10,
    sets: 3,
    reps: '10-15',
    instructions: [
      'Place hands slightly wider than shoulders with a straight body line.',
      'Lower your chest until elbows reach about 90 degrees.',
      'Press the floor away while keeping your core braced.'
    ],
    equipment: 'Bodyweight',
    caloriesBurn: 80,
    image: '/assets/images/push_ups.jpeg',
    videoUrl: '/assets/videos/pushups-tutorial.mp4'
  },
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    category: 'Strength',
    muscleGroups: ['Back', 'Arms'],
    difficulty: 'Intermediate',
    duration: 12,
    sets: 4,
    reps: '8-12 each side',
    instructions: [
      'Hinge at the hips with a flat back and one hand supported.',
      'Pull the dumbbell toward your ribs without rotating the torso.',
      'Lower with control until the arm is fully extended.'
    ],
    equipment: 'Dumbbell',
    caloriesBurn: 95,
    image: '/assets/images/dumbbell.jpeg',
    videoUrl: '/assets/videos/dumbbellrow-tutorial.mp4'
  },
  {
    id: 'goblet-squat',
    name: 'Goblet Squat',
    category: 'Strength',
    muscleGroups: ['Legs', 'Core'],
    difficulty: 'Beginner',
    duration: 12,
    sets: 3,
    reps: '12',
    instructions: [
      'Hold a dumbbell close to your chest with elbows tucked.',
      'Sit between your hips while keeping heels grounded.',
      'Drive through the floor and stand tall without locking knees hard.'
    ],
    equipment: 'Dumbbell or kettlebell',
    caloriesBurn: 110,
    image: '/assets/images/goblet.jpeg',
    videoUrl: '/assets/videos/gobletsquats-tutorial.mp4'
  },
  {
    id: 'shoulder-press',
    name: 'Shoulder Press',
    category: 'Strength',
    muscleGroups: ['Shoulders', 'Arms'],
    difficulty: 'Intermediate',
    duration: 11,
    sets: 4,
    reps: '8-10',
    instructions: [
      'Start with weights at shoulder height and ribs stacked over hips.',
      'Press overhead until biceps finish near your ears.',
      'Lower slowly and avoid arching your lower back.'
    ],
    equipment: 'Dumbbells',
    caloriesBurn: 90,
    image: '/assets/images/shoulder_press.jpeg',
    videoUrl: '/assets/videos/shoulder-press-tutorial.mp4'
  },
  {
    id: 'deadlift',
    name: 'Deadlift',
    category: 'Strength',
    muscleGroups: ['Back', 'Legs', 'Core'],
    difficulty: 'Advanced',
    duration: 16,
    sets: 5,
    reps: '5',
    instructions: [
      'Set the bar over mid-foot and brace before lifting.',
      'Push the floor away while keeping the bar close to your shins.',
      'Stand tall, then hinge back down with control.'
    ],
    equipment: 'Barbell',
    caloriesBurn: 160,
    image: '/assets/images/deadlift.jpeg',
    videoUrl: '/assets/videos/deadlift-tutorial.mp4'
  },
  {
    id: 'bench-press',
    name: 'Bench Press',
    category: 'Strength',
    muscleGroups: ['Chest', 'Shoulders', 'Arms'],
    difficulty: 'Intermediate',
    duration: 14,
    sets: 4,
    reps: '6-10',
    instructions: [
      'Set your shoulder blades down and back on the bench.',
      'Lower the bar to the lower chest with wrists stacked.',
      'Press up smoothly while keeping feet planted.'
    ],
    equipment: 'Barbell and bench',
    caloriesBurn: 115,
    image: '/assets/images/bench_press.jpeg',
    videoUrl: '/assets/videos/bench-press-tutorial.mp4'
  },
  {
    id: 'pull-up',
    name: 'Pull-Up',
    category: 'Strength',
    muscleGroups: ['Back', 'Arms', 'Core'],
    difficulty: 'Advanced',
    duration: 10,
    sets: 4,
    reps: '4-8',
    instructions: [
      'Hang from the bar with shoulders active and legs quiet.',
      'Pull elbows toward your ribs until chin clears the bar.',
      'Lower under control to a full hang.'
    ],
    equipment: 'Pull-up bar',
    caloriesBurn: 105,
    image: '/assets/images/pull_ups.jpeg',
    videoUrl: '/assets/videos/pullups-tutorial.mp4'
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'Strength',
    muscleGroups: ['Core', 'Shoulders'],
    difficulty: 'Beginner',
    duration: 8,
    sets: 3,
    reps: '30-45 seconds',
    instructions: [
      'Place elbows under shoulders with forearms parallel.',
      'Keep ribs down and squeeze glutes lightly.',
      'Breathe steadily while maintaining a straight line.'
    ],
    equipment: 'Bodyweight',
    caloriesBurn: 60,
    image: '/assets/images/plank.jpeg',
    videoUrl: '/assets/videos/plank-tutorial.mp4'
  },
  {
    id: 'treadmill-run',
    name: 'Treadmill Run',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Core'],
    difficulty: 'Intermediate',
    duration: 25,
    sets: 1,
    reps: '20-30 minutes',
    instructions: [
      'Warm up with five minutes of brisk walking.',
      'Run at a pace where speaking is difficult but controlled.',
      'Cool down gradually before stepping off.'
    ],
    equipment: 'Treadmill',
    caloriesBurn: 280,
    image: '/assets/images/treadmill_run.jpeg',
    videoUrl: '/assets/videos/treadmill-run-tutorial.mp4'
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Shoulders', 'Core'],
    difficulty: 'Beginner',
    duration: 15,
    sets: 5,
    reps: '60 seconds',
    instructions: [
      'Hold handles lightly with elbows close to your ribs.',
      'Rotate from the wrists and keep jumps low.',
      'Rest between intervals until breathing recovers.'
    ],
    equipment: 'Jump rope',
    caloriesBurn: 180,
    image: '/assets/images/jump_rope.jpeg',
    videoUrl: '/assets/videos/jump-rope tutorial.mp4'
  },
  {
    id: 'cycling',
    name: 'Stationary Cycling',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Core'],
    difficulty: 'Beginner',
    duration: 30,
    sets: 1,
    reps: '30 minutes',
    instructions: [
      'Adjust the seat so your knee stays slightly bent at the bottom.',
      'Pedal smoothly without rocking your hips.',
      'Alternate steady effort and short hard pushes.'
    ],
    equipment: 'Stationary bike',
    caloriesBurn: 240,
    image: '/assets/images/stationary_cycling.jpeg',
    videoUrl: '/assets/videos/stationary-cycling-tutorial.mp4'
  },
  {
    id: 'rowing-machine',
    name: 'Rowing Machine',
    category: 'Cardio',
    muscleGroups: ['Back', 'Legs', 'Core', 'Arms'],
    difficulty: 'Intermediate',
    duration: 20,
    sets: 4,
    reps: '4 minutes',
    instructions: [
      'Drive first with legs, then swing the torso, then pull arms.',
      'Recover by extending arms before folding forward.',
      'Keep strokes long and controlled instead of rushed.'
    ],
    equipment: 'Rowing machine',
    caloriesBurn: 230,
    image: '/assets/images/rowing_machine.jpeg',
    videoUrl: '/assets/videos/rowing-machine-tutorial.mp4'
  },
  {
    id: 'burpees',
    name: 'Burpees',
    category: 'Cardio',
    muscleGroups: ['Chest', 'Legs', 'Core', 'Shoulders'],
    difficulty: 'Advanced',
    duration: 12,
    sets: 4,
    reps: '10',
    instructions: [
      'Squat down, place hands on the floor, and step or jump back.',
      'Complete a push-up or hold a strong plank.',
      'Return feet under hips and jump with a soft landing.'
    ],
    equipment: 'Bodyweight',
    caloriesBurn: 210,
    image: '/assets/images/burpees.jpeg',
    videoUrl: '/assets/videos/burpees-tutorial.mp4'
  },
  {
    id: 'stair-climber',
    name: 'Stair Climber',
    category: 'Cardio',
    muscleGroups: ['Legs', 'Core'],
    difficulty: 'Advanced',
    duration: 22,
    sets: 1,
    reps: '20 minutes',
    instructions: [
      'Stand tall and keep hands light on the rails.',
      'Step through the full foot instead of bouncing on toes.',
      'Use intervals to control intensity and form.'
    ],
    equipment: 'Stair climber',
    caloriesBurn: 260,
    image: '/assets/images/stair_climber.webp',
    videoUrl: '/assets/videos/stair-climber-tutorial.mp4'
  },
  {
    id: 'hamstring-stretch',
    name: 'Hamstring Stretch',
    category: 'Flexibility',
    muscleGroups: ['Legs'],
    difficulty: 'Beginner',
    duration: 8,
    sets: 2,
    reps: '45 seconds each side',
    instructions: [
      'Extend one leg and hinge at the hips with a long spine.',
      'Stop at a mild stretch without forcing the knee flat.',
      'Breathe slowly and switch sides.'
    ],
    equipment: 'Mat',
    caloriesBurn: 25,
    image: '/assets/images/hamstring_stretch.jpeg',
    videoUrl: '/assets/videos/hamstring-stretch-tutorial.mp4'
  },
  {
    id: 'thoracic-rotation',
    name: 'Thoracic Rotation',
    category: 'Flexibility',
    muscleGroups: ['Back', 'Shoulders', 'Core'],
    difficulty: 'Intermediate',
    duration: 10,
    sets: 2,
    reps: '8 each side',
    instructions: [
      'Start on hands and knees with one hand behind the head.',
      'Rotate the elbow toward the ceiling while hips stay square.',
      'Return slowly and keep the neck relaxed.'
    ],
    equipment: 'Mat',
    caloriesBurn: 35,
    image: '/assets/images/thoracic_rotation.jpeg',
    videoUrl: '/assets/videos/thoracic-rotation-tutorial.mp4'
  },
  {
    id: 'hip-flexor-stretch',
    name: 'Hip Flexor Stretch',
    category: 'Flexibility',
    muscleGroups: ['Legs', 'Core'],
    difficulty: 'Beginner',
    duration: 9,
    sets: 2,
    reps: '45 seconds each side',
    instructions: [
      'Kneel with the front foot planted and ribs stacked.',
      'Tuck the pelvis slightly before shifting forward.',
      'Reach the same-side arm overhead for a deeper stretch.'
    ],
    equipment: 'Mat',
    caloriesBurn: 28,
    image: '/assets/images/hip_flexor_stretch.jpeg',
    videoUrl: '/assets/videos/hip-flexor-stretch-tutorial.mp4'
  },
  {
    id: 'pigeon-pose',
    name: 'Pigeon Pose',
    category: 'Flexibility',
    muscleGroups: ['Legs', 'Back'],
    difficulty: 'Advanced',
    duration: 12,
    sets: 2,
    reps: '60 seconds each side',
    instructions: [
      'Bring one shin forward and extend the opposite leg behind you.',
      'Square the hips as much as comfortable.',
      'Fold forward only as far as you can breathe calmly.'
    ],
    equipment: 'Mat',
    caloriesBurn: 30,
    image: '/assets/images/pigeon_pose.jpeg',
    videoUrl: '/assets/videos/pigeon-pose-tutorial.mp4'
  },
  {
    id: 'single-leg-stand',
    name: 'Single-Leg Stand',
    category: 'Balance',
    muscleGroups: ['Legs', 'Core'],
    difficulty: 'Beginner',
    duration: 8,
    sets: 3,
    reps: '30 seconds each side',
    instructions: [
      'Stand tall and lightly brace your core.',
      'Lift one foot without leaning into the standing hip.',
      'Progress by turning your head or closing your eyes briefly.'
    ],
    equipment: 'Bodyweight',
    caloriesBurn: 35,
    image: '/assets/images/single_leg_stand.jpeg',
    videoUrl: '/assets/videos/single-leg-stand-tutorial.mp4'
  },
  {
    id: 'bosu-squat',
    name: 'BOSU Squat',
    category: 'Balance',
    muscleGroups: ['Legs', 'Core'],
    difficulty: 'Intermediate',
    duration: 12,
    sets: 3,
    reps: '10',
    instructions: [
      'Step onto the BOSU and find a stable stance.',
      'Squat slowly while knees track with toes.',
      'Stand with control and reset balance between reps.'
    ],
    equipment: 'BOSU trainer',
    caloriesBurn: 85,
    image: '/assets/images/bosusquat.jpg',
    videoUrl: '/assets/videos/bosusquats-tutorial.mp4'
  },
  {
    id: 'warrior-three',
    name: 'Warrior Three',
    category: 'Balance',
    muscleGroups: ['Legs', 'Core', 'Back'],
    difficulty: 'Intermediate',
    duration: 10,
    sets: 2,
    reps: '30 seconds each side',
    instructions: [
      'Shift weight to one foot and hinge forward from the hip.',
      'Reach arms forward or keep hands at the chest.',
      'Keep hips level while extending the back leg long.'
    ],
    equipment: 'Bodyweight',
    caloriesBurn: 45,
    image: '/assets/images/warrior_three.jpeg',
    videoUrl: '/assets/videos/warrior-three-tutorial.mp4'
  }
];
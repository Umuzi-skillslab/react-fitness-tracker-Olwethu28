# Fitness Tracker Planning Document

## Component Hierarchy Diagram

```text
App
  Navbar
  Routes
    Home -> Header, Card -> Badge, AudioPlayer -> Button
    ExercisesPage -> Header, ExerciseFilter -> SearchBar -> Button,
      ExerciseList -> ExerciseCard -> Card, Badge, Button
    ExerciseDetail -> Header, Card, VideoPlayer -> Button
    WorkoutPlannerPage -> Header, WorkoutPlanner -> Card, DayCard -> Card,
      Badge, Button, Modal
    HistoryPage -> Header, WorkoutLog -> Card, LogEntry -> Card, Badge, Button
    ProgressPage -> Header, ProgressChart -> Card, Badge
    NotFound -> Card, Button
  Footer
```

## Data Flow Diagram

```text
exercisesData -> App -> route pages -> feature components -> UI components
localStorage -> App state -> planner/history/progress pages
child form actions -> callback props -> App state update -> rerender siblings
```

## Components To Create

Navigation: Navbar. Exercise: ExerciseCard, ExerciseList, ExerciseDetail, ExerciseFilter. WorkoutPlanner: WorkoutPlanner, DayCard. WorkoutLog: WorkoutLog, LogEntry, ProgressChart. Media: VideoPlayer, AudioPlayer. UI: Button, Card, SearchBar, Loading, Modal, Badge. Common: Header, Footer. Pages: Home, ExercisesPage, WorkoutPlannerPage, HistoryPage, ProgressPage, NotFound.

## Props Flow Between Components

`App` passes `exercises`, `workoutPlan`, `workoutHistory`, and callback handlers into route pages. `ExercisesPage` passes filtered exercise arrays and add handlers into `ExerciseList`, then `ExerciseCard`. `ExerciseDetail` receives the exercise id from the route and calls `onAddExerciseToDay`. `WorkoutPlanner` passes each weekday array to `DayCard`; `DayCard` sends remove and preview actions back up. `HistoryPage` passes log data into `WorkoutLog`, which passes entries into `LogEntry`. `ProgressPage` sends plan and history data to `ProgressChart`. Shared UI components receive display props, children, and event handlers from all feature areas.

## State Management Strategy

`App` owns persisted state: weekly workout plan and workout history. `useEffect` hydrates them from localStorage, then saves future updates. Feature components own temporary UI state such as filters, search text, selected day, selected exercise, notes, modal preview, log form fields, sorting, loading/error flags, media play status, volume, and mobile menu state. This keeps sibling communication centralized through `App` while avoiding unnecessary global state.

## Testing Strategy

UI component tests verify rendering, props, children, variants, focus, keyboard, and click behavior. Exercise tests cover filtering, empty states, route params, detail rendering, and add-to-plan callbacks. Planner tests cover add, remove, preview modal, and weekday data flow. Workout log tests cover form submission, deletion, draft persistence, and history rendering. Progress tests cover totals, streak, calories, category mix, loading, empty, and error states. Routing tests cover all main routes and 404 rendering. Media tests cover video/audio controls and fallback-safe interactions.

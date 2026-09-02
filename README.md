# Fitness Tracker & Workout Planner

A React-based fitness tracker and workout planner that allows users to browse exercises, create weekly workout plans, log completed workouts, view workout history, and track their progress.

This project was developed as part of the **Umuzi Advanced Web Development** programme.

---

## Project Overview

The **Fitness Tracker & Workout Planner** is a web application designed to help users organise and manage their workouts.

The application provides users with an exercise library, a weekly workout planner, workout history, and progress tracking.

The project follows a feature-based React component architecture with reusable UI components and centralised application state.

The main application is located inside the `fitness-tracker` directory.

---

## Features

### Home

The Home page provides an introduction to the application and gives users access to the main fitness features.

---

### Exercise Library

Users can browse available exercises and interact with individual exercises.

The exercise section includes:

- Exercise filtering
- Exercise searching
- Exercise lists
- Individual exercise cards
- Exercise details
- Add-to-workout functionality

---

### Exercise Search & Filtering

The exercise filtering functionality allows users to narrow down the exercises displayed.

The feature uses:

- `ExerciseFilter`
- `SearchBar`
- Filtering functionality
- Search functionality

---

### Exercise Details

Users can select an exercise and view its detailed information.

The exercise detail section can include:

- Exercise information
- Exercise instructions
- Exercise media
- Add-to-workout functionality

---

### Exercise Videos

The application includes a `VideoPlayer` component for displaying exercise demonstration videos.

This allows users to visually understand how exercises should be performed.

---

### Motivational Audio

The application also includes an `AudioPlayer` component that provides motivational audio for users.

---

### Weekly Workout Planner

Users can create and manage a weekly workout plan.

The planner is organised around the days of the week:

```text
Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday
```

Users can:

- Add exercises to workout days
- Remove exercises
- Preview exercises
- View exercises assigned to specific days

The main planner components are:

- `WorkoutPlanner`
- `DayCard`
- `Modal`
- `Card`
- `Badge`
- `Button`

---

### Workout Logging

Users can record completed workouts.

The workout log functionality allows workout information to be stored and displayed as individual log entries.

The main components are:

- `WorkoutLog`
- `LogEntry`

---

### Workout History

The History page allows users to view previously completed workouts.

Workout history is shared application state and is persisted using browser `localStorage`.

---

### Progress Tracking

The Progress page displays progress information derived from the user's workout plan and workout history.

The main component responsible for this functionality is:

```text
ProgressChart
```

Progress information can include derived values such as:

- Workout totals
- Workout streaks
- Calories
- Category information

---

### Local Storage

The application uses browser `localStorage` to persist important workout information.

The main persisted state includes:

- Weekly workout plan
- Workout history

The general data flow is:

```text
localStorage
      ↓
   App State
      ↓
 Route Pages
      ↓
Feature Components
      ↓
Reusable UI
```

When the application state changes, `useEffect` is used to persist the updated information.

---

## Component Architecture

The project follows a feature-based React component structure.

```text
App
├── Navbar
├── Routes
│
├── Home
│   ├── Header
│   ├── Card
│   │   └── Badge
│   └── AudioPlayer
│       └── Button
│
├── ExercisesPage
│   ├── Header
│   ├── ExerciseFilter
│   │   ├── SearchBar
│   │   └── Button
│   └── ExerciseList
│       └── ExerciseCard
│           ├── Card
│           ├── Badge
│           └── Button
│
├── ExerciseDetail
│   ├── Header
│   ├── Card
│   └── VideoPlayer
│       └── Button
│
├── WorkoutPlannerPage
│   ├── Header
│   └── WorkoutPlanner
│       ├── Card
│       └── DayCard
│           ├── Card
│           ├── Badge
│           ├── Button
│           └── Modal
│
├── HistoryPage
│   ├── Header
│   └── WorkoutLog
│       └── LogEntry
│           ├── Card
│           ├── Badge
│           └── Button
│
├── ProgressPage
│   ├── Header
│   └── ProgressChart
│       ├── Card
│       └── Badge
│
├── NotFound
│   ├── Card
│   └── Button
│
└── Footer
```

---

## Project Structure

```text
react-fitness-tracker-Olwethu28/
│
├── .github/
│
├── fitness-tracker/
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── __tests__/
│   │   │
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── Exercise/
│   │   │   ├── Media/
│   │   │   ├── UI/
│   │   │   └── ...
│   │   │
│   │   ├── data/
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── utils/
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── setupTests.js
│   │   └── styles.css
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── PLANNING.md
│   └── vite.config.js
│
└── README.md
```

---

## Technologies Used

The project is built using:

- **React**
- **JavaScript**
- **React Router**
- **Vite**
- **HTML5**
- **CSS3**
- **PropTypes**
- **Vitest**
- **Local Storage**

---

## Data Flow

`App` is responsible for managing the shared workout state.

Exercise data flows into the application and is passed down through route pages and feature components.

User actions are communicated back to parent components using callback props.

```text
Exercise Data
     ↓
    App
     ↓
 Route Pages
     ↓
Feature Components
     ↓
Reusable UI
```

For example, when a user adds an exercise to their workout plan:

```text
ExerciseCard
     ↓
User selects "Add"
     ↓
Callback
     ↓
App State
     ↓
Workout Plan Updated
     ↓
WorkoutPlanner
     ↓
DayCard
```

This allows different pages to work with the same shared workout-plan state.

---

## State Management

The application separates **shared application state** from **local UI state**.

### Shared State

The following state is managed at the `App` level:

- `workoutPlan`
- `workoutHistory`

These values are persisted using `localStorage`.

### Local Component State

Components manage UI-specific state such as:

- Search text
- Filters
- Selected exercise
- Selected day
- Notes
- Modal state
- Workout-log form fields
- Sorting
- Loading states
- Error states
- Media playback state
- Volume state
- Mobile menu state

This keeps state close to the components that actually use it.

---

## Application Pages

| Page | Purpose |
|---|---|
| **Home** | Introduction and access to fitness features |
| **ExercisesPage** | Browse, search and filter exercises |
| **ExerciseDetail** | Display detailed information about an exercise |
| **WorkoutPlannerPage** | Create and manage a weekly workout plan |
| **HistoryPage** | View completed workout history |
| **ProgressPage** | Display workout progress |
| **NotFound** | Display a page for invalid routes |

---

## Testing

| Test File                       | Focus                                                         |
| ------------------------------- | ------------------------------------------------------------- |
| `data.test.js`                  | Exercise data and data validation                             |
| `exerciseFlow.test.jsx`         | Exercise searching, filtering, selection and adding exercises |
| `plannerLog.test.jsx`           | Workout planner and workout logging functionality             |
| `routingProgressMedia.test.jsx` | Routing, progress tracking and media components               |
| `storage.test.js`               | Local Storage functionality                                   |
| `ui.test.jsx`                   | Reusable UI components and user interactions                  |
-----

## Coverage Report

| Metric         |   Coverage |
| -------------- | ---------: |
| **Statements** | **94.17%** |
| **Branches**   | **85.71%** |
| **Functions**  | **74.22%** |
| **Lines**      | **94.17%** |


### Testing Areas

#### Reusable UI Components

Tests cover areas such as:

- Rendering
- Props
- Children
- Component variants
- Click behaviour
- Focus behaviour
- Keyboard interaction

#### Exercise Components

Tests cover:

- Searching
- Filtering
- Search results
- Empty states
- Exercise details
- Route parameters
- Add-to-plan callbacks

#### Workout Planner

Tests cover:

- Adding exercises
- Removing exercises
- Weekday data
- Planner updates
- Preview modal behaviour

#### Workout History

Tests cover:

- Workout form submission
- Workout deletion
- Log entry rendering
- History interactions

#### Progress

Tests cover:

- Progress information
- Totals
- Streak information
- Calories
- Category information
- Loading states
- Empty states
- Error states

#### Routing

Tests cover:

- Main routes
- Navigation
- Exercise detail routes
- `NotFound` / 404 behaviour

#### Media

Tests cover:

- Audio controls
- Video controls
- Fallback behaviour

#### Integration

The project also tests interactions between features.

For example:

```text
Exercise
    ↓
User adds exercise
    ↓
Callback
    ↓
App State
    ↓
Workout Planner
    ↓
Updated Workout Plan
```

---

## 🧪 Testing & Code Coverage

Testing is an important part of the Fitness Tracker & Workout Planner project. The application uses **Vitest** together with **Testing Library** to test components, user interactions, application logic, routing, local storage, and feature integration.

### Test Results

The current test suite contains **30 tests across 6 test files**, with all tests passing.

```text
Test Files  6 passed (6)
Tests       30 passed (30)
```
---

## Getting Started

### Prerequisites

Before running the project, make sure you have installed:

- Node.js
- npm
- Git

Check your installed versions:

```bash
node --version
npm --version
git --version
```

---

### 1. Clone the Repository

```bash
git clone https://github.com/Umuzi-skillslab/react-fitness-tracker-Olwethu28.git
```

---

### 2. Navigate to the Application

The React application is located inside the `fitness-tracker` directory.

```bash
cd react-fitness-tracker-Olwethu28/fitness-tracker
```

---

### 3. Install Dependencies

```bash
npm install
```

---

### 4. Start the Development Server

```bash
npm run dev
```

Vite will start the development server and provide a local URL in the terminal.

---

## 📜 Available Scripts

### Start Development Server

```bash
npm run dev
```

Starts the Vite development server.

### Start Development Server with Host Access

```bash
npm run dev:host
```

Starts Vite using:

```text
--host 0.0.0.0
```

### Build for Production

```bash
npm run build
```

Creates a production build of the application.

### Preview Production Build

```bash
npm run preview
```

Runs the production build locally.

### Run Tests

```bash
npm test
```

Runs the test suite.

### Run Tests in Watch Mode

```bash
npm run test:watch
```

Runs tests continuously while files are changed.

### Generate Test Coverage

```bash
npm run coverage
```

Runs the test suite with coverage reporting.

---

## Production Build

To create a production build:

```bash
npm run build
```

After building, you can preview the production version locally:

```bash
npm run preview
```

---

## Responsive Design

The application is designed to work across different screen sizes.

Responsive behaviour includes:

- Responsive navigation
- Mobile menu
- Flexible exercise cards
- Responsive workout planner
- Mobile-friendly controls
- Responsive media components

---

## Code Quality

The project includes ESLint configuration through:

```text
eslint.config.js
```

When contributing to the project, the following practices should be followed:

- Keep components focused on a single responsibility
- Reuse existing UI components
- Keep shared state in the appropriate parent component
- Keep UI-specific state close to the component that uses it
- Use PropTypes where appropriate
- Write tests for new functionality
- Avoid unnecessary duplication
- Consider accessibility when creating interactive elements

---

## Planning Documentation

The repository contains a `PLANNING.md` file that documents:

- Component hierarchy
- Component relationships
- Data flow
- Props flow
- State management
- Testing strategy

The planning document should be used as a reference when adding or modifying features.

---

## Learning Objectives

This project demonstrates practical experience with:

- React functional components
- React Hooks
- Props
- State management
- Callback functions
- Component composition
- React Router
- Conditional rendering
- Event handling
- Form handling
- Local Storage
- Multimedia integration
- Responsive design
- Automated testing
- Integration testing
- JavaScript modules
- Vite

---

## Author

**Olwethu Manqola**

Developed as part of the **Umuzi Advanced Web Development Programme**.

---

## Repository

[GitHub Repository](https://github.com/Umuzi-skillslab/react-fitness-tracker-Olwethu28)

---

## Built With

```text
React + JavaScript + Vite
```

Built with a focus on:

- Clean component architecture
- Reusable components
- State management
- User interaction
- Testing
- Responsive design
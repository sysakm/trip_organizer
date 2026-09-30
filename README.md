# Trip Organizer

A modern single-page application for planning trips and managing activities, budgets, and checklists.

## Key Features

- **Trip management (CRUD):** create, edit, delete, and view detailed trips.
- **Interactive timeline:** organize a trip day by day, attach locations and activities, and move activities between dates.
- **Smart location management:** automatically resolve overlapping location ranges by adjusting or splitting affected stays.
- **Budget and expense tracking:** compare planned costs with actual paid amounts and highlight budget overruns.
- **Task and packing checklist:** categorize items, mark them complete, and sort them by status.
- **Full-text search, filtering, and sorting:**
  - Search across trip names, activities, locations, expenses, and tasks.
  - Filter trips by status: all, current, completed, or future.
  - Sort by date, name, budget, or ID in ascending or descending order.
- **Automatic `localStorage` persistence:** save application state and safely deserialize stored data.
- **Form validation:** validate dates, prices, and budgets on the client.

## Technology Stack

- **Frontend:** [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build tool:** [Vite](https://vite.dev/)
- **Routing:** [React Router v7](https://reactrouter.com/) with the Data Router API
- **State management:** [Redux Toolkit](https://redux-toolkit.js.org/) with five slices and cross-slice `extraReducers`
- **Linting:** [Oxlint](https://oxc.rs/)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

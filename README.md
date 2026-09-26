# Jobboard

A modern job discovery and application dashboard built with Vue 3. Jobboard lets users browse vacancies, filter roles, save jobs, apply for positions, and manage application activity from a personal dashboard.

## Live project

- Repository: https://github.com/Jaydee00000007/Jobboard
- Live demo: Add your deployed URL here

## Core features

- Job search by title, company, category, and location
- Job category, employment type, experience, and salary filters
- Sorting and pagination
- Save and unsave jobs
- Job application flow
- User dashboard
- Application status tracking
- Notifications and messages
- Profile and preference settings
- Responsive UI
- Client-side state management

## Tech stack

- Vue 3
- Vite
- Vue Router
- Pinia
- Font Awesome
- JavaScript
- CSS

## Architecture

```text
src/
├── components/    # Reusable UI and feature components
├── views/         # Application pages
├── stores/        # Pinia state and business actions
├── router/        # Client-side routes
├── images/        # Project assets
└── main.js        # Application entry point
```

## Getting started

### Requirements

- Node.js 22+ recommended
- npm

### Installation

```bash
git clone https://github.com/Jaydee00000007/Jobboard.git
cd Jobboard
npm install
```

### Development

```bash
npm run dev
```

### Production build

```bash
npm run build
```

## Engineering notes

This project currently uses local demo data and client-side state. Authentication, persistence, API integration, automated tests, and backend services are the next production-readiness stage.

## What I learned

- Structuring a Vue application beyond a single page
- Managing shared application state with Pinia
- Building filtering and pagination logic
- Working with Vue Router
- Designing interactive dashboard workflows
- Separating UI concerns from application state

## Roadmap

- [x] Protected dashboard route
- [ ] Real authentication
- [ ] Backend/API integration
- [ ] Persistent user data
- [ ] TypeScript migration
- [ ] Unit and component testing
- [ ] ESLint and CI checks
- [ ] Improved accessibility
- [ ] Production deployment

## Author

**Jaydee Adeparusi**

Frontend Developer focused on building clean, practical, user-focused web applications.

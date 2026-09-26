# Job Hunt

A recruiter-style job discovery and application dashboard built with Vue 3, TypeScript, Pinia, and Vue Router.

Job Hunt demonstrates a production-minded frontend workflow: reusable components, typed domain models, client-side state management, protected routes, form validation, automated tests, linting, type checking, CI, and a production build.

## Highlights

- Search and filter job listings by role, company, category, location, employment type, experience, work mode, and salary range.
- Sort and paginate a large job dataset.
- Save and unsave jobs.
- Apply to roles and track application status.
- Dashboard with applications, saved jobs, messages, notifications, profile, and settings.
- Protected dashboard route with guest-only handling for the landing/auth screen.
- Persisted demo authentication session using browser storage.
- Accessible form labels, validation states, keyboard focus states, and semantic navigation.
- Responsive layouts for desktop and mobile.
- Automated store tests with Vitest.
- ESLint + TypeScript checking + production build validation.
- GitHub Actions CI pipeline.

## Tech stack

- Vue 3
- TypeScript
- Vite
- Vue Router
- Pinia
- Vitest
- ESLint
- Font Awesome
- CSS

## Architecture

```text
src/
├── components/       # Reusable UI and feature components
├── data/             # Typed demo job dataset
├── images/           # Optimized visual assets
├── router/           # Typed application routes and guards
├── services/         # Browser/API boundary services
├── stores/           # Pinia state and business actions
├── types/            # Domain and store TypeScript models
├── views/             # Route-level pages
└── main.ts            # Application entry point

tests/
└── jobhunt.test.ts   # Store behavior tests

.github/workflows/
└── ci.yml            # Automated quality pipeline
```

## Local development

### Requirements

- Node.js 22+
- npm

### Install

```bash
git clone https://github.com/Jaydee00000007/Jobboard.git
cd Jobboard
npm install
```

### Run locally

```bash
npm run dev
```

### Quality checks

Run the complete local validation pipeline:

```bash
npm run check
```

This runs:

1. ESLint
2. TypeScript/Vue type checking
3. Vitest tests
4. Production build

Individual commands:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Production architecture

The frontend is intentionally structured so the demo data and browser session can be replaced by a real API without rewriting the UI layer.

- `src/data/` contains the current demo dataset.
- `src/services/` contains integration boundaries such as authentication.
- `src/stores/` owns client-side application state and user actions.
- `src/types/` defines the contracts that an API client can implement.
- Route guards enforce the authenticated/guest navigation rules.

### Authentication note

Authentication is currently a **demo implementation**. The browser stores only a non-sensitive session profile; passwords are not stored by the application. A production deployment should replace this with server-side authentication, secure session handling, and an API/database.

## Testing

The current test suite covers:

- Initial dashboard state
- Application filtering
- Save/unsave behavior
- Job application flow
- Sign-in profile updates
- Notification state changes

CI runs the same quality checks on pushes and pull requests targeting the main branches.

## Performance

The primary logo asset was migrated from a roughly 1.4 MB PNG to an SVG asset that is approximately 90 KB in the production bundle, reducing the page's static asset weight substantially.

## Roadmap

- [x] Componentized job listing UI
- [x] Typed job and store models
- [x] Form validation and accessibility improvements
- [x] Protected routes
- [x] Persisted demo auth session
- [x] Unit/store tests
- [x] ESLint and TypeScript checks
- [x] GitHub Actions CI
- [x] Production build validation
- [ ] Real authentication/API
- [ ] Persistent backend database
- [ ] Component/e2e browser tests
- [ ] Production deployment

## Author

**Jaydee Adeparusi**

Frontend developer building practical, user-focused web applications with modern JavaScript and TypeScript tooling.

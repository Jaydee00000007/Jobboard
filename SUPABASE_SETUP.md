# Jobboard + Supabase

The Jobboard Supabase project is already provisioned. Project reference: `iidpbszanvvuclfcerbn`.

## Existing database schema

- `jobs`: public active job listings; read-only to browser clients
- `profiles`: private user profile details, created automatically on sign-up
- `saved_jobs`: each user's saved listing references
- `applications`: each user's applications and status

All four tables have Row Level Security enabled. Users can only access their own profile, saved jobs and applications. Job listings are readable by visitors. Do not expose a Supabase secret/service-role key in frontend code.

## Vite environment variables

Set these in local `.env` and the Vercel project:

```env
VITE_SUPABASE_URL=https://iidpbszanvvuclfcerbn.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY
```

Use the project's publishable key from Supabase **Connect** or **Settings → API Keys**. The older `VITE_SUPABASE_ANON_KEY` variable is accepted as a compatibility fallback.

## Authentication

Email/password sign-up and sign-in use Supabase Auth. Configure the Site URL and allowed redirect URLs in **Authentication → URL Configuration**. For immediate sign-in after registration, disable email confirmation; otherwise the UI needs an email-confirmation step.

## Job listings

The Job Listings page reads only active rows from `public.jobs`. The production page no longer falls back to bundled sample vacancies. The current database has no job rows, so visitors will see an empty-state message until verified listings are published.

Add only genuine vacancies with a source URL and an application URL where available. Do not copy the old sample dataset into the production table.

## Deployment

After merging the integration pull request, set the two Vercel variables and redeploy. Run the repository's `npm run check` in CI/local development before production release.

The integration now loads and persists profiles, saved jobs, applications, and user-managed application statuses. Saved-job and application records reference real `jobs` rows, so the app prevents writes against sample IDs by reading only published database records.

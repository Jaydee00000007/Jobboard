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

The Job Listings page requests active rows from `public.jobs`. If the table is empty or the request fails, the app currently falls back to the bundled demo listings. Do not treat those bundled demo listings as real postings. Add verified listings to `public.jobs` before switching off that fallback.

## Deployment

After merging the integration pull request, set the two Vercel variables and redeploy. Run the repository's `npm run check` in CI/local development before production release.

The current pass provisions the schema, connects auth, reads published job listings and saves profile edits. Persisting saved-job and application actions from the existing demo listings requires a follow-up: those local demo IDs are not rows in `public.jobs`, so they must not be written against the foreign keys until real listing records exist.

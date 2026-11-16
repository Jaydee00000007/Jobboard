# Supabase setup (Jobboard)

1. Create a Supabase project.
2. Open **SQL Editor**, paste and run `supabase/schema.sql`.
3. In **Project Settings → API**, copy the Project URL and publishable/anon key.
4. Add these Vite environment variables locally and in Vercel:

   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`

5. In **Authentication → URL Configuration**, set the Site URL to your deployed Jobboard URL and add your local and production callback/redirect URLs.
6. Deploy again after setting the variables.

The client uses Supabase Auth for email/password registration and sign-in. The SQL schema prepares isolated profile, saved-job and application tables with row-level security. Do not put a service-role key in the browser or Vercel's client-side variables.

Current migration scope: authentication is connected in code; the profile/saved-job/application tables are provisioned by the SQL script but still need to be wired to the dashboard store in a follow-up pass.

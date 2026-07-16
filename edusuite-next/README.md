# EduSuite (Next.js + Node + MySQL)

This is the Next.js/Node rewrite of the original ASP.NET Core MVC app
(`EduSuite.Data` / `EduSuite.Services` / `EduSuite.Web`). It's a single
full-stack Next.js app: React pages under `src/app/**` and the API layer as
Next.js Route Handlers under `src/app/api/**`, both running on Node.js. It
talks to the same MySQL schema the .NET app used, via a raw `mysql2` pool
(no ORM/migration tool).

## What moved where

| Old (.NET)                                   | New (Next.js)                                 |
|-----------------------------------------------|------------------------------------------------|
| `EduSuite.Data` (EF entities/DbContext)        | `src/lib/types.ts` + `src/lib/db.ts`            |
| `EduSuite.Services` (business logic)           | `src/lib/queries/*.ts`                          |
| `EduSuite.Web/Controllers`, `Areas/Alumni`     | `src/app/api/**/route.ts`                       |
| `.cshtml` Views                               | `src/app/**/page.tsx` + `src/components/*.tsx`  |
| Cookie auth + claims                           | Signed JWT in an httpOnly cookie (`src/lib/auth.ts`) |
| `wwwroot/css/*.css`                            | `src/app/(auth)/welcome.css`, `src/app/alumni/alumni.css` |

## Setup

1. Copy `.env.example` to `.env.local` and fill in your MySQL credentials
   and a random `SESSION_SECRET`:

   ```
   cp .env.example .env.local
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Run against the existing `edusuite_db` database (same schema as the
   .NET app — no migrations needed):

   ```
   npm run dev
   ```

   The app runs at http://localhost:3000 and redirects `/` to `/login`.

## Password hashing changed — one manual step required

The original app hashed passwords with unsalted SHA256. This rewrite uses
**bcrypt** instead, which is not backwards compatible: existing rows in the
`logins` table (there is currently one: `kamalzeus@gmail.com`) cannot log in
until their password is reset. Do that with:

```
npm run reset-password -- kamalzeus@gmail.com <new-password>
```

This updates `logins.PasswordHash` in place with a bcrypt hash. Run it once
per existing account after switching to this app.

## Optional profile fields (photo, higher studies, employment)

Beyond the original .NET app's fields, the Alumni form now has:

- **Profile Photo** — uploaded via `POST /api/upload` (multipart), stored on
  local disk under `public/uploads/alumni/` and served by Next.js as a static
  file. Accepts JPEG/PNG/WEBP/GIF up to 5MB. This is disk-based storage,
  fine for a single-server deployment; swap `src/app/api/upload/route.ts`
  for an S3/Blob upload if you deploy somewhere with an ephemeral or
  multi-instance filesystem.
- **Current Status** toggle (Studying / Working / Not specified) — a
  UI-only radio, not a stored column. It just decides which optional fields
  to show:
  - Studying → **College Name**, **Degree**
  - Working → **Company Name**, **Role**, **Location**

All six fields (`ImagePath`, `CollegeName`, `Degree`, `CompanyName`,
`JobRole`, `Location`) were added to `alumnis` via
`migrations/002_add_alumni_profile_fields.sql`. Apply it with:

```
npm run migrate
```

## Importing alumni data from CSV

Mirrors the original `AlumniService.ImportAlumniFromCsv` (which in the .NET
app was only reachable via a commented-out line, not a UI/API route):

```
npm run import-alumni-csv -- "C:\path\to\Alumni Data.csv" [departmentId] [batchId]
```

`departmentId`/`batchId` default to `1`, matching the original hardcoded
values.

## Notes on behavior differences from the original app

- **Route protection**: the .NET app only put `[Authorize]` on
  `DashboardController`, leaving `Alumni/Create` and `Alumni/Edit` technically
  reachable unauthenticated if you knew the URL. `src/middleware.ts` now
  guards the whole `/alumni/**` prefix.
- **Session expiry**: fixed 8-hour expiry, same as the original
  `ExpiresUtc = 8h`. The original also had `SlidingExpiration = true`
  (renewing on activity); this rewrite does not renew the session
  automatically — re-login is required after 8 hours regardless of activity.
- **Multi-select filters**: the original used jQuery + Select2; this uses
  `react-select`, which is the standard React equivalent.
- **Excel export**: the dashboard grid calls `gridApi.exportDataAsExcel(...)`
  same as the original AG Grid Community setup. Newer AG Grid versions may
  require an Enterprise license for this specific feature — CSV export
  (`exportDataAsCsv`) is unaffected and remains free.

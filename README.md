# MediGO

MediGO is a doctor appointment and video consultation platform built with Next.js. It supports patient onboarding, verified doctor profiles, specialty-based doctor discovery, credit-based appointment booking, Vonage video calls, doctor earnings, payout requests, and admin verification workflows.

## Features

- Clerk authentication with protected patient, doctor, admin, appointment, onboarding, and video-call routes
- Role onboarding for patients and doctors
- Doctor verification workflow managed by admins
- Specialty-based doctor browsing
- Doctor profile pages with availability and 30-minute slot booking
- Credit-based appointment payments: each appointment costs 2 credits
- Monthly credit allocation through Clerk plans
- Patient appointment history and cancellation
- Doctor dashboard for earnings, appointments, availability, notes, completion, and payout requests
- Admin dashboard for pending doctors, verified doctors, and pending payouts
- Vonage/OpenTok video sessions with generated access tokens
- PostgreSQL database access through Prisma and Neon
- Dark medical UI built with Tailwind CSS, shadcn-style components, Radix UI, and lucide-react icons

## Tech Stack

- Next.js 16 App Router
- React 19
- Clerk for authentication, users, and pricing table
- Prisma ORM with PostgreSQL
- Neon serverless database adapter
- Vonage Video API for consultations
- Tailwind CSS 4
- Radix UI and shadcn-style components
- Sonner toast notifications
- date-fns for scheduling utilities

## Project Structure

```text
app/                  Next.js routes and layouts
actions/              Server actions for onboarding, doctors, appointments, credits, payouts, and admin flows
components/           Shared UI and feature components
components/ui/        Reusable UI primitives
hooks/                Client hooks
lib/                  Prisma client, user sync helpers, static data, specialties, utilities
prisma/               Prisma schema and migrations
public/               Static assets
```

## Main Routes

| Route | Purpose |
| --- | --- |
| `/` | Landing page with product overview and pricing |
| `/sign-in` | Clerk sign-in |
| `/sign-up` | Clerk sign-up |
| `/onboarding` | Choose patient or doctor role |
| `/doctors` | Browse available specialties |
| `/doctors/[speciality]` | View verified doctors by specialty |
| `/doctors/[speciality]/[id]` | Doctor profile, slots, and appointment booking |
| `/appointments` | Patient appointment list |
| `/doctor` | Verified doctor dashboard |
| `/doctor/verification` | Doctor verification status page |
| `/admin` | Admin dashboard |
| `/pricing` | Clerk pricing table and credit package page |
| `/video-call` | Video consultation screen |

## User Roles

### Patient

Patients can browse doctors, buy or receive monthly credits through Clerk plans, book appointments, join eligible video calls, view appointments, and cancel scheduled bookings.

### Doctor

Doctors submit specialty, experience, credential URL, and profile description during onboarding. After admin verification, doctors can set availability, manage scheduled appointments, add notes, mark appointments completed, view earnings, and request payouts through PayPal email.

### Admin

Admins can approve or reject pending doctors, suspend or reactivate verified doctors, review pending payout requests, and mark payouts as processed.

## Credit and Payout Model

- Each patient appointment costs 2 credits.
- Booking deducts 2 credits from the patient and adds 2 credits to the doctor.
- Cancelling a scheduled appointment refunds the patient and reverses the doctor's earned credits.
- Doctor payout calculations use:
  - Total credit value: `$10` per credit
  - Platform fee: `$2` per credit
  - Doctor earnings: `$8` per credit
- Payouts are recorded in the database and require admin approval.

## Environment Variables

Create a `.env` file in the project root with these keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
NEXT_PUBLIC_VONAGE_APPLICATION_ID=
VONAGE_PRIVATE_KEY=
DATABASE_URL=
```

Notes:

- `DATABASE_URL` must point to a PostgreSQL database.
- `NEXT_PUBLIC_VONAGE_APPLICATION_ID` is used by both server actions and the browser video-call client.
- `VONAGE_PRIVATE_KEY` must contain the private key used to generate Vonage video sessions and tokens.
- Clerk plans referenced by the app are `free_user`, `standard`, and `premium`.

## Getting Started

Install dependencies:

```bash
npm install
```

Generate the Prisma client:

```bash
npx prisma generate
```

Apply database migrations:

```bash
npx prisma migrate dev
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

```bash
npm run dev      # Start the Next.js development server
npm run build    # Create a production build
npm run start    # Start the production server
npm run lint     # Run ESLint
```

The `postinstall` script also runs `prisma generate`.

## Database Models

The Prisma schema includes:

- `User`: Clerk-linked users with roles, credits, doctor profile fields, and verification status
- `Availability`: doctor availability windows
- `Appointment`: patient-doctor appointments with status, notes, and video session fields
- `CreditTransaction`: credit allocation, deduction, and admin adjustment records
- `Payout`: doctor payout requests and admin processing metadata

## Development Notes

- The app uses route groups under `app/(auth)` and `app/(main)`.
- Protected routes are enforced in `middleware.js`.
- User records are synchronized through `lib/checkUser.js` and Clerk auth state.
- Admin access depends on a database user having the `ADMIN` role.
- Doctor listings only show users with `role = DOCTOR` and `verificationStatus = VERIFIED`.
- Video calls are available only to the appointment's patient or doctor and only within 30 minutes before the scheduled start time.

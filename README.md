# VibeStall
# Buy and sell vibecoded apps with source code, keystore, and signatures.

## Tech Stack
- Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- Supabase (Auth, Database, Storage, Edge Functions)
- Lucide React (icons)
- Framer Motion (animations)
- Zod + React Hook Form (forms)
- Sonner (toasts)
- Recharts (analytics charts)

## Features
- 🔐 Authentication (login/signup) with Supabase Auth
- 👥 Role-based access control (buyer, seller, admin)
- 🛡️ Row Level Security (RLS) on all database tables
- 📱 Three dashboards: Buyer, Seller, Admin
- 📦 App upload with source code, keystore, and signature files
- 🔍 Automatic verification (keystore, signature, source code, virus scan)
- ✅ Admin approve/reject workflow
- 💳 Payment management with platform fees
- 🚫 User banning and moderation
- 📊 Analytics for all roles
- 🎨 Professional dark-mode design system

## Project Structure
```
src/
  app/              # Next.js App Router pages
  components/       # React components (ui, dashboard, app)
  lib/              # Supabase client, utilities
  hooks/            # Custom React hooks
  types/            # TypeScript type definitions
supabase/
  migrations/       # SQL database schema
  functions/        # Edge Functions for verification
```

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```

3. Configure your Supabase credentials in `.env.local`

4. Run the database migration in your Supabase project:
   ```bash
   # Apply supabase/migrations/001_initial_schema.sql
   ```

5. Create the storage bucket:
   ```sql
   -- In Supabase SQL Editor
   insert into storage.buckets (id, name, public) values ('app-files', 'app-files', true);
   ```

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open http://localhost:3000

## Routes
- `/` - Landing page
- `/marketplace` - Browse apps
- `/auth/login` - Sign in
- `/auth/signup` - Sign up
- `/dashboard/buyer` - Buyer dashboard
- `/dashboard/buyer/purchases` - My purchases
- `/dashboard/buyer/analytics` - Buyer analytics
- `/dashboard/seller` - Seller dashboard
- `/dashboard/seller/upload` - Upload app
- `/dashboard/seller/apps` - My apps
- `/dashboard/seller/sales` - Sales
- `/dashboard/admin` - Admin dashboard
- `/dashboard/admin/apps` - Manage apps
- `/dashboard/admin/users` - Manage users
- `/dashboard/admin/payments` - Manage payments
- `/dashboard/admin/bans` - Manage bans
- `/dashboard/admin/analytics` - Platform analytics

## Security
- All routes are protected by Supabase Auth
- Row Level Security (RLS) enforces data access rules
- Admin-only routes verify `role = 'admin'`
- App verification is automated before publishing
- File uploads are stored in Supabase Storage

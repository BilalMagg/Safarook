# Safarook Backend

Express + TypeScript starter for Safarook.

Quick start

1. Install dependencies

```bash
cd backend
npm install
```

2. Copy `.env.example` to `.env` and edit

3. Run in dev mode

```bash
npm run dev
```

API

- `GET /` health
- `POST /api/auth/register` register (body: `{ email }`)
- `POST /api/auth/login` login (body: `{ email }`)
- `GET /api/auth/me` sample user

Extend controllers to hook into your DB or Supabase.

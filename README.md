# Analytics Dashboard

A full-stack analytics dashboard built with Next.js, TypeScript, PostgreSQL, and Prisma.

## Features

- Analytics and interactive charts
- User authentication
- PostgreSQL database with Prisma
- Responsive dashboard UI
- Data fetching with TanStack Query
- Input validation with Zod

## Tech Stack

- Next.js
- TypeScript
- PostgreSQL
- Prisma
- Tailwind CSS
- TanStack Query
- Recharts
- Better Auth

## Getting Started

```bash
git clone https://github.com/kaze1-dev/Analytics_Dashboard.git
cd Analytics_Dashboard
npm install
```

Create a `.env` file and add your database URL:

```env
DATABASE_URL="your_database_url"
```

Then run:

```bash
npx prisma migrate dev
npm run dev
```

Open `http://localhost:3000` to view the application.

## Live Demo

https://analytics-dashboard-nu-mocha.vercel.app/

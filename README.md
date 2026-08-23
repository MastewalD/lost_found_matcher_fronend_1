# Lost & Found Matcher

Lost & Found Matcher is a Next.js web app for connecting people with lost and
found items. Submit the details of an item to search for likely matches, or
report an item so it can be discovered later.

## Features

- Search for matching lost items using item details.
- Submit lost or found item reports.
- See match confidence, match strength, and the signals behind each result.
- Validate report data in the browser before submitting it.
- Use a responsive interface on desktop and mobile.

## Tech Stack

- [Next.js](https://nextjs.org/) 16 with the App Router
- React 19 and TypeScript
- Redux Toolkit Query for API requests and caching
- React Hook Form and Zod for form state and validation
- Tailwind CSS 4 and shadcn/ui-inspired components

## Requirements

- Node.js 20 or newer
- npm
- A running Lost & Found API that exposes the endpoints listed below

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a local environment file named `.env.local`:

   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:4000
   ```

   Set the value to the base URL of your backend API. The frontend appends
   `/reports` and `/reports/matches` to this value.

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Application Routes

| Route | Purpose |
| --- | --- |
| `/` | Enter lost-item details and search for matches |
| `/report` | Submit a lost or found item report |

## API Contract

Requests are made relative to `NEXT_PUBLIC_BASE_URL`:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/reports` | Create a lost or found item report |
| `POST` | `/reports/matches` | Find reports matching a lost item |
| `GET` | `/reports` | Retrieve reports with `limit` and `offset` parameters |
| `GET` | `/reports/:id` | Retrieve one report |

Report submissions contain these fields:

```json
{
  "type": "LOST",
  "itemName": "Black wallet",
  "description": "Leather wallet with three cards",
  "category": "ACCESSORY",
  "color": "Black",
  "location": "Central Station",
  "reportedAt": "2026-08-23T12:00:00.000Z"
}
```

`type` must be `LOST` or `FOUND`. Supported categories are `ELECTRONICS`,
`BAG`, `CLOTHING`, `ACCESSORY`, `DOCUMENT`, and `OTHER`. Item names must be
3-50 characters, descriptions must be 3-200 characters, and `reportedAt`
must be an ISO 8601 date-time string.

## Project Structure

```text
app/                 Next.js routes, layout, styles, and manifest
components/          Forms and reusable UI components
lib/                 Shared schemas and utilities
redux/               Redux store and RTK Query API services
fonts/               Application font configuration
public/              Static assets
types/               Shared TypeScript declarations
```

## Production

Build and run the app with:

```bash
npm run build
npm run start
```

Configure `NEXT_PUBLIC_BASE_URL` in the production environment before
building. Because it is a public Next.js variable, it is embedded into the
client bundle at build time; rebuild the app after changing it.
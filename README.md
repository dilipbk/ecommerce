# React Ecommerce

A full-stack ecommerce example app for learners:

- **`server/`** — REST API built with [Hono](https://hono.dev/), TypeScript, the built-in `node:sqlite` module (raw SQL, no ORM), and JWT auth.
- **`client/`** — React + Vite + Tailwind frontend (React Query, React Router).

This guide walks through setting up and running **both the backend and the frontend** step by step. For the full API reference and backend architecture notes, see [`server/README.md`](server/README.md).

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | **22 or newer** | Required for the built-in `node:sqlite` module |
| **npm** | 9+ | Ships with Node.js — nothing extra to install |

Check your Node version:

```bash
node --version   # must be v22.x or higher
```

The app has two parts that run side by side: the **API** on `http://localhost:8000` and the **web client** on `http://localhost:5173`. Set up the server first, then the client.

---

## Part 1 — Server setup (step by step)

All commands below are run from the **`server/`** directory.

### 1. Go into the server folder

```bash
cd server
```

### 2. Install dependencies

```bash
npm install
```

> There is no native SQLite dependency to compile — the database uses Node's built-in `node:sqlite`.

### 3. (Optional) Configure environment variables

The app runs with sensible defaults, so this step is optional in development. To customize, copy the example file and edit it:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8000` | Port the API listens on |
| `JWT_SECRET` | `dev-secret-change-me` | Secret used to sign JWTs. **Required (min 32 chars) in production** |
| `DB_PATH` | `./ecommerce.db` | Path to the SQLite database file |

### 4. Create the database schema (run migrations)

```bash
npm run db:migrate
```

This creates the SQLite tables: `users`, `categories`, `products`, `cart_items`, `orders`, `order_items`.

### 5. Seed demo data

```bash
npm run db:seed
```

This adds two demo users, sample categories, and products so you can log in and browse immediately.

**Demo credentials:**

| Role | Email | Password |
|------|-------|----------|
| Customer | `customer@example.com` | `customer123` |
| Admin | `admin@example.com` | `admin123` |

### 6. Start the API

```bash
npm run dev
```

The API is now running at **http://localhost:8000**. Verify it:

```bash
curl http://localhost:8000/api/health
# {"status":"ok"}
```

Leave this running and open a **new terminal** for the client.

---

## Part 2 — Client setup (step by step)

All commands below are run from the **`client/`** directory.

### 1. Go into the client folder

```bash
cd client
```

### 2. Install dependencies

```bash
npm install
```

### 3. (Optional) Point the client at the API

The client defaults to `http://localhost:8000`. To override, copy the example env file and edit it:

```bash
cp .env.example .env
```

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `http://localhost:8000` | Base URL of the backend API |

### 4. Start the web client

```bash
npm run dev
```

Open **http://localhost:5173**. With the API running (Part 1), you can browse products, filter by category, log in with the demo credentials, add to cart, and check out.

---

## Running the full app

Use two terminals:

```bash
# terminal 1 — API
cd server && npm run dev      # http://localhost:8000

# terminal 2 — web client
cd client && npm run dev      # http://localhost:5173
```

Then visit **http://localhost:5173** and log in as `customer@example.com` / `customer123`.

---

## Quick API smoke test

With the server running, you can exercise the full flow from the command line:

```bash
# List products (public)
curl http://localhost:8000/api/products

# Log in and capture the token
TOKEN=$(curl -s -X POST http://localhost:8000/api/auth/login \
  -H 'content-type: application/json' \
  -d '{"email":"customer@example.com","password":"customer123"}' \
  | sed 's/.*"token":"\([^"]*\)".*/\1/')

# Add an item to the cart
curl -X POST http://localhost:8000/api/cart/items \
  -H "authorization: Bearer $TOKEN" \
  -H 'content-type: application/json' \
  -d '{"productId":1,"quantity":2}'

# Check out
curl -X POST http://localhost:8000/api/orders/checkout \
  -H "authorization: Bearer $TOKEN"
```

The complete endpoint list is documented in [`server/README.md`](server/README.md).

---

## Scripts reference

### Server (`server/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the API with hot reload |
| `npm run build` | Compile TypeScript to `dist/` (copies SQL migrations too) |
| `npm start` | Run the compiled API from `dist/` |
| `npm run db:migrate` | Apply database migrations |
| `npm run db:seed` | Reset and seed demo data |
| `npm test` | Run the test suite (Vitest) |

### Client (`client/`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Lint the source |

---

## Notes

- **Node 22+ required.** The backend uses Node's built-in `node:sqlite`, which is still marked experimental, so the run scripts pass `--disable-warning=ExperimentalWarning` to keep output clean.
- The SQLite database file (`ecommerce.db`) is git-ignored — it is created locally by `npm run db:migrate`.
- The client expects the API to be running; start the server before (or alongside) the client.

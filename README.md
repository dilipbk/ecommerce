# React Ecommerce

A full-stack ecommerce example app for learners:

- **`server/`** — REST API built with [Hono](https://hono.dev/), TypeScript, the built-in `node:sqlite` module (raw SQL, no ORM), and JWT auth.
- **`client/`** — React + Vite frontend.

This guide walks through setting up and running the **backend server** step by step. For the full API reference and architecture notes, see [`server/README.md`](server/README.md).

---

## Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| **Node.js** | **22 or newer** | Required for the built-in `node:sqlite` module |
| **pnpm** | 8+ | Package manager for the server (`npm i -g pnpm`) |

Check your Node version:

```bash
node --version   # must be v22.x or higher
```

---

## Server setup (step by step)

All commands below are run from the **`server/`** directory.

### 1. Go into the server folder

```bash
cd server
```

### 2. Install dependencies

```bash
pnpm install
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
pnpm db:migrate
```

This creates the SQLite tables: `users`, `categories`, `products`, `cart_items`, `orders`, `order_items`.

### 5. Seed demo data

```bash
pnpm db:seed
```

This adds two demo users, sample categories, and products so you can log in and browse immediately.

**Demo credentials:**

| Role | Email | Password |
|------|-------|----------|
| Customer | `customer@example.com` | `customer123` |
| Admin | `admin@example.com` | `admin123` |

### 6. Start the development server

```bash
pnpm dev
```

The API is now running at **http://localhost:8000**. Verify it:

```bash
curl http://localhost:8000/api/health
# {"status":"ok"}
```

### 7. Run the tests (optional)

```bash
pnpm test
```

---

## Quick API smoke test

With the server running (`pnpm dev`), try the full flow:

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

## Server scripts reference

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the dev server with hot reload |
| `pnpm build` | Compile TypeScript to `dist/` (copies SQL migrations too) |
| `pnpm start` | Run the compiled server from `dist/` |
| `pnpm db:migrate` | Apply database migrations |
| `pnpm db:seed` | Reset and seed demo data |
| `pnpm test` | Run the test suite (Vitest) |

---

## Frontend (client)

The React frontend lives in [`client/`](client/) and uses **npm**:

```bash
cd client
npm install
npm run dev      # starts the Vite dev server
```

---

## Notes

- **Node 22+ required.** The backend uses Node's built-in `node:sqlite`, which is still marked experimental, so the run scripts pass `--disable-warning=ExperimentalWarning` to keep output clean.
- The SQLite database file (`ecommerce.db`) is git-ignored — it is created locally by `pnpm db:migrate`.

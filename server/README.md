# Backend

Hono-based REST API for the ecommerce platform, built with TypeScript, better-sqlite3, and Zod validation.

See the full design spec at [`docs/superpowers/specs/2026-06-21-hono-ecommerce-backend-structure-design.md`](../docs/superpowers/specs/2026-06-21-hono-ecommerce-backend-structure-design.md).

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run migrations

Creates the SQLite schema (users, categories, products, cart, orders):

```bash
pnpm db:migrate
```

### Seed demo data

Populates the database with demo users, categories, and products:

```bash
pnpm db:seed
```

### Start dev server

```bash
pnpm dev
```

The server listens on `http://localhost:8000`.

### Run tests

```bash
pnpm test
```

### Build for production

```bash
pnpm build
```

Compiles TypeScript and copies SQL migration files into `dist/`.

## Demo Credentials

| Email                    | Password    | Role     |
|--------------------------|-------------|----------|
| admin@example.com        | admin123    | admin    |
| customer@example.com     | customer123 | customer |

## API Endpoints

All endpoints are mounted under `/api`.

### Auth

| Method | Path               | Auth | Description           |
|--------|--------------------|------|-----------------------|
| POST   | /api/auth/login    | No   | Login, returns JWT    |

### Users

| Method | Path               | Auth     | Description           |
|--------|--------------------|----------|-----------------------|
| GET    | /api/users/me      | Required | Get current user info |

### Categories

| Method | Path                    | Auth  | Description           |
|--------|-------------------------|-------|-----------------------|
| GET    | /api/categories         | No    | List all categories   |
| POST   | /api/categories         | Admin | Create category       |
| DELETE | /api/categories/:id     | Admin | Delete category       |

### Products

| Method | Path                    | Auth  | Description           |
|--------|-------------------------|-------|-----------------------|
| GET    | /api/products           | No    | List all products     |
| GET    | /api/products/:id       | No    | Get single product    |
| POST   | /api/products           | Admin | Create product        |
| PUT    | /api/products/:id       | Admin | Update product        |
| DELETE | /api/products/:id       | Admin | Delete product        |

### Cart

| Method | Path                    | Auth     | Description           |
|--------|-------------------------|----------|-----------------------|
| GET    | /api/cart               | Required | View cart             |
| POST   | /api/cart/items         | Required | Add item to cart      |
| DELETE | /api/cart/items/:id     | Required | Remove item from cart |

### Orders

| Method | Path                    | Auth     | Description           |
|--------|-------------------------|----------|-----------------------|
| GET    | /api/orders             | Required | List my orders        |
| GET    | /api/orders/:id         | Required | Get order by ID       |
| POST   | /api/orders/checkout    | Required | Checkout (cart→order) |

## Folder Structure

```
server/
  src/
    app.ts              # Hono app factory with all routes + error handler
    index.ts            # Node server entry point
    config/
      env.ts            # Environment variable validation (Zod)
    db/
      connection.ts     # SQLite connection (better-sqlite3)
      migrate.ts        # Migration runner
      seed.ts           # Demo data seeder
      migrations/       # SQL migration files (001_users.sql, ...)
    lib/
      password.ts       # scrypt hash/verify
      jwt.ts            # JWT sign/verify
    middleware/
      auth.ts           # Bearer token → context user
    modules/
      auth/             # login handler + service
      users/            # /users/me handler + repository
      categories/       # CRUD handlers + repository
      products/         # CRUD handlers + repository + service
      cart/             # cart handlers + repository
      orders/           # checkout + list handlers + repository
    test/
      db.ts             # In-memory DB helper for tests
```

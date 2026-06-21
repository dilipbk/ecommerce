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

All endpoints are mounted under `/api`. "Bearer" means the request must include an `Authorization: Bearer <token>` header with a JWT obtained from the login endpoint.

> **Note on admin access:** A seeded `admin` user exists (see Demo Credentials below) but no admin-only management endpoints are implemented in this scaffold. Both roles have identical API access.

| Method | Path                        | Auth   | Description                                                         |
|--------|-----------------------------|--------|---------------------------------------------------------------------|
| GET    | /api/health                 | public | Health check — returns `{ "status": "ok" }`                        |
| POST   | /api/auth/login             | public | Log in with email + password — returns `{ token, user }`           |
| GET    | /api/users/me               | Bearer | Current user profile                                                |
| GET    | /api/categories             | public | List all categories                                                 |
| GET    | /api/products               | public | List products; optional `?categoryId=<id>` filter                  |
| GET    | /api/products/:id           | public | Get one product by id                                               |
| GET    | /api/cart                   | Bearer | Get current user's cart with `totalCents`                           |
| POST   | /api/cart/items             | Bearer | Add/replace a cart item — body `{ productId, quantity }`           |
| DELETE | /api/cart/items/:productId  | Bearer | Remove a product from the cart (keyed by **productId**, not item id)|
| POST   | /api/orders/checkout        | Bearer | Check out the cart — creates an order (HTTP 201)                    |
| GET    | /api/orders                 | Bearer | List the current user's orders                                      |

## Extending this app (not yet implemented)

The routes above are the complete scaffold. The following are suggested exercises — they are **not built**:

- `POST /api/auth/register` — user self-registration
- `GET /api/products?search=<term>` — full-text product search
- Admin product CRUD: `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`
- Admin category management: `POST /api/categories`, `DELETE /api/categories/:id`
- `GET /api/orders/:id` — fetch a single order by id
- Order status transitions (e.g. pending → shipped → delivered)

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

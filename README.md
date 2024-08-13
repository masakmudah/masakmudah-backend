# MasakMudah Backend

MasakMudah REST API is a web service that provides access to a large collection of recipe. It allows users to search for recipe, retrieve recipe details, and publish own recipe also saving another user recipe.

## Tech Stack

- [Hono](https://hono.dev/) over [Bun](https://bun.sh/) runtime
- [Typescript](https://www.typescriptlang.org/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Render](https://render.com/)
- [Neon](https://neon.tech/)

## API Specification

The OpenAPI Specification for the MasakMudah API offers a detailed description of the API's services. It can be accessed at the path `/api-spec`.

For a more interactive experience, you can use SwaggerUI. It provides a user-friendly interface for exploring and testing the API. You can access SwaggerUI at `/ui`.

You can also access the following:

- OpenAPI Specification: https://api.masakmudah.com/api-spec
- SwaggerUI: https://api.masakmudah.com/ui

## Database Design

To view the latest database design in more detail, you can navigate to the following link: [ERD](https://dbdocs.io/masakmudah.com/masakmudah)

![ERD](./assets/erd.svg)

## Getting Started

Set up `.env` by copying from `.env.example` for reference

```sh
cp .env.example .env
```

Install dependencies

```sh
bun install
```

Run DB migration

```sh
bun run migrate:dev
```

Then you can run

```sh
bun run dev
```

Afterwards, open your browser and navigate to http://localhost:3000 to start exploring the API.

## Auth:

| Endpoint         | HTTP | Permission    |
| ---------------- | ---- | ------------- |
| /users           | GET  | Public        |
| /users/:username | GET  | Public        |
| /auth/register   | POST | Public        |
| /auth/login      | POST | Public        |
| /auth/me         | GET  | Authenticated |
| /auth/logout     | POST | Authenticated |

# Categories CRUD

| Endpoint                  | HTTP   | Permission     |
| ------------------------- | ------ | -------------- |
| /categories               | GET    | Public / local |
| /categories/allCategories | GET    | Public         |
| /categories/create        | POST   | Authenticated  |
| /categories/:id           | PUT    | Authenticated  |
| /categories/:id           | DELETE | Authenticated  |

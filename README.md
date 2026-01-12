# Auth API

Simple authentication API built with Node.js and PostgreSQL.

## Features
- User registration
- User login
- Password hashing with bcrypt
- JWT authentication
- Protected profile route

## Tech Stack
- Node.js
- Express
- PostgreSQL
- bcrypt
- jsonwebtoken

## Endpoints

### POST /auth/register
### POST /auth/login
### GET /profile (Bearer Token)

## Setup

```bash
npm install

Create .env file:

PORT=3000
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_PORT=
DB_NAME=
SECRET_KEY=

Run:

npm run dev

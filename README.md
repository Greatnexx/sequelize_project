# Authentication API

Simple authentication API using Express, Sequelize, and Redis.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Update `.env` file with your database and Redis credentials

3. Make sure MySQL and Redis are running

4. Start the server:
```bash
npm run dev
```

## Endpoints

### POST /api/auth/register
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### POST /api/auth/login
Login user
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
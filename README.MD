# Backend Development with Express, TypeScript, and PostgreSQL


Technologies.

- Express.js
- TypeScript.
- PostgreSQL.

## Features

- Clone the repository and run the SQL queries from db/database.sql in your PostgreSQL server.
- Rename 
```sh
.env.example to .env
``` 
and configure your environment variables.
- Import the Postman collection express-ts-pg-restapi.postman_collection.json from the project.
- Test the user endpoints using Postman at http://localhost:4000/.


## Installation

Install dependencies and start the development server:

```sh
npm i
npm run dev
```

## Project Includes

### Database
- PostgreSQL with Users and Wallets tables.

### Api
- User registration and login and logout endpoints with authentication.
- Full CRUD endpoints for Users and Wallets (protected by authentication).

### Auth & Security
- JWT-based authentication.
- Password encryption with bcrypt.

### Error Handling
- Validation for email format and password.
- Returns appropriate HTTP status codes for errors.



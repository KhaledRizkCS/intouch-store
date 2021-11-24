# Intouch Store Backend

This is a test project that functions as an Express-based backend to implement the following features in an e-commerce context:
- Show products using mock data
- Add and Remove products to shopping cart
- Save shopping cart in case of closing web browser
- Show Ratings and Reviews

It uses PostgreSQL DB through Sequelize ORM and utilizes Jest for testing and Swagger for API documentation.

## Get Started

### Clone The Repo

```shell
git clone https://github.com/TheKhaledRizk/intouch-store-backend
cd intouch-store-backend
```

### Install NPM Packages & Run The App

Create your `.env` files using `.env.example` as an example. It has to contain your PostgreSQL DB information.

Afterwards, install the `npm` packages described in the `package.json`:

```shell
npm install
```

Afterwards, populate your PostgreSQL DB and run the app:

```shell
npm run migrate
npm run seed
npm install
```

#### NPM Commands

- `npm start` - Serves the server located in `./bin/www` through nodemon and restarts the app on file changes. 
- `npm test` - Run unit tests in the app using Jest.
- `npm run test:watch` - Run unit tests in the app using Jest and restarts on file changes.
- `npm run make-model` - Generates a Sequelize model.
- `npm run migrate` - Run the project migrations files.
- `npm run make-seed` - Generates a new seed file.
- `npm run seed` - Run the project seed files.
- `npm run drop-migrate` - Reverts the DB to its initial state.
- `npm run drop-seed` - Empties the DB tables.

## API Documentation

|/api/   |GET /   |POST /   |GET /:id   |PATCH /:id   |DELETE /:id   |
|---|---|---|---|---|---|
|product   |✅   |   |✅   |   |   |

A Swagger UI documentation is also provided on the /docs route in development mode.
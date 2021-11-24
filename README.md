# Intouch Store

This is a test project that implements the following features in an e-commerce context using Angular 11, Express and PortgreSQL:
- Show products using mock data
- Add and Remove products to shopping cart
- Save shopping cart in case of closing web browser
- Show Ratings and Reviews

It does that using a module of 6 components, 2 services, and a utilization of unit testing using Karma & Jasmine on the front-end side, and utilization of PostgreSQL DB through Sequelize ORM, Jest for testing and Swagger for API documentation on the back-end side.

**Demo:** http://3.145.60.54/

## Get Started

### Clone The Repo

```shell
git clone https://github.com/TheKhaledRizk/intouch-store
cd intouch-store
```
## Front-end

### Install NPM Packages & Run The App

Install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
ng serve
```

#### Angular CLI Commands

* `ng serve` - Builds and serves the app and rebuilds on file changes.
* `ng build` - Compiles the app into dist/intouch-store.
* `ng lint` - runs `tslint` on the project files.
* `ng test` - Runs unit tests in the app using Karma and Jasmine. Rerun on file changes.

### Structure Overview

**Component Structure:**

- **AppComponent**: loads the DOM for *NavbarComponent* and *FooterComponent* in addition to the router outlet, changing which component is loaded based on the path.
- **ProductsComponent**: receives  the products array from the *ProductService* and creates an instance of the *ProductItemComponent* for each product and calls the *CartService* to add a product to the cart when it receives the *clickButton* emit from a *ProductItemComponent*.
- **ProductItemComponent**: receives a product and renders it in the DOM, emits the clickButton event to the *ProductsComponent* when the user clicks "Add To Cart" and routes to the *ProductPageComponent* of the product when the user clicks on the product name.
- **ProductPageComponent**: gets a specific product from the *ProductService* based on the id it receives  from the router params and renders it in the DOM and calls the *CartService* to add a product to the cart when the user clicks "Add To Cart".
- **NavbarComponent**: renders the navbar including the cart dropdown and subscribes to the *CartService* to get the *cartItems*.
- **FooterComponent**: renders the static footer.

**Service Structure:**

- **ProductService**: servers either an array of all the products or a specific product retrieved by ID, bot retrieved from the backend through HttpClient.
- **CartService**: serves the `cartItems` object, manages its modification, and store it to localstorage on change to read it from there after browser closing.

**Page Structure:**

- *Main page (URL: / )*
    - List all the products
    - Allow the user to add a product to the cart.
- *Product page (URL: /product/:id )*
    - Shows the details of a single product retrieved by id.
    - Allow the user to add the product to the cart with the option to specify  the quantity.

## Back-end

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

### API Documentation

|/api/   |GET /   |POST /   |GET /:id   |PATCH /:id   |DELETE /:id   |
|---|---|---|---|---|---|
|product   |✅   |   |✅   |   |   |

A Swagger UI documentation is also provided on the /docs route.

**Demo:** http://3.145.60.54:3000/docs
# Intouch Store

This is a test project that implements the following features in an e-commerce context using Angular 11:
- Show products using mock data
- Add and Remove products to shopping cart
- Save shopping cart in case of closing web browser
- Show Ratings and Reviews

It does that using a module of 6 components, 2 services, and a utilization of unit testing using Karma & Jasmine. It integrates with an Express.JS/PostgreSQL based backend.

## Get Started

### Clone The Repo

```shell
git clone https://github.com/TheKhaledRizk/intouch-store
cd intouch-store
```

### Install NPM Packages & Run The App

Create your `src/environments/environment.ts` and `src/environments/environment.prod.ts` files using `src/environments/environment.example.ts` as an example.

Afterwards, install the `npm` packages described in the `package.json` and verify that it works:

```shell
npm install
ng serve
```

#### Angular CLI Commands

* `ng serve` - Builds and serves the app and rebuilds on file changes.
* `ng build` - Compiles the app into dist/intouch-store.
* `ng lint` - runs `tslint` on the project files.
* `ng test` - Runs unit tests in the app using Karma and Jasmine. Rerun on file changes.

## Structure Overview

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

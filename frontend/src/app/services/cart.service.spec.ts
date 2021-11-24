import { TestBed } from '@angular/core/testing';
import * as faker from 'faker';

import { CartService } from './cart.service';
import { Product } from '../models/Product';

describe('CartService', () => {
  let service: CartService;
  let product: Product;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    // prepare the mock product array
    product = {
      id: faker.datatype.number(),
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: parseInt(faker.commerce.price(), 10),
      image: 'https://picsum.photos/640/480',
      reviews: [],
    };

    const numberOfReviews = Math.floor(Math.random() * 6);
    for (let i = 0; i < numberOfReviews; i++) {
      product.reviews.push({
        body: faker.lorem.sentence(),
        rating: Math.floor(Math.random() * 6),
      });
    }

    localStorage.removeItem('cartItems');

    service = TestBed.inject(CartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add the product to the cartItems when recieved in addToCart()', () => {
    service.addToCart(product);
    expect(service.getCartItems()).toContain(product);
  });

  it('should add the product n times to the cartItems if amount n was specified in addToCart()', () => {
    service.addToCart(product, 5);
    expect(service.getCartItems()).toContain(product);
    expect(service.getCartItems().length).toEqual(5);
  });

  it('should save cartItems to localstorage after each addToCart()', () => {
    service.addToCart(product);
    expect(JSON.parse(localStorage.getItem('cartItems') || '[]')).toContain(
      product
    );
  });

  it('should return the onChange() observable each time a new product is added', () => {
    service.onChange().subscribe((value) => {
      expect(value).toContain(product);
    });

    service.addToCart(product);
  });

  it('should return the onChange() observable each time a product is removed', () => {
    service.onChange().subscribe((value) => {
      expect(value);
    });

    service.removeCartItem(0);
  });
});

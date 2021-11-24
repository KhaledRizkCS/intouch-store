import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import * as faker from 'faker';

import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

import { ProductPageComponent } from './product-page.component';
import { Product } from 'src/app/models/Product';

describe('ProductPageComponent', () => {
  let component: ProductPageComponent;
  let fixture: ComponentFixture<ProductPageComponent>;
  let product: Product;
  let productService: ProductService;
  let cartService: CartService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductPageComponent],
      imports: [HttpClientTestingModule, RouterTestingModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPageComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService);

    // prepare the mock product object
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

    spyOn(component['route'].snapshot.paramMap, 'get').and.callFake(() => {
      return product.id.toString();
    });

    spyOn(productService, 'getProduct').and.returnValue(of(product));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the product object with the correct data', () => {
    expect(component.product).toEqual(product);
  });

  it('should render the product object in the tempelate', () => {
    const nativeElement = fixture.nativeElement;

    expect(nativeElement.querySelector('#product-image').src).toContain(
      product.image
    );
    expect(nativeElement.querySelector('#product-name').innerText).toEqual(
      product.name
    );
    expect(
      nativeElement.querySelector('#product-description').innerText
    ).toEqual(product.description);
    expect(nativeElement.querySelector('#product-price').innerText).toEqual(
      '$' + product.price.toFixed(2)
    );
  });

  it('should render the reviews in the tempelate', () => {
    const nativeElement = fixture.nativeElement;

    if (product.reviews.length > 0) {
      expect(nativeElement.querySelector('#no-reviews')).toBeNull();
      expect(nativeElement.querySelector('#reviews'));
      expect(nativeElement.querySelectorAll('.review').length).toEqual(
        product.reviews.length
      );
      expect(nativeElement.querySelectorAll('.review')[0].innerText).toContain(
        product.reviews[0].body
      );
      expect(nativeElement.querySelectorAll('.review')[0].innerText).toContain(
        product.reviews[0].rating
      );
    }
  });

  it('should render the no-reviews div if the product had no reviews', () => {
    const nativeElement = fixture.nativeElement;
    component.product.reviews = [];
    fixture.detectChanges();
    expect(nativeElement.querySelector('#reviews')).toBeNull();
    expect(nativeElement.querySelector('#no-reviews'));
  });

  it('should calculate and render the rating correctly', () => {
    const nativeElement = fixture.nativeElement;

    if (product.reviews.length !== 0) {
      expect(
        nativeElement.querySelector('#product-rating').innerText
      ).toContain(
        (
          product.reviews.reduce((a, b) => a + b.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      );
    } else {
      expect(
        nativeElement.querySelector('#product-rating').innerText
      ).toContain(0.0);
    }
  });

  it('should return "show" or "hide" through the stateName function based on the show variable value', () => {
    expect(component.stateName).toEqual('hide');
    setTimeout(() => {
      expect(component.stateName).toEqual('show');
    }, 700);
  });

  it('should call cartService.addToCart once when the "Add To Cart" button is clicked', () => {
    const spy = spyOn(cartService, 'addToCart');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.btn-intouch');
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledTimes(1);
  });
});

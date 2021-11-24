import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import * as faker from 'faker';

import { ProductItemComponent } from './product-item.component';
import { Product } from 'src/app/models/Product';

describe('ProductItemComponent', () => {
  let component: ProductItemComponent;
  let fixture: ComponentFixture<ProductItemComponent>;
  let product: Product;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductItemComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductItemComponent);
    component = fixture.componentInstance;

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

    component.product = product;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit once when the "Add To Cart" button is clicked', () => {
    // spy on event emitter
    spyOn(component.clickButton, 'emit');

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('.btn-intouch');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.clickButton.emit).toHaveBeenCalledTimes(1);
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

  it('should route to the product page one the title is clicked', () => {
    const nativeElement = fixture.nativeElement;

    expect(
      nativeElement.querySelector('#product-name').getAttribute('href')
    ).toEqual('/product/' + product.id);
  });
});

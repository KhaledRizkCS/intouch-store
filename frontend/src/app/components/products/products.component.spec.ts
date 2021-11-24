import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import * as faker from 'faker';

import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

import { ProductsComponent } from './products.component';
import { Product } from 'src/app/models/Product';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService: ProductService;
  let cartService: CartService;
  let mockProductArray: Product[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductsComponent],
      imports: [HttpClientTestingModule, NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService);
    cartService = TestBed.inject(CartService);

    // prepare the mock products array
    mockProductArray = [];
    const numberOfProducts = Math.floor(Math.random() * 6) + 1;

    for (let i = 0; i < numberOfProducts; i++) {
      mockProductArray.push({
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        image: 'https://picsum.photos/640/480',
        reviews: [],
      });

      const numberOfReviews = Math.floor(Math.random() * 6);
      for (let j = 0; j < numberOfReviews; j++) {
        mockProductArray[i].reviews.push({
          body: faker.lorem.sentence(),
          rating: Math.floor(Math.random() * 6),
        });
      }
    }

    spyOn(productService, 'getProducts').and.returnValue(of(mockProductArray));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the product object with the correct data', () => {
    expect(component.products).toEqual(mockProductArray);
  });

  it('should call addToCart() once with the correct value when the clickButton event is triggered', () => {
    const spy = spyOn(component, 'addToCart');

    const element = fixture.debugElement.query(By.css('app-product-item'));
    element.triggerEventHandler('clickButton', mockProductArray[0]);

    expect(spy).toHaveBeenCalledWith(mockProductArray[0]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call cartService.addToCart once when addToCart() is called', () => {
    const spy = spyOn(cartService, 'addToCart');
    component.addToCart(mockProductArray[0]);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should return "show" or "hide" through the stateName function based on the show variable value', () => {
    expect(component.stateName).toEqual('hide');
    setTimeout(() => {
      expect(component.stateName).toEqual('show');
    }, 700);
  });

  it('should create n app-product-item, n being the number of products', () => {
    const nativeElement = fixture.nativeElement;
    expect(nativeElement.querySelectorAll('app-product-item').length).toEqual(
      mockProductArray.length
    );
  });
});

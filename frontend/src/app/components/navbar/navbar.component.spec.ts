import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import * as faker from 'faker';

import { CartService } from 'src/app/services/cart.service';

import { NavbarComponent } from './navbar.component';
import { Product } from 'src/app/models/Product';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let cartService: CartService;
  let mockProductArray: Product[];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;

    cartService = TestBed.inject(CartService);

    mockProductArray = [];
    const numberOfProducts = Math.floor(Math.random() * 6) + 1;

    for (let i = 0; i < numberOfProducts; i++) {
      // prepare the mock product array
      mockProductArray.push({
        id: faker.datatype.number(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseInt(faker.commerce.price(), 10),
        image: 'https://picsum.photos/640/480',
        reviews: [],
      });
    }

    spyOn(cartService, 'getCartItems').and.returnValue(mockProductArray);
    spyOn(cartService, 'onChange').and.returnValue(of(mockProductArray));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the cartItems array with the correct data', () => {
    expect(component.cartItems).toEqual(mockProductArray);
  });

  it('should render the cart items in the DOM', () => {
    const nativeElement = fixture.nativeElement;

    expect(nativeElement.querySelectorAll('.cart-item').length).toEqual(
      mockProductArray.length + 1
    );
    expect(nativeElement.querySelectorAll('.cart-item')[0].innerText).toContain(
      mockProductArray[0].name
    );
    expect(nativeElement.querySelectorAll('.cart-item')[0].innerText).toContain(
      mockProductArray[0].price
    );
  });

  it('should call cartService.removeCartItem() once when the Remove Product is clicked', () => {
    const nativeElement = fixture.nativeElement;
    const spy = spyOn(cartService, 'removeCartItem');

    const button = nativeElement.querySelector('.remove-product');
    button.dispatchEvent(new Event('click'));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should show the correct total price', () => {
    const nativeElement = fixture.nativeElement;

    expect(nativeElement.querySelector('#total-price').innerText).toContain(
      mockProductArray.reduce((a, b) => a + b.price, 0)
    );
  });

});

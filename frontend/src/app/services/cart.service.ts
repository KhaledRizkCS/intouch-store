import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Array<Product> = JSON.parse(
    localStorage.getItem('cartItems') || '[]'
  );
  private subject: Subject<any> = new Subject();

  constructor() {}

  // adds a product to the cartItems array
  addToCart(item: Product, amount: number = 1): void {
    console.log('amount', amount);
    for (let i = 0; i < amount; i++) {
      this.cartItems.push(item);
    }
    this.subject.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  // subscribes to get the cartItems array each time it changes
  onChange(): Observable<any> {
    return this.subject.asObservable();
  }

  // direct access to the cartItems array
  getCartItems(): Array<Product> {
    return this.cartItems;
  }

  // removes a product from the cartItems array by index
  removeCartItem(index: number): void {
    console.log(index);
    console.log(this.cartItems);
    this.cartItems.splice(index, 1);
    this.subject.next(this.cartItems);
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }
}

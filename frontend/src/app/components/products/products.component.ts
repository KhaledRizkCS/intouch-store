import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    trigger('popOverState', [
      state(
        'show',
        style({
          opacity: 1,
        })
      ),
      state(
        'hide',
        style({
          opacity: 0,
        })
      ),
      transition('show => hide', animate('600ms ease-out')),
      transition('hide => show', animate('1000ms ease-in')),
    ]),
  ],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  show = false;

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // initialize the products array
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        setTimeout(() => {
          this.show = true;
        }, 700);
      },
      (error) => {
        console.log('Couldn\'t retreive products from getProducts()', error);
      }
    );
  }

  // returns the animation state as a string
  get stateName(): string {
    return this.show ? 'show' : 'hide';
  }

  // adds a product to the cartService
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}

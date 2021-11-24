import { Component, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { CartService } from 'src/app/services/cart.service';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
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
export class ProductPageComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    reviews: [],
    image: '',
  };
  rating = 0;
  stars: number[] = Array(5).fill(0);
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faStarEmpty = faStarEmpty;
  amount = 1;
  show = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // populates the product object
    this.route.params.subscribe(
      (params) => {
        this.productService.getProduct(params.id).subscribe(
          (product) => {
            this.product = product;
            console.log(this.product);

            // adds cache to get a different image for each time the user loads the page
            this.product.image =
              this.product.image + '?cache=' + new Date().getTime();

            // calculates the product average rating
            if (this.product.reviews.length > 0) {
              this.rating =
                this.product.reviews.reduce((a, b) => a + b.rating, 0) /
                this.product.reviews.length;
            } else {
              this.rating = 0;
            }
            for (let i = 0; i < Math.floor(this.rating); i++) {
              this.stars[i] = 1;
            }
            if (this.rating > Math.floor(this.rating)) {
              this.stars[Math.floor(this.rating)] = 0.5;
            }

            setTimeout(() => {
              this.show = true;
            }, 700);
          },
          (error) => {
            console.log('Couldn\'t retreive products from getProducts()', error);
          }
        );
      },
      (error) => {
        console.log('Couldn\'t retreive params from ActivatedRoute', error);
      }
    );
  }

  // returns the animation state as a string
  get stateName(): string {
    return this.show ? 'show' : 'hide';
  }

  // adds a product to the cartService with a set amount
  addToCart(): void {
    console.log('this is amount', this.amount);
    this.cartService.addToCart(this.product, this.amount);
  }
}

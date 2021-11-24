import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/Product';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartItems: Array<Product> = [];
  faCartPlus = faCartPlus;
  totalPrice = 0;

  constructor(private cartService: CartService, private toastr: ToastrService) {}

  ngOnInit(): void {
    // Deep copying
    this.cartItems = JSON.parse(
      JSON.stringify(this.cartService.getCartItems())
    );
    this.totalPrice = this.cartItems.reduce((a, b) => a + b.price, 0);

    this.cartService.onChange().subscribe(
      (cartItems) => {
        if (cartItems.length > this.cartItems.length) {
          this.toastr.success('A new item has been added to your cart!', cartItems[cartItems.length - 1].name);
        }
        this.cartItems = JSON.parse(JSON.stringify(cartItems)); // Deep copying
        this.totalPrice = this.cartItems.reduce((a, b) => a + b.price, 0);
      },
      (error) => {
        console.log('Couldn\'t retreive cartItems from onChange()', error);
      }
    );
  }

  // removes a product from cartService by index
  removePrdouct(i: number): void {
    this.toastr.error('An item has been removed from your cart!', this.cartItems[i].name, {positionClass: 'toast-top-left'});
    this.cartService.removeCartItem(i);
  }
}

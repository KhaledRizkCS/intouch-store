import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Product } from 'src/app/models/Product';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent implements OnInit {
  @HostBinding('class') classes = 'card mb-3';
  @Input() product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    reviews: [],
    image: '',
  };
  @Output() clickButton: EventEmitter<Product> = new EventEmitter();

  rating!: number;
  stars: number[] = Array(5).fill(0);
  faStar = faStar;
  faStarHalfAlt = faStarHalfAlt;
  faStarEmpty = faStarEmpty;

  constructor() {}

  ngOnInit(): void {
    // adds cache to get a different image for each product
    this.product.image = this.product.image + '?cache=' + new Date().getTime();

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
  }

  // emits a clickButton event
  onClick(): void {
    this.clickButton.emit();
  }
}

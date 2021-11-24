import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import * as faker from 'faker';

import { ProductService } from './product.service';
import { Product } from '../models/Product';

describe('ProductService', () => {
  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let mockProductArray: Product[];
  const apiUrl: string = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpTestingController = TestBed.inject(HttpTestingController);

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
    }

    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call /api/product and return an array of products', () => {
    service.getProducts().subscribe((res) => {
      expect(res).toEqual(mockProductArray);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${apiUrl}/api/products`,
    });

    req.flush(mockProductArray);
  });

  it('should call /api/product/:id and return a product object', () => {
    service.getProduct(mockProductArray[0].id).subscribe((res) => {
      expect(res).toEqual(mockProductArray[0]);
    });

    const req = httpTestingController.expectOne({
      method: 'GET',
      url: `${apiUrl}/api/products/${mockProductArray[0].id}`,
    });

    req.flush(mockProductArray[0]);
  });
});

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // gets all the products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl + '/api/products');
  }

  // gets a product by id
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(this.apiUrl + '/api/products/' + id);
  }
}

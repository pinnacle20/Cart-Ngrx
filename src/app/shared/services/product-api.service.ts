import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IProduct } from '../../products/models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductApiService {
  // http = Inject(HttpClient);
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<IProduct[]>('https://fakestoreapi.com/products').pipe(
      map((products) => {
        return products.map((product) => {
          return { ...product, quantity: 1 };
        });
      })
    );
  }
}

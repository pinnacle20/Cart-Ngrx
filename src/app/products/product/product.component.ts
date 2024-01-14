import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable, filter, map } from 'rxjs';
import { ProductCardComponent } from '../../shared/component/product-card/product-card.component';
import { IProduct } from '../models/product.interface';
import { ProductApiService } from '../../shared/services/product-api.service';
import { log } from 'console';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import { addToCart } from '../../states/cart/cart.action';
import { selectCartProducts } from '../../states/cart/cart.selector';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    ProductCardComponent,
    RouterModule,
    FormsModule,
    MatPaginatorModule,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productapi = inject(ProductApiService);
  productItems$: Observable<IProduct[]>;
  product$ = this.productapi.getProducts();
  searchText: any;

  // Pagination
  allProducts: IProduct[] = [];
  activeProducts: IProduct[] = [];
  pageSize = 5;
  pageSizeOptions = [5, 10, 15, 20];
  length: number = -1;

  constructor(private store: Store<AppState>) {
    this.productItems$ = this.store.select(selectCartProducts);
  }

  OnPageChange(event: PageEvent) {
    console.log('event -', event);
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if (endIndex > this.allProducts.length) {
      endIndex = this.allProducts.length;
    }
    console.log(startIndex, ' ', endIndex);
    this.activeProducts = this.allProducts.slice(startIndex, endIndex);
  }

  ngOnInit(): void {
    this.product$.subscribe((products) => (this.allProducts = products));
    this.activeProducts = this.allProducts.slice(0, this.pageSize);
    this.length = this.allProducts.length;
  }

  addItemToCart(product: IProduct) {
    console.log('Added- ', product);
    this.store.dispatch(addToCart({ product }));
  }
  filterProduct() {
    if (this.searchText.length != 0) {
      this.product$ = this.product$.pipe(
        map((items) =>
          items.filter((item) =>
            item.title.toLowerCase().includes(this.searchText.toLowerCase())
          )
        )
      );
    }
  }
}

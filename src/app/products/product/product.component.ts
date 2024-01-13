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
import { fileURLToPath } from 'url';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productapi = inject(ProductApiService);
  productItems$: Observable<IProduct[]>;
  product$ = this.productapi.getProducts();
  searchText: any;

  constructor(private store: Store<AppState>) {
    this.productItems$ = this.store.select(selectCartProducts);
  }

  ngOnInit(): void {}

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

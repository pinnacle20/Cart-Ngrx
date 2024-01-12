import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductCardComponent } from '../../shared/component/product-card/product-card.component';
import { IProduct } from '../models/product.interface';
import { ProductApiService } from '../../shared/services/product-api.service';
import { log } from 'console';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
// import { selectCartProducts } from '../../states/cart/cart.selector';
import { addToCart } from '../../states/cart/cart.action';
import { selectCartProducts } from '../../states/cart/cart.selector';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  productapi = inject(ProductApiService);
  productItems$: Observable<IProduct[]>;
  product$ = this.productapi.getProducts();

  constructor(private store: Store<AppState>) {
    this.productItems$ = this.store.select(selectCartProducts);
  }

  ngOnInit(): void {}

  addItemToCart(product: IProduct) {
    console.log('Added- ', product);
    this.store.dispatch(addToCart({ product }));
  }
}

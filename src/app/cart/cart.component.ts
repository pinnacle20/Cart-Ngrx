import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { selectCartProducts, selectCartTotal } from '../states/cart/cart.selector';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IProduct } from '../products/models/product.interface';
import {
  decrementProduct,
  incrementProduct,
  removeProduct,
} from '../states/cart/cart.action';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  constructor(private store: Store<AppState>) {}
  cartItems$ = this.store.select(selectCartProducts);
  cartTotal$ = this.store.select(selectCartTotal);
  ngOnInit(): void {}
  removeItem(productId: number) {
    this.store.dispatch(removeProduct({ productId }));
  }
  incProduct(productId: number) {
    this.store.dispatch(incrementProduct({ productId }));
  }
  decProduct(productId: number) {
    this.store.dispatch(decrementProduct({ productId }));
  }
}

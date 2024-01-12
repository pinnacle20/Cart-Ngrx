import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states/app.state';
import { selectCartProducts } from '../states/cart/cart.selector';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IProduct } from '../products/models/product.interface';
import { removeProduct } from '../states/cart/cart.action';

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
  ngOnInit(): void {}
  removeItem(product: IProduct) {
    const productId = product.id;
    this.store.dispatch(removeProduct({ productId }));
  }
}

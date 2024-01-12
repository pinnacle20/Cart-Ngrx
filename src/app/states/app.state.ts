import { IProduct } from '../products/models/product.interface';
import { CartState } from './cart/cart.reducer';

export interface AppState {
  cart: CartState;
}

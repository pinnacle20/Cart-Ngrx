import { createReducer, on } from '@ngrx/store';
import { IProduct } from '../../products/models/product.interface';
import {
  addToCart,
  incrementProduct,
  decrementProduct,
  removeProduct,
} from './cart.action';

export interface CartState {
  products: IProduct[];
}

export const initialCartState: CartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { product }) => {
    const updatedProducts = [...state.products, product];
    return { ...state, products: updatedProducts };
  }),
  on(incrementProduct, (state, { productId }) => {
    const updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    return { ...state, products: updatedProducts };
  }),
  on(decrementProduct, (state, { productId }) => {
    const updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    return { ...state, products: updatedProducts };
  }),
  on(removeProduct, (state, { productId }) => {
    console.log('Product id to remove ', productId);
    const updatedProducts = state.products.filter((product) => {
      if (product.id != productId) return true;
      else return false;
    });
    console.log('New Products- ', updatedProducts);
    return { ...state, products: updatedProducts };
  })
);

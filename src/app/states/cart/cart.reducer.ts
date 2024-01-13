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
  total: number;
}

export const initialCartState: CartState = {
  products: [],
  total: 0,
};

export function calculateTotalPrice(products: IProduct[]) {
  return +products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  ).toFixed(2);
}

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { product }) => {
    let updatedProducts: IProduct[] = [];
    if (state.products.some((item) => item.id === product.id)) {
      updatedProducts = state.products.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else updatedProducts = [...state.products, { ...product, quantity: 1 }];

    // const updatedTotal = +(state.total + product.price).toFixed(2);
    // return { ...state, products: updatedProducts, total: updatedTotal };
    return {
      ...state,
      products: updatedProducts,
      total: calculateTotalPrice(updatedProducts),
    };
  }),

  on(incrementProduct, (state, { productId }) => {
    const updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity + 1 }
        : product
    );
    // const targetProduct = state.products.find(
    //   (product) => product.id === productId
    // )!;
    // const updatedTotal = +(state.total + targetProduct.price).toFixed(2);

    // return { ...state, products: updatedProducts, total: updatedTotal };

    return {
      ...state,
      products: updatedProducts,
      total: calculateTotalPrice(updatedProducts)}
  }),

  on(decrementProduct, (state, { productId }) => {
    let updatedProducts = state.products.map((product) =>
      product.id === productId
        ? { ...product, quantity: product.quantity - 1 }
        : product
    );
    const targetProduct = state.products.find(
      (product) => product.id === productId
    )!;
    // const updatedTotal = +(state.total - targetProduct.price).toFixed(2);
    if (targetProduct.quantity == 1) {
      console.log('Target Product is now null');
      updatedProducts = state.products.filter((item) => productId != item.id);
    }
    // return { ...state, products: updatedProducts, total: updatedTotal };

    return {
      ...state,
      products: updatedProducts,
      total: calculateTotalPrice(updatedProducts),
    };
  }),

  on(removeProduct, (state, { productId }) => {
    const updatedProducts = state.products.filter(
      (item) => productId != item.id
    );
    // const targetProduct = state.products.find(
    //   (product) => product.id === productId
    // )!;
    // const updatedTotal = +(
    //   state.total -
    //   targetProduct.quantity * targetProduct.price
    // ).toFixed(2);
    // return { ...state, products: updatedProducts, total: updatedTotal };

    return {
      ...state,
      products: updatedProducts,
      total: calculateTotalPrice(updatedProducts),
    };
  })
);

import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../products/models/product.interface';

export const addToCart = createAction(
  '[Cart Componenet] AddtoCart',
  props<{ product: IProduct }>()
);
export const incrementProduct = createAction(
  '[Cart Componenet] IncrementProduct',
  props<{ productId: number }>()
);
export const decrementProduct = createAction(
  '[Cart Componenet] DecrementProduct',
  props<{ productId: number }>()
);
export const removeProduct = createAction(
  '[Cart Componenet] removeProduct',
  props<{ productId: number }>()
);

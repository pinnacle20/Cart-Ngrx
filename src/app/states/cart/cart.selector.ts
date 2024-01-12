import { createReducer, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { CartState } from './cart.reducer';
import { create } from 'domain';

export const selectCartState = (state: AppState) => state.cart;

export const selectCartProducts = createSelector(
  selectCartState,
  (state: CartState) => state.products
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state: CartState) => state.total
)


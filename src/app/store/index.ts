import { CartItem } from './cart/cart.model';

import { ActionReducerMap } from '@ngrx/store';
import * as fromCartReducer from './cart/cart.reducer';

export interface IAppState {
  cart: CartItem[];
}

export const appReducer: ActionReducerMap<IAppState, any> = {
  cart: fromCartReducer.CartReducer,
};
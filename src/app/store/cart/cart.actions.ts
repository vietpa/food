import { Action } from '@ngrx/store';
import { CartItem } from './cart.model';

export enum ECartActionTypes {
  ADD_ITEM = '[CART] Add Item',
  EDIT_ITEM = '[CART] Edit Item',
  INCREASE_QUANTITY = '[CART] Increase Quantity',
  DECREASE_QUANTITY = '[CART] Decrease Quantity',
  REMOVE_ITEM = '[CART] Remove Item',
}

export class AddItemAction implements Action {
  readonly type = ECartActionTypes.ADD_ITEM;
  constructor(public payload: CartItem) {}
}

export class EditItemAction implements Action {
  readonly type = ECartActionTypes.EDIT_ITEM;
  constructor(public payload: CartItem[]) {}
}

export class IncreaseQuantity implements Action {
  readonly type = ECartActionTypes.INCREASE_QUANTITY;
  constructor(public payload: CartItem) {}
}

export class DecreaseQuantity implements Action {
  readonly type = ECartActionTypes.DECREASE_QUANTITY;
  constructor(public payload: CartItem) {}
}

export class RemoveItemAction implements Action {
  readonly type = ECartActionTypes.REMOVE_ITEM;
  constructor(public payload: CartItem) {}
}

export type CartAction =
  | AddItemAction
  | EditItemAction
  | IncreaseQuantity
  | DecreaseQuantity
  | RemoveItemAction;

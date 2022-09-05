import { CartAction, ECartActionTypes } from './cart.actions';
import { CartItem } from './cart.model';

const initialState: CartItem[] = [];

export function CartReducer(
  state: CartItem[] = initialState,
  action: CartAction
): CartItem[] {
  let index;
  switch (action.type) {
    case ECartActionTypes.ADD_ITEM:
      return [...state, action.payload];
    case ECartActionTypes.ADD_ITEM:
      return [...state, action.payload];
    case ECartActionTypes.INCREASE_QUANTITY:
      return [
        ...state.filter((item) => item.id !== action.payload.id),
        { ...action.payload, quantity: action.payload.quantity + 1 },
      ];
    case ECartActionTypes.DECREASE_QUANTITY:
      return [
        ...state.filter((item) => item.id !== action.payload.id),
        { ...action.payload, quantity: action.payload.quantity - 1 },
      ];
    case ECartActionTypes.REMOVE_ITEM:
      return state.filter((item) => item.id !== action.payload.id);
    default:
      return state;
  }
}

import { ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART } from '../ActionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_CART: {
      const existingProductIndex = state.findIndex(
        item => item.id === payload.id,
      );

      if (existingProductIndex >= 0) {
        // Product exists, increase quantity
        return state.map((item, index) =>
          index === existingProductIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      } else {
        // Product does not exist, add with quantity 1
        return [...state, { ...payload, quantity: 1 }];
      }
    }

    case REMOVE_FROM_CART: {
      const existingProductIndex = state.findIndex(
        item => item.id === payload.id,
      );

      if (existingProductIndex >= 0) {
        const item = state[existingProductIndex];

        if (item.quantity > 1) {
          // Decrease quantity by 1
          return state.map((itm, index) =>
            index === existingProductIndex
              ? { ...itm, quantity: itm.quantity - 1 }
              : itm,
          );
        } else {
          // Remove item completely if quantity is 1
          return state.filter((_, index) => index !== existingProductIndex);
        }
      }

      return state;
    }

    case CLEAR_CART:
      return [];

    default:
      return state;
  }
};

import {
  ADD_TO_WISHLIST,
  CLEAR_WISHLIST,
  REMOVE_FROM_WISHLIST,
} from '../ActionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TO_WISHLIST:
      const exists = state.find(item => item.id === payload.id);
      if (exists) {
        return state;
      } else {
        return [...state, payload];
      }
    case REMOVE_FROM_WISHLIST:
      return state.filter(item => item.id !== payload.id);
    case CLEAR_WISHLIST:
      return [];
    default:
      return state;
  }
};

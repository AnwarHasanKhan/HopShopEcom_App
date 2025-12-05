import { ADD_ORDER, DELETE_ORDER } from '../ActionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ORDER:
      return [...state, payload];
    case DELETE_ORDER:
      const deleteArray1 = state.filter((item, index) => {
        return index !== payload;
      });

      return deleteArray1;

    default:
      return state;
  }
};

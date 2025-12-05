import { ADD_ADDRESS, DELETE_ADDRESS } from '../ActionTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_ADDRESS:
      return [...state, payload];
    case DELETE_ADDRESS:
      const deleteArray1 = state.filter((item, index) => {
        return index !== payload;
      });

      return deleteArray1;

    default:
      return state;
  }
};

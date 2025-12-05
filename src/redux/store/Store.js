import { createStore } from 'redux';
import Reducers from '../reducers/Reducers';
import Reducers2 from '../reducers/Reducers2';
import AddressReducer from '../reducers/AddressReducer';
import OrderReducer from '../reducers/OrderReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  Reducers,
  Reducers2,
  AddressReducer,
  OrderReducer,
});
const store = createStore(rootReducer);

export default store;

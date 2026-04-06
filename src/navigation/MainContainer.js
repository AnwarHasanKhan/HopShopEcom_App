import React from 'react';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import store from '../redux/store/Store';

const MainContainer = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default MainContainer;

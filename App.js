import React from 'react';
import MainContainer from './src/MainContainer';
import { Provider } from 'react-redux';
import store from './src/redux/store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <MainContainer />
    </Provider>
  );
};

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState} from 'react';
import RootNavigator from './Components/RootNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import RootReducer from './Components/RootReducer';
const store = createStore(RootReducer);
const App = props => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigator  />
    </NavigationContainer>
    </Provider>
     
  );
};
export default App;

 

import React from 'react';
import {View, Dimensions, Text, StatusBar} from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './Login';
import HomeScreen from './HomeScreen';
import DrawerContent from './DrawerContent';
import ProductList from './ProductList';
import ProductView from './ProductView';
import ShowCart from './ShowCart';
import AppHeader from './AppHeader';
export default function RootNavigator(props) {
  const StackNav = createStackNavigator();
  function Component() {
    return (
      <StackNav.Navigator>
             <StackNav.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <StackNav.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        />
       
<StackNav.Screen
          name="ShowCart"
          component={ShowCart}
          options={{
            header: AppHeader,
          }}
        />

     <StackNav.Screen
          name="ProductView"
          component={ProductView}
          options={{
            header: AppHeader,
          }}
        />

        <StackNav.Screen
          name="ProductList"
          component={ProductList}
          options={{
            header: AppHeader,
          }}
        />
        
      </StackNav.Navigator>
    );
  }

  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Component}
        options={{headerShown: false}}
      />
    </Drawer.Navigator>
  );
}

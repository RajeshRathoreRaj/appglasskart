import React from 'react';
import {
  View,
  Dimensions,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import FA from 'react-native-vector-icons/FontAwesome';

import {Badge} from 'react-native-elements';

import {useSelector} from 'react-redux';
const {width, height} = Dimensions.get('window');
export default function AppHeader(props) {
  var cart = useSelector(state => state.cart);
  var keys = Object.keys(cart);
  console.log('keys', keys.length);

  return (
    <View>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          width: width,
          backgroundColor: '#1e90ff',
          height: height * 0.1,
          flexDirection: 'row',
          paddingTop: 10,
        }}>
        <Text
          style={{
            paddingLeft: 7,
            fontWeight: 'bold',
            fontSize: 22,
            color: '#FFF',
          }}>
          Glasskart
        </Text>
        <TouchableOpacity
          style={{
            paddingRight: 20,
            marginLeft: 'auto',
          }}
          onPress={() => props.navigation.navigate('ShowCart')}
          >
          <View>
            <FA name="shopping-cart" color="#FFF" size={30} />
            <Badge
              status="error"
              value={keys.length}
              containerStyle={{position: 'absolute', top: -7, right: 10}}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React, {useRef, useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Image,
  Alert,
} from 'react-native';
import {Input} from 'react-native-elements';
import MI from 'react-native-vector-icons/MaterialCommunityIcons';
import FA from 'react-native-vector-icons/FontAwesome';
import RBSheet from 'react-native-raw-bottom-sheet';
import {postData} from './FetchNodeServices';
import {storeDatasync, fetchValueFromIndex, checkSyncData} from './AsyncDataStorage';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    width: width,
    height: height,
    //backgroundColor:'rgba(0,0,0,0.9)'
  },
});

const Login = props => {
  const refRBSheet = useRef();
  const [emailid, setEmailId] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileno, setMobileno] = useState('');
  const [password, setPassword] = useState('');

  const [lmobileno, setLMobileno] = useState('');
  const [lpassword, setLPassword] = useState('');
  const checkPreviousLogin = async () => {
    var userData = await checkSyncData();
    if (userData){ 
     
      props.navigation.navigate('HomeScreen');}
  };
  useEffect(function () {
    checkPreviousLogin();
  }, []);
  const handleSubmit = async () => {
    const body = {
      emailid: emailid,
      mobileno: mobileno,
      firstname: firstName,
      lastname: lastName,
      password: password,
    };

    var result = await postData('userdetail/insertuserdetails', body);
    if (result.result) {
      Alert.alert('Record Submitted....');
    } else {
      Alert.alert('Fail to Submit Record...');
    }
  };

  const handleLogin = async () => {
    const body = {
      mobileno: lmobileno,
      password: lpassword,
    };

    var result = await postData('userdetails/checklogin', body);
    if (result.result) {
      console.log("RESULT>DATA:",result.data[0])
      console.log("RESULT>DATA>Mobile:",result.data[0].mobileno)
      storeDatasync(result.data[0].mobileno, result.data[0]);
      props.navigation.navigate('HomeScreen');
    } else {
      Alert.alert('Invalid Login...');
    }
  };

  const SignupForm = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#000',
        }}>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={false}
          height={550}
          customStyles={{
            wrapper: {
              backgroundColor: 'transparent',
            },
            draggableIcon: {
              backgroundColor: '#000',
            },
          }}>
          <View style={{width: width * 0.95}}>
            <View style={{marginTop: 10, alignSelf: 'center'}}>
              <Text
                style={{
                  fontSize: 18,
                  borderBottomWidth: 0.5,

                  fontWeight: 'bold',
                }}>
                SignUp
              </Text>
            </View>
            <View
              style={{width: width * 0.85, alignSelf: 'center', marginTop: 5}}>
              <Input
                onChangeText={txt => setEmailId(txt)}
                placeholder="Email Address"
                placeholderTextColor="#000"
                underlineColor="#000"
                leftIcon={<FA name="envelope" size={16} color={'#000'} />}
              />
            </View>

            <View
              style={{width: width * 0.85, alignSelf: 'center', marginTop: 5}}>
              <Input
                onChangeText={txt => setMobileno(txt)}
                placeholder="Mobile Number"
                placeholderTextColor="#000"
                underlineColor="#000"
                leftIcon={<FA name="mobile" size={20} color={'#000'} />}
              />
            </View>

            <View
              style={{width: width * 0.85, alignSelf: 'center', marginTop: 5}}>
              <Input
                onChangeText={txt => setFirstName(txt)}
                placeholder="First Name"
                placeholderTextColor="#000"
                underlineColor="#000"
                leftIcon={<FA name="user" size={20} color={'#000'} />}
              />
            </View>
            <View
              style={{width: width * 0.85, alignSelf: 'center', marginTop: 5}}>
              <Input
                onChangeText={txt => setLastName(txt)}
                placeholder="Last Name"
                placeholderTextColor="#000"
                underlineColor="#000"
                leftIcon={<FA name="user" size={20} color={'#000'} />}
              />
            </View>
            <View
              style={{width: width * 0.85, alignSelf: 'center', marginTop: 5}}>
              <Input
                onChangeText={txt => setPassword(txt)}
                placeholder="Password"
                placeholderTextColor="#000"
                underlineColor="#000"
                secureTextEntry={true}
                leftIcon={<FA name="key" size={16} color={'#000'} />}
              />
            </View>

            <View
              style={{width: width * 0.85, marginTop: 20, alignSelf: 'center'}}>
              <TouchableOpacity onPress={() => handleSubmit()}>
                <View
                  style={{
                    borderRadius: 25,
                    padding: 10,
                    width: width * 0.5,
                    backgroundColor: '#182C61',
                    alignSelf: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#FFF',
                      marginRight: 5,
                    }}>
                    Submit
                  </Text>
                  <FA name="save" size={20} color="#FFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        style={styles.backgroundImage}
        source={require('./images/vback.png')}>
        <View style={{marginTop: 20}}>
          <Image
            resizeMode={'contain'}
            style={{width: 100, height: 60, marginLeft: 30}}
            source={require('./images/valvolinetranslogowhite.png')}
          />
        </View>
        <View style={{width: width * 0.8, alignSelf: 'center', marginTop: 20}}>
          <Text style={{fontSize: 55, color: '#FFF', fontWeight: 'bold'}}>
            Welcome Back !
          </Text>
        </View>
        <View style={{width: width * 0.85, alignSelf: 'center', marginTop: 20}}>
          <View
            style={{
              width: width * 0.85,
              height: height * 0.5,
              backgroundColor: '#FFF',
              borderTopRightRadius: 70,
              borderBottomLeftRadius: 70,
              borderTopLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}>
            <View style={{width: width * 0.8, marginTop: 10}}>
              <Text
                style={{
                  fontSize: 22,
                  borderBottomWidth: 0.5,
                  alignSelf: 'center',
                  fontWeight: 'bold',
                }}>
                Login
              </Text>
            </View>

            <View style={{width: width * 0.8, marginTop: 30}}>
              <Input
                onChangeText={txt => setLMobileno(txt)}
                placeholder="Mobile Number"
                placeholderTextColor="#000"
                underlineColor="#000"
                leftIcon={<FA name="mobile" size={25} color={'#000'} />}
              />
            </View>

            <View style={{width: width * 0.8, marginTop: 30}}>
              <Input
                onChangeText={txt => setLPassword(txt)}
                placeholder="Password"
                placeholderTextColor="#000"
                underlineColor="#000"
                secureTextEntry={true}
                leftIcon={<FA name="key" size={16} color={'#000'} />}
              />
            </View>

            <View
              style={{width: width * 0.8, marginTop: 20, alignSelf: 'center'}}>
              <TouchableOpacity onPress={() => handleLogin()}>
                <View
                  style={{
                    borderRadius: 25,
                    padding: 10,
                    width: width * 0.5,
                    backgroundColor: '#182C61',
                    alignSelf: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                      color: '#FFF',
                      marginRight: 5,
                    }}>
                    Login
                  </Text>
                  <MI name="login" size={20} color="#FFF" />
                </View>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: width * 0.8,
                marginTop: 25,
                display: 'flex',
                flexDirection: 'row',
              }}>
              <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: 'bold',
                    color: '#4834d4',
                    padding: 5,
                    marginLeft: 25,
                  }}>
                  Signup
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#4834d4',
                  padding: 5,
                  marginLeft: 'auto',
                }}>
                Forgot Password
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
      {SignupForm()}
    </View>
  );
};
export default Login;

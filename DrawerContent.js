import React, { useEffect,useState } from 'react';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {Image, Text, View,TouchableOpacity} from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import {ServerURL} from "./FetchNodeServices"
import {removeDatasync, getSyncData, getSyncDataByIndex, checkSyncData} from './AsyncDataStorage';

const DrawerContent = props => {
  const [userdata,setUserData]=useState({username:'',emailid:''})
  const getUserDetail=async()=>{
    var key=JSON.parse(await getSyncDataByIndex(0,1))

  console.log("KEY:",key[0])
  var key=await checkSyncData()
  console.log(key)
  if(key)
  {
     
     console.log("xxxxxxxxxxxxxxxxxxxxxxxx",key[0])
     var userData=await getSyncData(key[0])
     setUserData(userData)
  }
   }

  useEffect(function(){

  getUserDetail()
},[])
const handleLogout=async()=>{
  removeDatasync(userdata.mobileno)
  props.navigation.navigate("Login")
}
  return (
    <>
     
    
    <DrawerContentScrollView>
      <View
        style={{
          flexDirection: 'column',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{width: 100, height: 100, borderRadius: 50}}
          source={{uri: `${ServerURL}/images/1.jpg`}}
        />
        <Text
          style={{
            padding: 5,
            fontSize: 16,
            fontWeight: 'bold',
            letterSpacing: 1,
          }}>
          {userdata.username}
        </Text>
        <Text style={{padding: 5, fontSize: 12, letterSpacing: 1}}>
         {userdata.emailid} 
        </Text>
      </View>
      <View>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="home"  size={25} />
          <Text style={{padding:5}}>Home</Text>
        </View>
        <TouchableOpacity onPress={()=>props.navigation.navigate("Login")}>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="login"  size={25} />
          <Text style={{padding:5}}>Login</Text>
        </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>props.navigation.navigate("ProductList")}>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="shopping-cart"  size={25} />
          <Text style={{padding:5}}>Products</Text>
        </View>
        </TouchableOpacity>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="list-alt"  size={25} />
          <Text style={{padding:5}}>Orders</Text>
        </View>
       <TouchableOpacity onPress={()=>handleLogout()}>
        <View style={{marginLeft:10,padding:5,display: 'flex', flexDirection: 'row'}}>
          <MI name="logout"  size={25} />
          <Text style={{padding:5}}>Logout</Text>
        </View>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>

     </>
  );
};
export default DrawerContent;

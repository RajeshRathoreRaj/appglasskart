/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React,{useState} from 'react';

 import {
   Button, 
   StyleSheet,
   Text,
 TextInput,
   View,
 } from 'react-native';
 
  
 
  const ProductView=()=> {
   const [first,setFirst]=useState('')
   const [second,setSecond]=useState('')
   const [result,setResult]=useState('')
   const handleClick=()=>{
   var c=first+second
   setResult(c)
 
   }
   return (
    <View style={styles.sectionContainer}>
      <Text> ProductList </Text>
    

         </View>
   
   );
 };
 
 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
   input: {
     height: 40,
     margin: 12,
     borderWidth: 1,
     padding: 10,
   },
 });
 
 export default ProductView;
 
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {ServerURL, getData, postData} from './FetchNodeServices';
import {Button, StyleSheet,Image, Text, Dimensions, View,SafeAreaView, Touchable} from 'react-native';
import Carousel from 'react-native-banner-carousel';
import NumericInput from 'react-native-numeric-input'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
const {width, height} = Dimensions.get('window');


const ProductList = props => {
  var product = JSON.parse(props.route.params.state);
  const [pictures, setProductPictures] = useState([]);
  const [value, setValue] = useState(1);
  var dispatch=useDispatch()
  const fetchAllProductPictures = async () => {
    var body = {finalproductid: product.finalproductid};
    var result = await postData('finalproduct/getallproductpictures', body);
    //alert(JSON.stringify(result.data))
    setProductPictures(result.data);
  };
  useEffect(function () {
    fetchAllProductPictures();
  }, []);

  const renderItem = (item,index) => {
    return (
      <View style={{backgroundColor:'#FFF',display:'flex',justifyContent:'center'}}>
        <Image
          style={{width: width*0.98, height:height*0.4, resizeMode: 'contain'}}
          source={{uri: `${ServerURL}/images/${item.image}`}}
        />
      </View>
    );
  };

const handleClick=(item)=>{

  var data = { ...item,  qty: value };
  //alert(JSON.stringify(data))
  if (value == 0) {
    dispatch({ type: "REMOVE_CART", payload: [item.finalproductid] });
  } else {
    dispatch({ type: "ADD_CART", payload: [item.finalproductid, data] });
  }
 props.navigation.setParams({'x':''})
}  
  return (
    <View style={{flex:1}}>
         <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={width}
                >
                    {pictures.map((item, index) => renderItem(item, index))}
                </Carousel>
<View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                <View style={{padding:10,display:'flex',flexDirection:'column'}}>    
    <Text style={{fontSize:24,fontWeight:'800',marginBottom:5}}>{product.productname}</Text>
    <Text style={{fontSize:18,fontWeight:'600',marginBottom:5}}>{product.colorname}</Text>
    <View style={{ textAlign: "center"}}>
                    {product.offerprice > 0 ? (
                      <View style={{display:'flex',flexDirection:'row'}}>
                      <Text style={{fontSize:20, textDecorationLine:'line-through',textDecorationColor:'red'}}>
                        &#8377; {product.price}</Text>
                        <Text style={{fontSize:20,color: "#0984e3",marginLeft:15}}>
                          &#8377; {product.offerprice}
                        </Text>

                      </View>
                    ) : (
                      <Text style={{ fontSize:20}} >&#8377; {product.price}</Text>
                    )}
                  </View>

                  <View
                  style={{
                    
                    letterSpacing: 1,
                    fontSize: 20,
                    fontWeight: 700,
                  }}
                >
                  {product.stock == 0 ? (
                    <Text style={{fontSize:20, color: "red" }}>Out of Stock</Text>
                  ) : product.stock >= 1 && product.stock <= 3 ? (
                    <Text style={{ fontSize:20, color: "orange" }}>
                      Hurry Only {product.stock} item(s) is left
                    </Text>
                  ) : (
                    <Text style={{ fontSize:20,color: "green" }}>Available</Text>
                  )}
                </View>
            




                 
    </View>
     <View style={{display:'flex', justifyContent:'center',alignItems:'center',padding:10}}>

     <NumericInput 
            value={value} 
            onChange={value => setValue(value)} 
            minValue={1}
            maxValue={4}
            totalWidth={150} 
            totalHeight={50} 
            iconSize={25}
            step={1}
            valueType='int'
            rounded 
            textColor='#000' 
            iconStyle={{ color: 'white' }} 
            rightButtonBackgroundColor='#50526E' 
            leftButtonBackgroundColor='#50526E'/>
     </View>

     </View>
     <View style={{  display:'flex',
     position:'absolute',bottom:0, width:width,padding:15,backgroundColor:'#50526E'}}>
    
       <TouchableOpacity onPress={()=>handleClick(product)}>
         <Text style={{letterSpacing:1, color:'#FFF',textAlign:'center', fontSize:22,fontWeight:'800'}}>Add to cart</Text>

    
      </TouchableOpacity> 
      </View>

    </View>
  );
};

export default ProductList;

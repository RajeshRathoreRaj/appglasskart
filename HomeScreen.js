import React,{useEffect,useState} from 'react';
import {ServerURL,getData} from "./FetchNodeServices"
import {Dimensions,StyleSheet,TextInput,Text, View,Image,SafeAreaView,FlatList,TouchableOpacity} from 'react-native';
import MI from 'react-native-vector-icons/MaterialIcons';
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';
 const {width,height}=Dimensions.get('window')
const styles = StyleSheet.create({
 textbox:{width:width*0.93,
borderWidth:0.5,
borderRadius:5,
display:'flex',
flexDirection:'row',
alignItems:'center',
 } ,
searchbox:{display:'flex',justifyContent:'center',alignItems:'center',padding:10}
});

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const ProductItem = ({ item,props }) => (
  <TouchableOpacity onPress={()=>props.navigation.navigate('ProductList',{state:JSON.stringify(item)})}>
    <View style={{marginBottom:10,padding:5,display:'flex',width:width*0.92,alignItems:'center',flexDirection:'row',borderWidth:0.3,borderRadius:5}}>
    <Image
          style={{width: 130, height: 100,resizeMode:'contain'}}
          source={{uri: `${ServerURL}/images/${item.productpicture}`}}
        />
    <View style={{padding:10,marginLeft:width*0.15,display:'flex',flexDirection:'column'}}>    
    <Text style={{fontSize:20,fontWeight:'800',marginBottom:5}}>{item.productname}</Text>
    <Text style={{fontSize:14,fontWeight:'600',marginBottom:5}}>{item.colorname}</Text>
    <View style={{ textAlign: "center", fontSize: 20 }}>
                    {item.offerprice > 0 ? (
                      <View style={{display:'flex',flexDirection:'row'}}>
                      <Text style={{textDecorationLine:'line-through',textDecorationColor:'red'}}>
                        &#8377; {item.price}</Text>
                        <Text style={{ color: "#0984e3",marginLeft:15}}>
                          &#8377; {item.offerprice}
                        </Text>

                      </View>
                    ) : (
                      <Text>&#8377; {item.price}</Text>
                    )}
                  </View>

                  <View
                  style={{
                    
                    letterSpacing: 1,
                    fontSize: 14,
                    fontWeight: 700,
                  }}
                >
                  {item.stock == 0 ? (
                    <Text style={{ color: "red" }}>Out of Stock</Text>
                  ) : item.stock >= 1 && item.stock <= 3 ? (
                    <Text style={{ color: "orange" }}>
                      Hurry Only {item.stock} item(s) is left
                    </Text>
                  ) : (
                    <Text style={{ color: "green" }}>Available</Text>
                  )}
                </View>
            




                 
    </View>
    </View>
  </TouchableOpacity>
);


const HomeScreen = props => {
  const [list,setList]=useState([])
  const fetchAllProduct=async()=>{
   const result=await getData('finalproduct/fetchallfinalproducts')
   setList(result.data)

  }

  useEffect(function(){fetchAllProduct()},[])
  return (
    <View style={{backgroundColor:'#FFF'}} >
      <View style={{display:'flex',flexDirection:'row'}}>
      <MI style={{padding:10}} name="menu" size={30} onPress={() => props.navigation.openDrawer()} />
      
      <View style={{width:width*0.8,display:'flex',justifyContent:'center',alignItems:'center'}}>
      <Image
          style={{width: 100, height: 50,resizeMode:'contain'}}
          source={{uri: `${ServerURL}/images/glasskart.png`}}
        />
      </View>  
      </View>   
      <View style={styles.searchbox}>
     <View style={styles.textbox}>
       <MI name="search" size={30} />
       <TextInput  placeholder="Search Product..." />
     </View>
     </View>

      <View>
  <SafeAreaView    style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
      <FlatList
        data={list}
        
        renderItem={({item}) => <ProductItem item={item} props={props} />}
        keyExtractor={(item) => item.finalproductid}

      />
    </SafeAreaView>
      </View>
    </View>
  );
};
export default HomeScreen;

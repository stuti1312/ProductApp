import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';

const ProductDetails = ({route}) => {
  const {product, navigation} = route.params;

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1, margin: 20}}
        scrollEnabled={true}>
        {/* HEADER */}
        <View
          style={{
            flexDirection: 'row',
            height: '7%',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '70%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={require('../assets/icons/arrowBack.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '30%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Image
                source={require('../assets/icons/heart.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </View>
            <View
              style={{
                height: 35,
                width: 35,
                backgroundColor: 'white',
                borderRadius: 50,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={require('../assets/icons/cart.png')}
                style={{width: 20, height: 20}}
              />
            </View>
          </View>
        </View>

        {/* product detail */}
        <View>
          {/* image */}
          <View
            style={{
              borderRadius: 10,
              marginBottom: 30,
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              elevation: 3,
              shadowRadius: 10,
              width: '100%',
              height: '50%',
            }}>
            <Image
              source={{uri: product.image}}
              style={{
                width: '80%',
                height: '80%',
                resizeMode: 'center',
              }}
            />
          </View>

          {/* product detail */}
          <View style={{marginBottom: 20}}>
            <Text
              style={{
                fontSize: 15,
                textTransform: 'capitalize',
              }}>
              {product.category}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
                marginBottom: 20,
              }}>
              {product.title}
            </Text>
            <Text style={{fontSize: 14}}>Description</Text>
            <Text style={{fontSize: 14, color: 'black'}}>
              {product.description}
            </Text>
          </View>

          {/* rating */}
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 14, marginBottom: 5}}>Ratings</Text>
            <Text style={{fontSize: 12}}>{product.rating.rate}</Text>
          </View>

          {/* divider */}
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: 'lightgray',
              marginBottom: 10,
            }}
          />

          {/* cart */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{fontSize: 13}}>Price</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                  ${product.price}
                </Text>
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontWeight: 'bold',
                backgroundColor: '#ef5201',
                borderRadius: 10,
                paddingVertical: 10,
                paddingHorizontal: 35,
              }}>
              Add to Cart
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});

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
    <ScrollView
      contentContainerStyle={styles.mainContainer}
      scrollEnabled={true}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.leftMenu}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../assets/icons/arrowBack.png')}
              style={styles.back}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.rightMenu}>
          <View style={styles.wishlist}>
            <Image
              source={require('../assets/icons/heart.png')}
              style={styles.back}
            />
          </View>
          <View style={styles.cart}>
            <Image
              source={require('../assets/icons/cart.png')}
              style={styles.back}
            />
          </View>
        </View>
      </View>

      {/* product detail */}
      <View>
        {/* image */}
        <View style={styles.imageContainer}>
          <Image source={{uri: product.image}} style={styles.image} />
        </View>

        {/* product detail */}
        <View style={styles.detail}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.title}>{product.title}</Text>
          <Text style={styles.description}>Description</Text>
          <Text style={styles.descriptionContent}>{product.description}</Text>
        </View>

        {/* rating */}
        <View style={styles.rating}>
          <Text style={styles.ratings}>Ratings</Text>
          <Text style={styles.ratingNumber}>{product.rating.rate}</Text>
        </View>

        {/* divider */}
        <View style={styles.divider} />

        {/* cart */}
        <View style={styles.bottomContainer}>
          <View>
            <Text style={styles.price}>Price</Text>
            <Text style={styles.priceValue}>${product.price}</Text>
          </View>
          <Text style={styles.btn}>Add to Cart</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  mainContainer: {flexGrow: 1, margin: 20},
  header: {
    flexDirection: 'row',
    height: '7%',
    alignItems: 'center',
  },
  leftMenu: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  back: {
    width: 20,
    height: 20,
  },
  rightMenu: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wishlist: {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cart: {
    height: 35,
    width: 35,
    backgroundColor: 'white',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowRadius: 10,
    width: '100%',
    height: '50%',
  },
  image: {
    width: '80%',
    height: '80%',
    resizeMode: 'center',
  },
  detail: {marginBottom: 20},
  category: {
    fontSize: 15,
    textTransform: 'capitalize',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  description: {fontSize: 14},
  descriptionContent: {fontSize: 14, color: 'black'},
  rating: {marginBottom: 10},
  ratings: {fontSize: 14, marginBottom: 5},
  ratingNumber: {fontSize: 12},
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    marginBottom: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {fontSize: 13},
  priceValue: {fontSize: 16, fontWeight: 'bold', color: 'black'},
  btn: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#ef5201',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 35,
  },
});

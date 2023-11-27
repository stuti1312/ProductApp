import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [isGridView, setIsGridView] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://www.io.pixelsoftwares.com/task_api.php',
          {
            headers: {
              apikey: 'pixel',
            },
          },
        );
        setProducts(response.data.data);
        setTotalItemCount(response.data.data.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({item}) => {
    const modifiedTodayDate = moment(new Date()).format('DD/MM/YYYY');
    const modifiedDates = moment(item.date).format('DD/MM/YYYY');

    // console.log("date>>>>>>>>>>>>>>>>",modifiedTodayDate);
    // console.log('date>>>>>>>>>>>>>>>>', modifiedDates);
    // console.log("yesterday date boolean",modifiedDates == modifiedTodayDate-1);

    const dateHeader = () => {
      if (modifiedDates == modifiedTodayDate) {
        return (dateStatus = 'Today');
      } else if (modifiedDates == modifiedTodayDate - 1) {
        return (dateStatus = 'Yesterday');
      } else {
        return (dateStatus = modifiedDates);
      }
      return dateStatus;
    };

    const StarRating = ({rating}) => {
      const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <View>
              {i <= rating ? (
                <Image
                  source={require('../assets/icons/starFull.png')}
                  style={{
                    width: 10,
                    height: 10,
                    resizeMode: 'contain',
                    marginRight: 4,
                  }}
                />
              ) : (
                <Image
                  source={require('../assets/icons/star.png')}
                  style={{
                    width: 10,
                    height: 10,
                    resizeMode: 'contain',
                    marginRight: 4,
                  }}
                />
              )}
            </View>,
          );
        }
        return stars;
      };

      return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          {renderStars()}
          <Text style={{fontSize: 12}}>{item.rating.rate}</Text>
        </View>
      );
    };

    const ratings = () => {
      if (item.rating.rate < 1) {
        return (src = '1 half star 4 empty star');
      } else if (item.rating.rate <= 1) {
        return (src = '1 full star 4 empty star');
      } else if (item.rating.rate < 2) {
        return (src = '1 full star 1 half star 3 empty star');
      } else if (item.rating.rate == 2) {
        return (src = '2 full star 3 empty star');
      } else if (item.rating.rate < 3) {
        return (src = '2 full star 1 half star 2 empty star');
      } else if (item.rating.rate == 3) {
        return (src = '3 full star 2 empty star');
      } else if (item.rating.rate < 4) {
        return (src = '3 full star 1 half star 1 empty star');
      } else if (item.rating.rate == 4) {
        return (src = '4 full star 1 empty star');
      } else if (item.rating.rate < 5) {
        return (src = '4 full star 1 half star');
      } else if (item.rating.rate == 5) {
        return (src = '5 full star');
      }
      return src;
    };

    return (
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          margin: 10,
          padding: 10,
          width: '45%',
        }}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product: item,
            navigation: navigation,
          })
        }>
        <Text>{item.date}</Text>
        <Image
          source={{uri: item.image}}
          style={{
            width: 160,
            height: 170,
            resizeMode: 'contain',
            marginVertical: 15,
          }}
        />
        <StarRating rating={item.rating.rate} />
        <Text
          style={{
            fontSize: 15,
            fontWeight: 'bold',
            textTransform: 'capitalize',
            color: 'black',
          }}>
          {item.category}
        </Text>
        <Text style={{fontSize: 12}}>{item.title}</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/icons/rupee.png')}
            style={{
              width: 10,
              height: 10,
            }}
          />
          <Text style={{fontSize: 14}}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, marginBottom: 100}}>
      {/* HEADER */}
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'white',
          padding: 10,
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
          <Image
            source={require('../assets/icons/menu.png')}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              marginRight: 15,
            }}
          />
          <Text style={{fontSize: 17}}>Women</Text>
        </View>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity>
            <Image
              source={require('../assets/icons/search.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                marginRight: 15,
              }}
            />
          </TouchableOpacity>
          <Image
            source={require('../assets/icons/heart.png')}
            style={{
              width: 20,
              height: 20,
              resizeMode: 'contain',
              marginRight: 15,
            }}
          />
          <Image
            source={require('../assets/icons/cart.png')}
            style={{width: 20, height: 20, resizeMode: 'contain'}}
          />
        </View>
      </View>

      {/* NAVBAR */}
      <View
        style={{
          flexDirection: 'row',
          margin: 14,
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 13, alignSelf: 'flex-start', width: '70%'}}>
          {totalItemCount} items
        </Text>
        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            <Image
              source={require('../assets/icons/list.png')}
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
                marginRight: 10,
              }}
              tintColor={!isGridView ? 'gray' : 'lightgray'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            <Image
              source={require('../assets/icons/grid.png')}
              style={{
                width: 16,
                height: 16,
                resizeMode: 'contain',
              }}
              tintColor={isGridView ? 'gray' : 'lightgray'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ITEM LIST */}
      <View style={{marginHorizontal: 10}}>
        <FlatList
          data={products}
          renderItem={renderItem}
          key={isGridView ? 'grid' : 'list'}
          numColumns={isGridView ? 2 : 1}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  star: {
    fontSize: 20,
    color: 'gray',
    marginRight: 5,
  },
  starFilled: {
    fontSize: 20,
    color: 'gold',
    marginRight: 5,
  },
});

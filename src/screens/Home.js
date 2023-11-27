import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import moment from 'moment';

const Home = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [isGridView, setIsGridView] = useState(true);
  const [onSearch, setOnSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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

  useEffect(() => {
    // Filter the data based on the search input
    const filtered = products.filter(item =>
      item.title.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredData(filtered);
  }, [search]);

  const renderItem = ({item}) => {
    const modifiedTodayDate = moment(new Date()).format('DD/MM/YYYY');
    const modifiedDates = moment(item.date).format('DD/MM/YYYY');
    const StarRating = ({rating}) => {
      const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <View key={i}>
              {i <= rating ? (
                <Image
                  source={require('../assets/icons/starFull.png')}
                  style={styles.star}
                />
              ) : (
                <Image
                  source={require('../assets/icons/star.png')}
                  style={styles.star}
                />
              )}
            </View>,
          );
        }
        return stars;
      };
      return (
        <View style={styles.ratingStars}>
          {renderStars()}
          <Text style={styles.rating}>{item.rating.rate}</Text>
        </View>
      );
    };

    return (
      <TouchableOpacity
        style={styles.product}
        onPress={() =>
          navigation.navigate('ProductDetails', {
            product: item,
            navigation: navigation,
          })
        }>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <StarRating rating={item.rating.rate} />
        <Text style={styles.productCategory}>{item.category}</Text>
        <Text style={styles.rating}>{item.title}</Text>
        <View style={styles.ratingStars}>
          <Image
            source={require('../assets/icons/rupee.png')}
            style={styles.rupee}
          />
          <Text style={styles.price}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.mainContainer}>
      {/* HEADER */}
      <View style={styles.header}>
        <View style={styles.leftMenu}>
          <Image
            source={require('../assets/icons/menu.png')}
            style={styles.menu}
          />
          {onSearch ? (
            <TextInput
              style={styles.searchBox}
              placeholder="Search..."
              onChangeText={text => setSearch(text)}
              value={search}
            />
          ) : (
            <Text style={styles.categoryTitle}>Women</Text>
          )}
        </View>
        <View style={styles.rightMenu}>
          <TouchableOpacity onPress={() => setOnSearch(true)}>
            <Image
              source={require('../assets/icons/search.png')}
              style={styles.search}
            />
          </TouchableOpacity>
          <Image
            source={require('../assets/icons/heart.png')}
            style={styles.search}
          />
          <Image
            source={require('../assets/icons/cart.png')}
            style={styles.cart}
          />
        </View>
      </View>

      {/* NAVBAR */}
      <View style={styles.navbar}>
        <Text style={styles.itemCount}>{totalItemCount} items</Text>
        <View style={styles.itemViewFormat}>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            <Image
              source={require('../assets/icons/list.png')}
              style={styles.listView}
              tintColor={!isGridView ? 'black' : 'gray'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsGridView(!isGridView)}>
            <Image
              source={require('../assets/icons/grid.png')}
              style={styles.grid}
              tintColor={isGridView ? 'black' : 'gray'}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* ITEM LIST */}
      <View style={styles.list}>
        <FlatList
          data={onSearch ? filteredData : products}
          renderItem={renderItem}
          key={isGridView ? 'grid' : 'list'}
          numColumns={isGridView ? 2 : 1}
          keyExtractor={item => item.id}
        />
        {/* logic for date group */}
        {/* <FlatList
          data={Object.entries(groupedData)}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <View>
              <Text style={styles.date}>{item[0]}</Text>
              <FlatList
                data={onSearch ? filteredData : products}
                key={isGridView ? 'grid' : 'list'}
                numColumns={isGridView ? 2 : 1}
                renderItem={renderItem}
              />
            </View>
          )}
        /> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  star: {
    width: 10,
    height: 10,
    resizeMode: 'contain',
    marginRight: 4,
  },
  ratingStars: {flexDirection: 'row', alignItems: 'center'},
  rating: {fontSize: 12},
  product: {
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    width: '45%',
  },
  productImage: {
    width: 160,
    height: 170,
    resizeMode: 'contain',
    marginVertical: 15,
  },
  productCategory: {
    fontSize: 15,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'black',
  },
  rupee: {
    width: 10,
    height: 10,
  },
  price: {fontSize: 14},
  mainContainer: {flex: 1, marginBottom: 100},
  header: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10,
    height: '7%',
    alignItems: 'center',
  },
  leftMenu: {
    width: '70%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  menu: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
  searchBox: {
    borderWidth: 1,
    borderColor: 'lightgray',
    padding: 5,
    width: '89%',
  },
  categoryTitle: {fontSize: 17},
  rightMenu: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  search: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 15,
  },
  cart: {width: 20, height: 20, resizeMode: 'contain'},
  navbar: {
    flexDirection: 'row',
    margin: 14,
    alignItems: 'center',
  },
  itemCount: {fontSize: 13, alignSelf: 'flex-start', width: '70%'},
  itemViewFormat: {
    width: '30%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  listView: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginRight: 10,
  },
  grid: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
  },
  list: {marginHorizontal: 10},
  // date:{fontSize: 18, fontWeight: 'bold'}
});

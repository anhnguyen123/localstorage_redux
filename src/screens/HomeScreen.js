import { } from '../redux/actions';

import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { addToWishList, fetchMovies, removeFromWishList } from '../redux/actions';

import { BASE_URL } from '../utilities';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { store } from '../redux/store';

// import {TouchableOpacity} from 'react-native-gesture-handler';

const _HomeScreen = (props) => {
  const { movieReducer, fetchMovies, addToWishList, removeFromWishList } = props;
  const { movies, wishlist } = movieReducer;
  const [currentMovie, setCurrentMovie] = useState(undefined);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
    //  console.log(JSON.stringify(movies[0]));
      setCurrentMovie(movies[0]);
    }
  }, [movies]);

  const didTabCurrentMovie = (movie) => {
    setCurrentMovie(movie)
  }
  const onTabAddToWishlist = (movie) => {
    addToWishList(movie);
  }
  const onTabRemoveFromWishlish = (movie) => {
    removeFromWishList(movie);
  }
  const isExist = (movie) => {
    if (wishlist.filter(item => item._id === movie._id).length > 0) {
      return true;
    }
    return false;
  }
  console.log('render');
  return (
    
    <View style={styles.container}>
      {/* poster and info */}
      <View style={styles.posterView}>
        <View style={{ flex: 9 }}>
          {currentMovie !== undefined && (
            <ImageBackground
              resizeMode="stretch"
              style={styles.poster}
              imageStyle={{
                borderBottomLeftRadius: Dimensions.get('screen').width / 3,
                marginBottom: 30,
              }}
              source={{
                uri: currentMovie.poster,
              }}></ImageBackground>
          )}
        </View>
        {currentMovie !== undefined && (
          <View style={{ flex: 3, alignItems: 'flex-end' }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: -30,

                backgroundColor: 'red',
                width: 200,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 10,
                borderBottomLeftRadius: 25,
                borderTopLeftRadius: 25,
              }}>
              <Text style={{ fontSize: 22, fontWeight: '400', color: '#fff' }}>
                Watch Now
              </Text>
            </TouchableOpacity>

            {/* movie plot info */}
            <View style={{ flexDirection: 'column', padding: 20 }}>
              <Text
                style={{
                  textAlign: 'left',
                  color: '#1d1d1d',
                  fontSize: 20,
                  fontWeight: '600',
                  margin: 10,
                }}>
                {currentMovie.title}
              </Text>
              <Text style={{ color: '#1d1d1d', fontSize: 13 }}>
                {currentMovie.plot}
              </Text>
            </View>
          </View>
        )}
      </View>
      {/* slider with movie card */}
      <View style={styles.listView}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: '600',
            color: 'gray',
            marginLeft: 20,
            marginBottom: 20,
          }}>
        {console.log('render top movie')}  Top Movies
        </Text>
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          key={(item, index) => index}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.movieCard}>
                <TouchableOpacity
                  style={{ flex: 1, justifyContent: 'space-between' }} onPress={() => {
                    didTabCurrentMovie(item)
                  }} >
                  <Image
                    resizeMode="stretch"
                    style={{
                      width: Dimensions.get('window').width / 2.5 - 10,
                      height: '80%',
                      borderTopLeftRadius: 20,
                      borderTopRightRadius: 20,
                    }}
                    source={{
                      uri: item.thumbnail,
                    }}
                  />
                </TouchableOpacity>
                <Text style={{ textAlign: 'center', padding: 15 }}>
                  {item.title}
                </Text>
                {isExist(item) ? <TouchableOpacity style={{
                  backgroundColor: '#20b103',
                  width: '100%',
                  height: '20%',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                  onPress={() => onTabRemoveFromWishlish(item)}
                >
                  <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Remove from Wishlist</Text>
                </TouchableOpacity> : <TouchableOpacity style={{
                  backgroundColor: '#d92f24',
                  width: '100%',
                  height: '20%',
                  borderBottomLeftRadius: 20,
                  borderBottomRightRadius: 20,
                  justifyContent: "center",
                  alignItems: "center"
                }}
                  onPress={() => onTabAddToWishlist(item)}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>Add to Wishlist</Text>
                  </TouchableOpacity>}

              </View>
            );
          }}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  posterView: {
    // backgroundColor: 'green',
    width: Dimensions.get('window').width,
    flex: 7,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listView: {
    flex: 5,
    width: Dimensions.get('window').width,
    padding: 10,
  },
  poster: {
    width: Dimensions.get('window').width,
    height: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  movieCard: {
    flexDirection: 'column',
    width: Dimensions.get('window').width / 2.5 - 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    movieReducer: state.movieReducer,
  };
};
const mapDispatchToProps = () => {
  return {
    addToWishList,
    fetchMovies,
    removeFromWishList,
  };
};

const HomeScreen = connect(mapStateToProps, {
  addToWishList,
  fetchMovies,
  removeFromWishList,
})(_HomeScreen);

export default HomeScreen;

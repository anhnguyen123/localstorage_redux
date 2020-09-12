import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {addToWishList, fetchMovies, removeFromWishList} from '../redux/actions';

import {connect} from 'react-redux';

const _WishlistScreen = (props) => {
  const {movieReducer, fetchMovies, addToWishList, removeFromWishList} = props;
  const {movies, wishlist} = movieReducer;
  useEffect(() => {
    fetchMovies();
  }, []);
  return (
    <View>
      {/* <Text>{JSON.stringify(movies)}</Text>
      <Text>{JSON.stringify(wishlist)}</Text> */}
      <Text>ádf</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
const mapStateToProps = (state) => {
  return {
    movieReducer: state.movieReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToWishList,
    fetchMovies,
    removeFromWishList,
  };
};
const WishlistScreen = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_WishlistScreen);

export default WishlistScreen;

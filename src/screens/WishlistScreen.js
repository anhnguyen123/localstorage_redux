import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import { addToWishList, fetchMovies, removeFromWishList } from '../redux/actions';

import { connect } from 'react-redux';


const _WishlistScreen = (props) => {
  const { movieReducer, fetchMovies, addToWishList, removeFromWishList } = props;
  const { movies, wishlist } = movieReducer;
  console.log('render wishlist');

  return (
    <View style={styles.container}>

      <Text style={styles.watchlater}>Watch Later</Text>
      <FlatList horizontal={false} showsHorizontalScrollIndicator={false}
        data={wishlist}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.movieCard}>
              <Image resizeMode='stretch' style={styles.imageMovie} source={{
                uri: item.thumbnail,
              }} />
              <Text style={{ flex: 5, padding: 10, fontSize: 14 }} >{item.title}</Text>
              <TouchableOpacity style={{ flex: 2, height: '100%', backgroundColor: '#d92f24', justifyContent: "center", alignItems: "center", borderTopRightRadius: 10, borderBottomRightRadius: 10 }}>
                <Text style={{ fontSize: 40, color: '#fff' }}>►</Text>
              </TouchableOpacity>
            </View>
          )
        }}
        key={(item, index) => index}
        keyExtractor={(item, index) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    flexDirection: 'row',
    width: Dimensions.get('window').width - 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    
  },
  imageMovie: {
    flex: 5, height: '100%', borderTopLeftRadius: 10, borderBottomRightRadius: 10
  },
  watchlater: {
    fontSize: 30, fontWeight: '600', color: 'gray', marginLeft: 20, marginBottom: 20
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: 'center',
    paddingTop: 30,
    backgroundColor: '#e5e5e5'
  }
});
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

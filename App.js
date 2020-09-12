import 'react-native-gesture-handler';

import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {appPersist, store} from './src/redux/store';
//navigation
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

//screen
import HomeScreen from './src/screens/HomeScreen';
import {PersistGate} from 'redux-persist/integration/react';
//redux
import {Provider} from 'react-redux';
import React from 'react';
import WishlistScreen from './src/screens/WishlistScreen';
import {createBottomTabNavigator} from 'react-navigation-tabs';

const switchNavigator = createSwitchNavigator({
  homeStack: createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarIcon: ({focused}) => {
            let icon =
              focused === true
                ? require('./src/images/home_icon.png')
                : require('./src/images/home_n_icon.png');
            return <Image source={icon} style={styles.tabIcon} />;
          },
        },
      },
      Wishlist: {
        screen: WishlistScreen,
        navigationOptions: {
          tabBarIcon: ({focused}) => {
            let icon =
              focused === true
                ? require('./src/images/wish_icon.png')
                : require('./src/images/wish_n_icon.png');
            return <Image source={icon} style={styles.tabIcon} />;
          },
        },
      },
    },
    {
      tabBarOptions: {
        showLabel: false,
        activeTintColor: '#FF543C',
        inactiveTintColor: 'black',
        tabStyle: {
          height: 50,
          zIndex: 99,
          borderColor: 'white',
          borderTopWidth: 0,
        },
        labelStyle: {
          fontSize: 12,
          paddingTop: 2,
          paddingBottom: 3,
          fontFamily: 'halfmoon_bold',
        },
      },
    },
  ),
});
const App = createAppContainer(switchNavigator);

// const App = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <View style={styles.container}>
//             <Text>Open up App.js to start working with your app</Text>
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={appPersist}>
        <App />
      </PersistGate>
    </Provider>
  );
};

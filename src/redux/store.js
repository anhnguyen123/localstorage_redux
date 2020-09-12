import {applyMiddleware, combineReducers, createStore} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import AsynStorage from '@react-native-community/async-storage';
import reducer from './reducers';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage: AsynStorage,
  whitelist:['wishlist']
};

const rootReducer = combineReducers({
  movieReducer: persistReducer(persistConfig, reducer),
});
const store = createStore(rootReducer, applyMiddleware(thunk));
const appPersist = persistStore(store);
export {store, appPersist};

import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './Reducer';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

let composeEnhancers = compose;
/*  eslint no-undef: 0    */
if (__DEV__) {
  /*  eslint no-underscore-dangle: 0    */
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const persistedReducer = persistReducer(persistConfig, reducer);
const store = createStore(
  persistedReducer,
  {},
  composeEnhancers(applyMiddleware(ReduxThunk)),
);
// const store = createStore(persistedReducer, applyMiddleware(thunk))
const persistor = persistStore(store);

export {store, persistor};

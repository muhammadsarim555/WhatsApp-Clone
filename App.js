import * as React from 'react';

import {SocketIOProvider} from 'use-socketio';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';

import {API_URL} from './src/config/apiConfig';

import {CustomComponents} from './src/components';
import Navigation from './src/navigation';
import AuthNavigator from './src/navigation/authNavigator';

function App() {
  // console.disableYellowBox = true;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketIOProvider
          url={"http://" + API_URL + ':8000'}
          opts={{
            query: {
              userId: 'op_user_1',
            },
          }}>
          <Navigation />
        </SocketIOProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

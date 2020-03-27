import * as React from 'react';

import {SocketIOProvider} from 'use-socketio';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './src/store';

import {CustomComponents} from './src/components';
import Navigation from './src/navigation';
import AuthNavigator from './src/navigation/authNavigator';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SocketIOProvider
          url="http://192.168.1.106:8000"
          opts={{
            query: {
              userId: 'op_user_1',
            },
          }}>
          <Navigation />
          {/* <CustomComponents.Loader /> */}
        </SocketIOProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;

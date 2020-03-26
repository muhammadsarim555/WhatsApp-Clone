import * as React from 'react';

import Navigation from './src/navigation';
import {SocketIOProvider} from 'use-socketio';

function App() {
  return (
    <SocketIOProvider
      url="http://192.168.4.102:8000"
      opts={{
        query: {
          userId: 'op_user_1',
        },
      }}>
      <Navigation />
    </SocketIOProvider>
  );
}

export default App;

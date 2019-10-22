import React from 'react';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import { store, persistor } from './store';

import Background from './components/Background';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Background>
          <StatusBar barStyle="light-content" backgroundColor="#000000" />
          <App />
        </Background>
      </PersistGate>
    </Provider>
  );
}

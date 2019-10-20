import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Background from './components/Background';
import App from './App';

export default function Index() {
  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#22202C" />
      <App />
    </Background>
  );
}

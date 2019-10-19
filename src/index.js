import React from 'react';
import { StatusBar } from 'react-native';

import Background from './components/Background';

import App from './App';
// import { Container } from './styles';

export default function Index() {
  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#22202C" />
      <App />
    </Background>
  );
}

import React from 'react';
import { Image } from 'react-native';
import PropTypes from 'prop-types';

import logo from '~/assets/logo.png';
import { Container } from './styles';

export default function Header({ children }) {
  return (
    <>
      <Container>
        <Image source={logo} size={24} />
      </Container>
      {children}
    </>
  );
}

Header.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.element]).isRequired,
};

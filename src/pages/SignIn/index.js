import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Image } from 'react-native';

import { signInRequest } from '~/store/modules/auth/actions';
import logo from '~/assets/logo.png';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  SignLink,
  SignLinkText,
} from './styles';

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const passwordRef = useRef();

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Image source={logo} />

      <Form>
        <FormInput
          icon="mail-outline"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Type your e-mail"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />

        <FormInput
          icon="lock-outline"
          secureTextEntry
          placeholder="Your secret password"
          returnKeyType="send"
          ref={passwordRef}
          onSubmitEditing={handleSubmit}
          value={password}
          onChangeText={setPassword}
        />

        <SubmitButton onPress={handleSubmit}>Sign in</SubmitButton>

        <SignLink onPress={() => navigation.navigate('SignUp')}>
          <SignLinkText>create a new account</SignLinkText>
        </SignLink>
      </Form>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

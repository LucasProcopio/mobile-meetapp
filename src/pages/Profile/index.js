import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';
import Header from '~/components/Header';
import Form from './Form';

import {
  Container,
  // FormInput,
  // SubmitButton,
  // LogoutButton,
  // Separator,
} from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState(false);

  function handleLogout() {
    dispatch(signOut());
  }

  const formProps = {
    name,
    email,
    oldPassword,
    newPassword,
    confirmPassword,
    loading,
    handleLogout,
  };
  return (
    <Header>
      <Container>
        <Form {...formProps} />
        {/* <FormInput
            icon="person-outline"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Type your full name"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
            value={name}
            onChangeText={setName}
          />

          <FormInput
            icon="mail-outline"
            keyboardType="email-address"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Type your e-mail"
            returnKeyType="next"
            ref={emailRef}
            onSubmitEditing={() => oldPasswordRef.current.focus()}
            value={email}
            onChangeText={setEmail}
          />

          <Separator />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Current password"
            returnKeyType="send"
            ref={oldPasswordRef}
            onSubmitEditing={() => newPasswordRef.current.focus()}
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="New password"
            returnKeyType="send"
            ref={newPasswordRef}
            onSubmitEditing={() => confirmPasswordRef.current.focus()}
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <FormInput
            icon="lock-outline"
            secureTextEntry
            placeholder="Confirm password"
            returnKeyType="send"
            ref={confirmPasswordRef}
            onSubmitEditing={handleSubmit}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Save profile
          </SubmitButton>

          <LogoutButton loading={loading} onPress={handleLogout}>
            Logout
          </LogoutButton>
        </Form> */}
      </Container>
    </Header>
  );
}

function ProfileIcon({ tintColor }) {
  return <Icon name="person" color={tintColor} size={20} />;
}

ProfileIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Profile.navigationOptions = {
  tabBarIcon: ProfileIcon,
};

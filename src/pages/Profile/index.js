import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as Yup from 'yup';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';
import Header from '~/components/Header';
import {
  Container,
  Form,
  FormInput,
  SubmitButton,
  LogoutButton,
  Separator,
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

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const emailRef = useRef();

  const schema = Yup.object().shape({
    name: Yup.string().required('Your name is required!'),
    email: Yup.string()
      .email('E-mail is not valid')
      .required('Your e-mail is required'),
    oldPassword: Yup.string(),
    newPassword: Yup.string().when('oldPassword', (oldPass, field) =>
      oldPass ? field.required().min(8) : field
    ),
    // confirmPassword: Yup.string().when('newPassword', {
    //   is: true,
    //   then: Yup.string().oneOf(
    //     [Yup.ref('newPassword'), null],
    //     'Password does not match'
    //   ),
    //   otherwise: Yup.string().notRequired(),
    // }),
  });

  async function handleSubmit() {
    const validation = await schema.validate({
      name,
      email,
      oldPassword,
      newPassword,
      confirmPassword,
    });
    console.tron.log(validation);
  }

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Header>
      <Container>
        <Form>
          <FormInput
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
        </Form>
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

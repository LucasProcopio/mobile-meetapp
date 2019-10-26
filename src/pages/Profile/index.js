import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

import Header from '~/components/Header';
import Form from './Form';

import { Container } from './styles';

export default function Profile() {
  const profile = useSelector(state => state.user.profile);
  const loading = useSelector(state => state.user.loading);
  const dispatch = useDispatch();

  const { name, email } = profile;

  /**
   * Updates user profile
   */
  function handleUpdate(data) {
    dispatch(updateProfileRequest(data));
  }

  /**
   * User logout
   */
  function handleLogout() {
    dispatch(signOut());
  }

  const formProps = {
    name,
    email,
    loading,
    handleLogout,
    handleUpdate,
  };
  return (
    <Header>
      <Container>
        <Form {...formProps} />
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

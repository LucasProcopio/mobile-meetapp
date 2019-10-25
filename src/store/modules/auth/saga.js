import { all, call, put, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert('Login error', '💩 User cannot be a provider 💩');
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (e) {
    yield put(signFailure());

    const message = e.response
      ? `❌ ${e.response.data.error} ❌`
      : '💩 An internal error ocurred while trying to login, please try again later 💩';

    Alert.alert('Authentication failed', message);
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;
    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    Alert.alert(
      '👏 Success',
      `✅ ${name} your account was successfully created`
    );
  } catch (e) {
    const message = e.response
      ? `❌ ${e.response.data.error} ❌`
      : '💩 An internal error ocurred while trying to subscribe, please try again later 💩';

    Alert.alert('Subscription error', message);

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);

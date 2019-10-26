import React from 'react';

import * as Yup from 'yup';
import { withFormik } from 'formik';
import PropTypes from 'prop-types';

import {
  FormWrapper,
  FormInput,
  SubmitButton,
  LogoutButton,
  Separator,
  ErrorText,
} from './styles';

const Form = props => {
  console.tron.log(props);
  const {
    errors,
    handleLogout,
    handleSubmit,
    setFieldValue,
    values,
    loading,
  } = props;

  const { name, email, oldPassword, newPassword, confirmPassword } = values;
  console.tron.log(props);
  return (
    <FormWrapper>
      <FormInput
        icon="person-outline"
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Type your full name"
        returnKeyType="send"
        value={name}
        onChangeText={text => setFieldValue('name', text)}
      />

      {errors.name && <ErrorText>{errors.name}</ErrorText>}

      <FormInput
        icon="mail-outline"
        keyboardType="email-address"
        autoCorrect={false}
        autoCapitalize="none"
        placeholder="Type your e-mail"
        returnKeyType="send"
        value={email}
        onChangeText={text => setFieldValue('email', text)}
      />

      {errors.email && <ErrorText>{errors.email}</ErrorText>}

      <Separator />

      <FormInput
        icon="lock-outline"
        secureTextEntry
        placeholder="Current password"
        returnKeyType="send"
        value={oldPassword}
        onChangeText={text => setFieldValue('oldPassword', text)}
      />

      {errors.oldPassword && <ErrorText>{errors.oldPassword}</ErrorText>}

      <FormInput
        icon="lock-outline"
        secureTextEntry
        placeholder="New password"
        returnKeyType="send"
        value={newPassword}
        onChangeText={text => setFieldValue('newPassword', text)}
      />

      {errors.newPassword && <ErrorText>{errors.newPassword}</ErrorText>}

      <FormInput
        icon="lock-outline"
        secureTextEntry
        placeholder="Confirm password"
        returnKeyType="send"
        value={confirmPassword}
        onChangeText={text => setFieldValue('confirmPassword', text)}
      />

      {errors.confirmPassword && (
        <ErrorText>{errors.confirmPassword}</ErrorText>
      )}

      <SubmitButton loading={loading} onPress={handleSubmit}>
        Save profile
      </SubmitButton>

      <LogoutButton loading={loading} onPress={handleLogout}>
        Logout
      </LogoutButton>
    </FormWrapper>
  );
};

export default withFormik({
  validateOnChange: false,
  mapPropsToValues: props => {
    const { name, email, oldPassword, newPassword, confirmPassword } = props;
    return {
      name,
      email,
      oldPassword,
      newPassword,
      confirmPassword,
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Your name is required!'),
    email: Yup.string()
      .email('E-mail is not valid')
      .required('Your e-mail is required'),
    oldPassword: Yup.string(),
    newPassword: Yup.string().when('oldPassword', (value, field) =>
      value
        ? field
            .required('The New password is required')
            .min(8, 'The new password must be at least 8 characters')
        : field
    ),
    confirmPassword: Yup.string().when('newPassword', (value, field) =>
      value
        ? field
            .required('Please confirm your password')
            .oneOf([Yup.ref('newPassword'), null], 'Password does not match')
        : field
    ),
  }),

  handleSubmit: values => {
    console.tron.log('values', values);
  },
})(Form);

Form.propTypes = {
  errors: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    oldPassword: PropTypes.string,
    newPassword: PropTypes.string,
    confirmPassword: PropTypes.string,
  }),
  handleLogout: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  values: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    oldPassword: PropTypes.string.isRequired,
    newPassword: PropTypes.string.isRequired,
    confirmPassword: PropTypes.string.isRequired,
  }).isRequired,
};

Form.defaultProps = {
  errors: PropTypes.object,
};

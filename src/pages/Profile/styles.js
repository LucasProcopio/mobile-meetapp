import styled from 'styled-components/native';

import Input from '~/components/Input';
import Button from '~/components/Button';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`;

export const Form = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 0, paddingVertical: 20 },
})`
  align-self: stretch;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 5px;
`;

export const LogoutButton = styled(Button)`
  margin-top: 15px;
  background: #d44059;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  margin: 20px 0 30px;
`;

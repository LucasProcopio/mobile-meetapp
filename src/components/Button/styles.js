import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  justify-content: center;
  align-items: center;
  height: 50px;

  background: #f94d6a;
  border-radius: 4px;
`;

export const BText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`;

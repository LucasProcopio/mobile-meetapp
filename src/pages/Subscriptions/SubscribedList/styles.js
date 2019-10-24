import styled from 'styled-components/native';

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const NoMeetUpText = styled.Text`
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  font-size: 20px;
  margin: 20px 0;
`;

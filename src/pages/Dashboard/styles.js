import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  justify-content: center;
  align-items: center;
  padding: 0 20px;
`;

export const DateWrapper = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  text-align: center;
`;

export const DateText = styled.Text`
  color: #fff;
  font-size: 20px;
  text-align: center;
  margin: 30px 20px;
`;

export const MeetupList = styled.FlatList.attrs({
  showVerticalScrollIndicator: false,
})``;

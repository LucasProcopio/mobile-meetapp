import styled from 'styled-components/native';

import Button from '~/components/Button';

export const MeetupWrapper = styled.View`
  background: #fff;
  width: 320px;
  height: 345px;
  border-radius: 4px;
  margin: 10px 0;
`;

export const Banner = styled.ImageBackground`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  overflow: hidden;
  width: 100%;
  height: 150px;
`;

export const MeetupContent = styled.View`
  padding: 10px 20px;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
`;

export const InfoWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
`;

export const InfoText = styled.Text`
  color: #999999;
  font-size: 13px;
  padding-left: 5px;
`;

export const SubscribeButton = styled(Button)``;

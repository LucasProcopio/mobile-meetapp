import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import meetupExample from '~/assets/meetup-example.jpg';

import {
  MeetupWrapper,
  Banner,
  MeetupContent,
  Title,
  InfoWrapper,
  InfoText,
  SubscribeButton,
} from './styles';

export default function Meetup() {
  return (
    <MeetupWrapper>
      <Banner source={meetupExample} />
      <MeetupContent>
        <Title>Meet up React native</Title>
        <InfoWrapper>
          <Icon name="event" size={14} color="#999" />
          <InfoText>march 12, at 20h</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <Icon name="place" size={14} color="#999" />
          <InfoText>some really cool location</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <Icon name="person" size={14} color="#999" />
          <InfoText>Organizer: Lucas Procopio</InfoText>
        </InfoWrapper>
        <SubscribeButton>Subscribe</SubscribeButton>
      </MeetupContent>
    </MeetupWrapper>
  );
}

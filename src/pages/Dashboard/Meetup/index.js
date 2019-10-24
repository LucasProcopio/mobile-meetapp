import React from 'react';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  MeetupWrapper,
  Banner,
  MeetupContent,
  Title,
  InfoWrapper,
  InfoText,
  SubscribeButton,
} from './styles';

export default function Meetup({ data: meetup, subscribe }) {
  return (
    <MeetupWrapper>
      <Banner source={{ uri: meetup.banner.url }} />
      <MeetupContent>
        <Title>{meetup.title}</Title>
        <InfoWrapper>
          <Icon name="event" size={14} color="#999" />
          <InfoText>{meetup.formattedDate}</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <Icon name="place" size={14} color="#999" />
          <InfoText>{meetup.location}</InfoText>
        </InfoWrapper>
        <InfoWrapper>
          <Icon name="person" size={14} color="#999" />
          <InfoText>Organizer: {meetup.User.name}</InfoText>
        </InfoWrapper>
        <SubscribeButton onPress={() => subscribe(meetup.id)}>
          Subscribe
        </SubscribeButton>
      </MeetupContent>
    </MeetupWrapper>
  );
}

Meetup.propTypes = {
  data: PropTypes.shape({
    banner: PropTypes.shape({
      url: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    User: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
  subscribe: PropTypes.func.isRequired,
};

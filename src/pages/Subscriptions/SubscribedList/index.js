import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { List, NoMeetUpText, Container } from './styles';
import Meetup from '~/pages/Subscriptions/Meetup';

export default function SubscribedList({ meetups, cancelSubscription }) {
  if (meetups.length > 0) {
    return (
      <List
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Meetup data={item} cancelSubscription={cancelSubscription} />
        )}
      />
    );
  }
  return (
    <Container>
      <Icon name="event-busy" size={40} color="rgba(255, 255, 255, 0.6)" />
      <NoMeetUpText>No meetups available.</NoMeetUpText>
    </Container>
  );
}

SubscribedList.propTypes = {
  meetups: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number,
    }).isRequired
  ).isRequired,
  cancelSubscription: PropTypes.func.isRequired,
};

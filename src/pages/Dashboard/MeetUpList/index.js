import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { List, NoMeetUpText, Container } from './styles';
import Meetup from '~/pages/Dashboard/Meetup';

export default function MeetUpList({ meetups, subscribe }) {
  if (meetups.length > 0) {
    return (
      <List
        data={meetups}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => <Meetup data={item} subscribe={subscribe} />}
      />
    );
  }
  return (
    <Container>
      <Icon name="event-busy" size={40} color="rgba(255, 255, 255, 0.6)" />
      <NoMeetUpText>
        No meetups available for this date, please select a new data
      </NoMeetUpText>
    </Container>
  );
}

MeetUpList.propTypes = {
  meetups: PropTypes.arrayOf(
    PropTypes.shape({
      length: PropTypes.number.isRequired,
    }).isRequired
  ).isRequired,
  subscribe: PropTypes.func.isRequired,
};

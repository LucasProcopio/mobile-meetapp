import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '~/components/Header';
import meetupExample from '~/assets/meetup-example.jpg';
import {
  Container,
  DateText,
  Meetup,
  Banner,
  MeetupContent,
  Title,
  InfoWrapper,
  InfoText,
  SubscribeButton,
  DateWrapper,
} from './styles';

function DashboardIcon({ tintColor }) {
  return <Icon name="event" size={20} color={tintColor} />;
}

export default function Dashboard() {
  return (
    <Header>
      <Container>
        <DateWrapper>
          <Icon name="chevron-left" size={30} color="#fff" />
          <DateText>March 31</DateText>
          <Icon name="chevron-right" size={30} color="#fff" />
        </DateWrapper>
        <Meetup>
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
        </Meetup>
      </Container>
    </Header>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: DashboardIcon,
};

DashboardIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

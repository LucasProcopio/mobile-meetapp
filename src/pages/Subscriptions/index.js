import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Header from '~/components/Header';
import SubscribedList from './SubscribedList';

import { Container, LoaderWrapper } from './styles';

export default function Subscriptions() {
  const [meetups, setMeetups] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function getSubscribbedMeetups() {
      try {
        setLoader(true);
        const response = await api.get('subscribe');

        const meetupData = response.data.map(meetup => {
          return {
            ...meetup,
            formattedDate: format(parseISO(meetup.date), "MMMM, do 'at' p"),
          };
        });

        setLoader(false);
        setMeetups(meetupData);
      } catch (e) {
        setLoader(false);
        const message = e.response
          ? `❌ ${e.response.data.error} ❌`
          : '💩 An internal error ocurred while trying retrieve subscribbed meetups, please try again later 💩';

        Alert.alert('Subscription error', message);
      }
    }
    getSubscribbedMeetups();
  }, []);

  function handleCancelSubcription() {}

  return (
    <Header>
      <Container>
        {loader ? (
          <LoaderWrapper>
            <ActivityIndicator size={60} color="#fff" />
          </LoaderWrapper>
        ) : (
          <SubscribedList
            meetups={meetups}
            cancelSubscription={handleCancelSubcription}
          />
        )}
      </Container>
    </Header>
  );
}

function SubscritopnsIcon({ tintColor }) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: SubscritopnsIcon,
};

SubscritopnsIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

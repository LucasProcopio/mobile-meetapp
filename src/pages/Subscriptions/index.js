import React, { useEffect, useState } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { format, parseISO } from 'date-fns';
import PropTypes from 'prop-types';

import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '~/services/api';
import Header from '~/components/Header';
import SubscribedList from './SubscribedList';

import { Container, LoaderWrapper } from './styles';

function Subscriptions({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [loader, setLoader] = useState(false);
  const [refreshList, setRefreshList] = useState(false);

  async function getSubscribbedMeetups() {
    try {
      setLoader(true);
      const response = await api.get('subscriptions');

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
        ? `❌ ${e.response.data.error}`
        : '💩 An internal error ocurred while trying retrieve subscribbed meetups, please try again later';

      Alert.alert('Subscriptions list error', message);
    }
  }

  useEffect(() => {
    if (isFocused) {
      getSubscribbedMeetups();
    }
  }, [isFocused, refreshList]);

  async function handleCancelSubcription(subscription) {
    const { id } = subscription;

    try {
      await api.delete(`subscription/${id}`);

      setRefreshList(!refreshList);
    } catch (e) {
      const message = e.response
        ? `❌ ${e.response.data.error}`
        : '💩 An internal error ocurred while trying unsubscribe, please try again later';

      Alert.alert('Cancel meetup subscription error', message);
    }
  }

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

function SubscriptionsIcon({ tintColor }) {
  return <Icon name="local-offer" size={20} color={tintColor} />;
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Subscriptions',
  tabBarIcon: SubscriptionsIcon,
};

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

SubscriptionsIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

export default withNavigationFocus(Subscriptions);

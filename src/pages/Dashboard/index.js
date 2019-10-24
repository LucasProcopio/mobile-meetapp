import React, { useState, useMemo, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { subDays, format, addDays, parseISO } from 'date-fns';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '~/services/api';
import Header from '~/components/Header';
import MeetupList from './MeetUpList';

import { Container, DateText, DateWrapper, LoaderWrapper } from './styles';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormatDate] = useState('');

  const [meetups, setMeetups] = useState([]);
  const [page, setPage] = useState(1);

  const [loader, setLoader] = useState(false);

  /**
   * Format current selected date
   */
  useMemo(() => {
    function formatDate() {
      const newDate = format(date, 'MMMM, do');
      setFormatDate(newDate);
    }

    formatDate();
  }, [date]);

  /**
   * Loads list of meetups regarding to the selected date
   */
  useEffect(() => {
    async function getMeetups() {
      try {
        setLoader(true);
        const response = await api.get('meetups', {
          params: {
            page: 1,
            date,
          },
        });

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
          : '💩 An internal error ocurred while trying to retrieve the meetups, please try again later 💩';

        Alert.alert('Meetup list error', message);
      }
    }

    getMeetups();
  }, [date]);

  /**
   * Decrement date by one day
   */
  function decrementDate() {
    setDate(subDays(date, 1));
    setPage(1);
  }

  /**
   * Increment date by one day
   */
  function incrementDate() {
    setDate(addDays(date, 1));
    setPage(1);
  }

  /**
   * Handle user meetup subscription
   */
  async function handleSubscription(meetupId) {
    try {
      await api.post(`subscribe/${meetupId}`);

      Alert.alert(
        '👏 Success',
        '✅ You have successfully subscribbed for this meetup'
      );
    } catch (e) {
      const message = e.response
        ? `❌ ${e.response.data.error} ❌`
        : '💩 An internal error ocurred while trying to subscribe, please try again later 💩';

      Alert.alert('Subscription error', message);
    }
  }

  /**
   * Load more meetups for the flat List
   */
  async function loadMore() {
    try {
      setPage(page + 1);
      const nextPage = page + 1;

      const response = await api.get('meetups', {
        params: {
          page: nextPage,
          date,
        },
      });

      const meetupData = response.data.map(meetup => {
        return {
          ...meetup,
          formattedDate: format(parseISO(meetup.date), "MMMM, do 'at' p"),
        };
      });

      // console.tron.log('new', meetupData);
      // console.tron.log('old', meetups);
      // console.tron.log('response'.response);

      setMeetups([...meetups, ...meetupData]);
    } catch (e) {
      const message = e.response
        ? `❌ ${e.response.data.error} ❌`
        : '💩 An internal error ocurred while trying to load more meetups, please try again later 💩';

      Alert.alert('Meetups error', message);
    }
  }

  return (
    <Header>
      <Container>
        <DateWrapper>
          <TouchableOpacity onPress={decrementDate}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <DateText>{formattedDate}</DateText>
          <TouchableOpacity onPress={incrementDate}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateWrapper>
        {loader ? (
          <LoaderWrapper>
            <ActivityIndicator size={60} color="#fff" />
          </LoaderWrapper>
        ) : (
          <MeetupList
            meetups={meetups}
            subscribe={handleSubscription}
            loadMore={loadMore}
          />
        )}
      </Container>
    </Header>
  );
}

function DashboardIcon({ tintColor }) {
  return <Icon name="format-list-bulleted" size={20} color={tintColor} />;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: DashboardIcon,
};

DashboardIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

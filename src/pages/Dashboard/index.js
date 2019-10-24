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
  const [loader, setLoader] = useState(false);

  useMemo(() => {
    function formatDate() {
      const newDate = format(date, 'MMMM, do');
      setFormatDate(newDate);
    }

    formatDate();
  }, [date]);

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
        const message = e.response
          ? `❌ ${e.response.data.error} ❌`
          : '💩 An internal error ocurred while trying to retrieve the meetups, please try again later 💩';

        Alert.alert('Meetup list error', message);
      }
    }

    getMeetups();
  }, [date]);

  function decreaseDate() {
    setDate(subDays(date, 1));
  }

  function increseDate() {
    setDate(addDays(date, 1));
  }

  async function handleSubscription(meetupId) {
    console.tron.log(meetupId);
  }

  return (
    <Header>
      <Container>
        <DateWrapper>
          <TouchableOpacity onPress={decreaseDate}>
            <Icon name="chevron-left" size={30} color="#fff" />
          </TouchableOpacity>
          <DateText>{formattedDate}</DateText>
          <TouchableOpacity onPress={increseDate}>
            <Icon name="chevron-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateWrapper>
        {loader ? (
          <LoaderWrapper>
            <ActivityIndicator size={60} color="#fff" />
          </LoaderWrapper>
        ) : (
          <MeetupList meetups={meetups} subscribe={handleSubscription} />
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

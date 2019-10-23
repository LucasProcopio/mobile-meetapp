import React, { useState, useMemo, useEffect } from 'react';

import { subDays, format, addDays } from 'date-fns';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import api from '~/services/api';
import Header from '~/components/Header';

import { Container, DateText, DateWrapper, MeetupList } from './styles';
import Meetup from './Meetup';

export default function Dashboard() {
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormatDate] = useState('');
  const [meetups, setMeetups] = useState('');
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
      setLoader(true);
      const response = await api.get('meetups', {
        params: {
          page: 1,
          date,
        },
      });

      console.tron.log('Meetups', response.data);
      setLoader(false);
      setMeetups(response.data);
    }

    getMeetups();
  }, [date]);

  function decreaseDate() {
    setDate(subDays(date, 1));
  }

  function increseDate() {
    setDate(addDays(date, 1));
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
        <MeetupList
          data={meetups}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <Meetup data={item} />}
        />
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

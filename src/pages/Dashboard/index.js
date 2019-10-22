import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import { Container } from './styles';

function DashboardIcon({ tintColor }) {
  return <Icon name="event" size={20} color={tintColor} />;
}

export default function Dashboard() {
  return <Text>DASHBOARD</Text>;
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: DashboardIcon,
};

DashboardIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

import React, {useState, useEffect} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import {useSelector} from 'react-redux';

import {styles} from './style';
import {store} from '../../store';
import AuthNavigator from '../../navigation/authNavigator';
import Navigation from '../../navigation/index';

export default function Loader({navigation}) {
  useEffect(() => {
    const {user} = store.getState().auth;

    if (user?.phone_no && store.getState()?.auth?.verifiedUser) {
      navigation.navigate('SignUp');
    } else if (user?.contact_no) navigation.navigate('Home');
    else {
      navigation.navigate('Login');
    }
  });

  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text>Loading ...</Text>
    </View>
  );
}

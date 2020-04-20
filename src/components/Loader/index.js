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

    const {phone_no, verifiedUser} = store.getState().auth?.testUser;

    if (phone_no && verifiedUser) {
      navigation.navigate('SignUp');
    } else if (user?.contact_no) navigation.navigate('ChatList');
    else {
      navigation.navigate('Login');
    }
    handleChange();
  });

  function handleChange() {
    const {user} = store.getState().auth;
    const {phone_no, verifiedUser} = store.getState().auth?.testUser;

    console.log(store.getState().auth, 'tore.getState().auth?.testUser');

    store.subscribe(() => {
      if (phone_no && verifiedUser) {
        navigation.navigate('SignUp');
      } else if (store.getState().auth?.user?.contact_no) {
        navigation.navigate('Home');
      }
      // else {
      //   navigation.navigate('Login');
      // }
    });
  }

  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text>Loading ...</Text>
    </View>
  );
}

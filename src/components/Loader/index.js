import React from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import {styles} from './style';

export default function Loader(props) {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <Text>Loading ...</Text>
    </View>
  );
}

import React from 'react';
import {View, Text} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DotIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const headerIconSize = 27;

export default function Header() {
  return (
    <View style={styles.headerContainer}>
      <View style={styles.tabsContainer}>
        <Text style={styles.headingText}>WhatsApp</Text>
        <View style={{flexDirection: 'row', marginRight: 20}}>
          <Icon name="phone" size={headerIconSize} color="#B8B8B8" />
          <DotIcon name="dots-vertical" size={headerIconSize} color="#B8B8B8" />
        </View>
      </View>
    </View>
  );
}

import React from 'react';
import {View, Text} from 'react-native';
import {CustomComponents} from './../../components';
import styles from './style';
import Chat from './chat';
export default function ChatRoom() {
  // alert(JSON.stringify(Footer, HeaderFooter))
  return (
    <View style={styles.mainContainer}>
      <CustomComponents.Header />
      <View style={styles.bodyContainer}>
        <Chat />
      </View>
    </View>
  );
}

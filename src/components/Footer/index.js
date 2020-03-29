import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeIcon from 'react-native-vector-icons/AntDesign';
import DotIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import styles from './style';

const footerIconSize = 30;
const headerIconSize = 27;

function Footer(props) {
  const {navigation, children, screen, tab} = props;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.tabsContainer}>
          <Text style={styles.headingText}>WhatsApp</Text>
          <View style={{flexDirection: 'row', marginRight: 20}}>
            <Icon name="search" size={headerIconSize} color="#B8B8B8" />
            <DotIcon
              name="dots-vertical"
              size={headerIconSize}
              color="#B8B8B8"
            />
          </View>
        </View>
        <View style={styles.headerChild}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>
            <Text
              style={[styles.tabsText, {color: tab === 'Chats' && '#16D174'}]}>
              Chats
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.tabsText}>Story</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('CallList')}>
            <Text
              style={[styles.tabsText, {color: tab === 'Calls' && '#16D174'}]}>
              Calls
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.bodyContainer}>{children}</View>

      <View style={styles.footerContainer}>
        <View style={styles.footerSubContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ChatList')}>
            <HomeIcon
              name="home"
              size={footerIconSize}
              color={screen === 'Home' ? '#16D174' : '#B8B8B8'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Icon
              name="add-circle-outline"
              size={footerIconSize}
              color={screen === 'New Chat' ? '#16D174' : '#B8B8B8'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => null}>
            <Icon
              name="person-outline"
              size={footerIconSize}
              color={screen === 'MyProfile' ? '#16D174' : '#B8B8B8'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Footer;

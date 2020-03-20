import * as React from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeIcon from 'react-native-vector-icons/AntDesign';

import styles from './style';

function HeaderFooter(props) {
  const {navigation, children, showFooter} = props;

  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={33} color="black" />
      </TouchableOpacity>
      <View style={styles.bodyContainer}>{children}</View>

      {showFooter && (
        <View style={styles.footerContainer}>
          <View style={styles.footerSubContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <HomeIcon name="home" size={30} color="#B8B8B8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="add-circle-outline" size={30} color="#B8B8B8" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Icon name="person-outline" size={30} color="#B8B8B8" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

export default HeaderFooter;

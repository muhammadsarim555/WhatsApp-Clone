import React, {useState, useEffect} from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ScrollView,
  FlatList,
} from 'react-native';

import Contacts from 'react-native-contacts';

import styles from './style';
import {CustomComponents} from '../../components';

function Home({navigation}) {
  const [allMobileUsers, setAllMobileUsers] = useState([]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(e => {
      try {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
          } else {
            setAllMobileUsers(contacts);
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  function renderItem({item}) {
    var defaultImage = 'https://bootdey.com/img/Content/avatar/avatar4.png';
    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png';
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    }
    return (
      <TouchableOpacity onPress={() => navigation.navigate('ChatRoom')}>
        <View style={styles.row}>
          <View style={styles.avatarBackground}>
            <Image source={{uri: defaultImage}} style={styles.pic} />
          </View>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.displayName}</Text>
              <View style={styles.activeCircle} />
            </View>
            <View style={styles.end}>
              <Image
                style={[
                  styles.icon,
                  {marginLeft: 15, marginRight: 5, width: 14, height: 14},
                ]}
                source={{
                  uri: 'https://img.icons8.com/small/14/000000/double-tick.png',
                }}
              />
              <Text style={styles.time}>
                {item.date} {item.time}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <CustomComponents.Footer
      navigation={navigation}
      screen="New Chat"
      tab="Home">
      <View style={{flex: 1}}>
        <FlatList
          extraData={allMobileUsers}
          data={allMobileUsers}
          keyExtractor={item => {
            return item.recordID;
          }}
          renderItem={renderItem}
        />
      </View>
    </CustomComponents.Footer>
  );
}

export default Home;

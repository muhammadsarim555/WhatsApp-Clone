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
  const [allUsers, setAllUsers] = useState([
    {
      id: 1,
      name: 'Mark Doe',
      date: '12 jan',
      time: '11:14 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    },
    {
      id: 2,
      name: 'Clark Man',
      date: '12 jul',
      time: '15:58 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
    },
    {
      id: 3,
      name: 'Jaden Boor',
      date: '12 aug',
      time: '12:45 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
    },
    {
      id: 4,
      name: 'Srick Tree',
      date: '12 feb',
      time: '08:32 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    },
    {
      id: 5,
      name: 'John Doe',
      date: '12 oct',
      time: '07:45 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
    },
    {
      id: 6,
      name: 'John Doe',
      date: '12 jan',
      time: '09:54 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
    },
    {
      id: 8,
      name: 'John Doe',
      date: '12 jul',
      time: '11:22 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    },
    {
      id: 9,
      name: 'John Doe',
      date: '12 aug',
      time: '13:33 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
    },
    {
      id: 10,
      name: 'John Doe',
      date: '12 oct',
      time: '11:58 am',
      video: true,
      image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
    },
    {
      id: 11,
      name: 'John Doe',
      date: '12 jan',
      time: '09:28 am',
      video: false,
      image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
    },
  ]);

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(e => {
      console.log(e);
      try {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
            console.log('denide');
          } else {
            setAllMobileUsers(contacts);

            console.log(contacts, '<<>');
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  function renderItem({item}) {
    console.log(allMobileUsers, '<all mobile users>');
    //
    // allMobileUsers.forEach(element =>
    //   console.log(allMobileUsers, 'hello khan'),
    // );

    var callIcon = 'https://img.icons8.com/color/48/000000/phone.png';
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    }
    return (
      <TouchableOpacity>
        <View style={styles.row}>
          <View style={styles.avatarBackground}>
            <Image source={{uri: item.image}} style={styles.pic} />
          </View>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.name}</Text>
              <View
                style={styles.activeCircle}
              />
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
          {/* <Image
            style={[styles.icon, {marginRight: 50}]}
            source={{uri: callIcon}}
          /> */}
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <CustomComponents.Footer navigation={navigation}>
      <View style={{flex: 1}}>
        <FlatList
          extraData={allUsers}
          data={allUsers}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      </View>
    </CustomComponents.Footer>
  );
}

export default Home;

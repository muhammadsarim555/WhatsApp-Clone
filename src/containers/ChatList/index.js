import React, {useState} from 'react';
import {CustomComponents} from '../../components';
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

import {useNavigation} from '@react-navigation/native';
import styles from './style';

import {Icon} from 'galio-framework';

export default function ChatList() {
  const navigation = useNavigation();
  const [allChats, setAllChats] = useState([
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
  function renderItem({item}) {
    // console.log(allMobileUsers, '<all mobile users>');
    //
    // allMobileUsers.forEach(element =>
    //   console.log(allMobileUsers, 'hello khan'),
    // );
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
              <Text style={styles.nameTxt}>{item.name}</Text>
              <Text style={styles.time}>
                {item.date} {item.time}
              </Text>
              {/* <View style={styles.activeCircle} /> */}
            </View>
            <View style={styles.end}>
              <Icon
                name="check"
                family="MaterialIcons"
                size={16}
                style={styles.icon}
              />

              <Text style={styles.msg}>hello dev</Text>
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
    <CustomComponents.Footer navigation={navigation} screen="Home" tab="Chats">
      <View style={{flex: 1}}>
        <FlatList
          extraData={allChats}
          data={allChats}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={renderItem}
        />
      </View>
    </CustomComponents.Footer>
  );
}

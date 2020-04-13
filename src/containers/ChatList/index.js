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
import {useSocket} from 'use-socketio';
import {store} from './../../store';

import axios from 'react-native-axios';
import {API_URL} from '../../config/apiConfig';
export default function ChatList() {
  const navigation = useNavigation();
  const [user, setUser] = React.useState(store.getState().auth.user._id);
  const [chatRoom, setChatRoom] = React.useState(null);
  const {socket} = useSocket();
  React.useEffect(() => {
    navigation.addListener('focus', () => {
      saveToAsyncStorage();
    });
    if (user) {
      socket.on('get_rooms' + user, chatRooms => {
        console.log('room socket', chatRooms);
        setChatRoom(
          chatRooms.sort(
            (a, b) =>
              new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
          ),
        );
      });
    }
  }, []);

  return (
    <CustomComponents.Footer navigation={navigation} screen="Home" tab="Chats">
      <View style={{flex: 1}}>
        <FlatList
          extraData={chatRoom}
          data={chatRoom}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => <Item item={item} currentUser={user._id} />}
        />
      </View>
    </CustomComponents.Footer>
  );
  function saveToAsyncStorage() {
    axios
      .get('http://' + API_URL + ':8000' + '/chat/get_my_rooms', {
        params: {
          _id: user,
        },
      })
      .then(data => {
        // console.log(data.data);
        setChatRoom(data.data);
      })
      .catch(err => console.log(err.message));
  }
}
function Item({item, currentUser}) {
  const navigation = useNavigation();
  // console.log(item, 'ji Item des');
  let [otherUser, setOtherUser] = React.useState(
    item.participant_1._id === currentUser
      ? item.participant_2
      : item.participant_1,
  );
  const {socket} = useSocket();

  React.useEffect(() => {
    socket.on('user' + otherUser._id, data => {
      console.log(data);
      setOtherUser(data);
    });
  }, []);

  var defaultImage = 'https://bootdey.com/img/Content/avatar/avatar4.png';
  if (item.video == true) {
    callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChatRoom', {chatroom_id: item._id})}>
      <View style={styles.row}>
        <View style={styles.avatarBackground}>
          <Image source={{uri: defaultImage}} style={styles.pic} />
        </View>
        <View style={{flex: 2, flexDirection: 'row'}}>
          <View style={{flexDirection: 'column'}}>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>
                {otherUser.first_name +
                  ' ' +
                  (otherUser.last_name ? otherUser.last_name : '')}
              </Text>
            </View>
            <View style={styles.end}>
              <Icon
                name="check"
                family="MaterialIcons"
                size={16}
                style={styles.icon}
              />
              <Text style={styles.msg}>Hello World</Text>
            </View>
          </View>
        </View>
        <View style={{flex: 1}}>
          <Text style={styles.time}>
            12: 10 14-4-2020
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

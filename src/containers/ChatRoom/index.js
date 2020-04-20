import React from 'react';
import {View, Text, BackHandler} from 'react-native';
import {CustomComponents} from './../../components';
import Chat from './chat';
import {API_URL} from '../../config/apiConfig';
import {store} from './../../store';
import axios from 'react-native-axios';
export default function ChatRoom({navigation, route}) {
  const [showModal, setShowModal] = React.useState(false);

  const [roomData, setRoomData] = React.useState(null);
  const [otherUser, setOtherUser] = React.useState(null);
  // console.log(store.getState().auth.user._id);
  React.useEffect(() => {
    getRoomData();
  }, []);

  if (roomData === null) {
    return <View />;
  } else {
    console.log('lol', roomData);
    return (
      <View style={{flex: 1}}>
        <CustomComponents.Header />
        <Chat roomData={roomData} />
      </View>
    );
  }
  async function getRoomData() {

    if (!route.params?.participant_1) {
      axios
        .get('http://' + API_URL + ':8000' + '/chat/get_room_by_id', {
          params: {
            _id: route.params?.chatroom_id,
          },
        })
        .then(data => {
          // console.log(data.data);
          // socket.emit('enter_chat_room', data.data._id);

          setRoomData({
            ...data.data,
            currentUser: store.getState().auth.user._id,
          });
          setOtherUser(
            data.data.participant_2._id === store.getState().auth.user._id
              ? data.data.participant_1
              : data.data.participant_2,
          );
        })
        .catch(err => console.log(err.message));
    } else {
      console.log('hai hai');
      axios
        .get('http://' + API_URL + ':8000' + '/chat/get_room_data', {
          params: {
            participant_1: route.params?.participant_1,
            participant_2: store.getState().auth.user._id,
          },
        })
        .then(data => {
          console.log(data.data);
          setRoomData({
            ...data.data,
            currentUser: store.getState().auth.user._id,
          });
          setOtherUser(
            data.data.participant_2._id === store.getState().auth.user._id
              ? data.data.participant_1
              : data.data.participant_2,
          );
        })
        .catch(err => console.log(err.message, 'get_room_data'));
    }
  }
}

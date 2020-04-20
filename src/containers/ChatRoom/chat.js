import React from 'react';
import {GiftedChat, Bubble} from 'react-native-gifted-chat';
import {SocketIOProvider, useSocket} from 'use-socketio';
import {TouchableOpacity, View, Platform} from 'react-native';

import {Icon} from 'galio-framework';
import styles from './chatStyle';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
import {API_URL} from '../../config/apiConfig';
import {useNavigation} from '@react-navigation/native';

export default function Chat(props) {
  const [messages, setMessages] = React.useState([]);
  const navigation = useNavigation();
  const {socket} = useSocket();

  React.useEffect(() => {
    if (props.roomData._id) {
      socket.emit(
        'join',
        {room: props.roomData._id, name: props.roomData.currentUser},
        error => {
          if (error) {
            alert(error);
          }
        },
      );
      socket.on('message', message => {
        // setMessages([...messages, message]);
        newMessage(message);
        // console.log('incoming msg');
      });
      socket.on('messageRead', id => {
        // console.log('recieved +++++++++++++++++++++++++++++++++++++++=');
        updateMessage(id);
      });
      axios
        .get('http://' + API_URL + ':8000' + '/chat/chat_data', {
          params: {
            chatroom_id: props.roomData._id,
          },
        })
        .then(data => {
          console.log('+++++++++++++++==', data.data);
          setMessages(GiftedChat.append([], data.data));
        })
        .catch(err => console.log(err.message, 'get_room_data'));

      return () => {
        socket.emit('disconnect');
        socket.off();
      };
    }
  }, []);
  const newMessage = React.useCallback(newMessages => {
    setMessages(prevMessages => [newMessages, ...prevMessages]);
  }, []);
  const updateMessage = React.useCallback(id => {
    let arr = messages;
    messages.map((v, i) => {
      console.log('desu', id, v._id);
      if (v._id === id) {
        arr[i].status = 'Recieved';
        console.log('desu', id);
        setMessages(GiftedChat.append([], [...arr]));
      }
    });
  }, []);

  function onSend(messageNew = [], images) {
    // console.log('okkosad', messageNew[0]);
    let fin = messageNew[0];
    // console.log('condition', fin.chatroom_id, props.roomData._id);
    socket.emit('sendMessage', {
      text: fin.text,
      user: props.roomData.currentUser,
      image: fin.image,
      // createdAt: fin.createdAt,
      chatroom_id: props.roomData._id,
    });
  }

  async function onFirstMsg(messageNew = [], images) {
    let fin = messageNew[0];

    axios
      .post('http://' + API_URL + ':8000' + '/chat/add_chatroom', {
        participant_1: props.roomData.participant_1._id,
        participant_2: props.roomData.participant_2._id,
      })
      .then(data => {
        socket.emit(
          'join',
          {room: data.data._id, name: props.roomData.participant_1._id},
          error => {
            if (error) {
              alert(error);
            }
          },
        );
        socket.emit('sendMessage', {
          text: fin.text,
          user: props.roomData.currentUser,
          image: fin.image,
          chatroom_id: data.data._id,
        });

        navigation.replace('ChatRoom', {chatroom_id: data.data._id});
      });
  }

  function selectImage() {
    ImagePicker.openPicker({
      // multiple: true,
    }).then(images => {
      var formData = new FormData();
      // images.map((v, i) => {
      formData.append('images', {
        uri: 'file://' + images.path,
        type: 'image/jpeg',
        name: 'filename',
      });
      // });
      // console.log(images);

      axios
        .post('http://' + API_URL + ':8000/add_images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function(response) {
          onSend([
            {
              text: '',
              createdAt: new Date(),
              image: 'http://' + API_URL + ':8000/' + response.data.path,
              user: props.roomData.currentUser,
            },
          ]);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    });
  }

  return (
    <View style={styles.mainContainer}>
      <GiftedChat
        renderBubble={e => (
          <ChatBubble
            {...e}
            currentUser={props.roomData.currentUser}
            socket={socket}
          />
        )}
        messages={messages}
        onSend={messages =>
          props.roomData._id ? onSend(messages) : onFirstMsg(messages)
        }
        extraData={messages}
        user={{_id: props.roomData.currentUser}}
        renderActions={() => (
          <TouchableOpacity onPress={() => selectImage()}>
            <Icon
              style={styles.icon}
              name="image"
              family="MaterialIcons"
              size={26}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
class ChatBubble extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unRead:
        this.props.currentMessage.status !== 'Recieved' &&
        this.props.currentMessage.user._id === this.props.currentUser,
    };
  }

  componentDidMount() {
    if (
      this.props.currentMessage.status !== 'Recieved' &&
      this.props.currentMessage.user._id !== this.props.currentUser
    ) {
      this.props.socket.emit('messageRead', this.props.currentMessage._id);
    }
  }
  render() {
    // console.log(
    //   this.props.currentMessage.status,
    //   this.props.currentMessage.text,
    //   'booooo/ooo',
    // );
    return (
      <Bubble
        {...this.props}
        textStyle={{
          right: {
            fontWeight: this.state.unRead ? '700' : '500',
          },
        }}
      />
    );
  }
}

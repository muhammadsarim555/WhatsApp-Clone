import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {SocketIOProvider, useSocket} from 'use-socketio';
import {TouchableOpacity, View} from 'react-native';

import {Icon} from 'galio-framework';
import styles from './chatstyle';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';
export default function Chat() {
  const [messages, setMessages] = React.useState([]);
  const {socket} = useSocket('getChat/123', data => {
    setMessages(GiftedChat.append(messages, data));
  });

  React.useEffect(() => {
    socket.emit('getChat/123', []);
  }, []);

  function onSend(messageNew = [], images) {
    socket.emit('addChat/123', messageNew);
  }

  function selectImage() {
    ImagePicker.openPicker({
      multiple: true,
    }).then(images => {
      var formData = new FormData();
      images.map((v, i) => {
        formData.append('images[]', {
          uri: 'file://' + v.path,
          type: 'image/jpeg',
           name: 'filename',
        });
      });
      console.log(images);

      axios
        .post('http://192.168.4.102:8000/add_images', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.message);
        });
    });
  }

  console.log('rerender?');
  return (
    <View style={styles.mainContainer}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
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
      {/* <TouchableOpacity onPress={() => selectImage()}>
        <Icon
          style={styles.icon}
          name="image"
          family="MaterialIcons"
          size={26}
        />
      </TouchableOpacity> */}
    </View>
  );
}

import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {SocketIOProvider, useSocket} from 'use-socketio';

export default function Chat() {
  const [messages, setMessages] = React.useState([]);
  const {socket} = useSocket("getChat/123", (data) => {
    setMessages(GiftedChat.append(messages, data));
  })

  React.useEffect(() => {
    socket.emit("getChat/123", [])
  },[])

  function onSend(messageNew = []) {
    socket.emit("addChat/123", messageNew)
  }
  console.log('rerender?')
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}

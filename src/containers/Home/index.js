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
import axios from 'react-native-axios';
import {API_URL} from '../../config/apiConfig';

function Home({navigation}) {
  const [allMobileUsers, setAllMobileUsers] = useState([]);
  const [loading, setLoading] = useState(false);
console.log("contact list")
  function fetchData(contacts) {
    // let final = [];
    contacts.map((v, i) => {
      axios
        .get(
          `http://${API_URL}:8000/user/login?contact_no=${v.phoneNumbers
            .length !== 0 && v.phoneNumbers[0].number}&contact_exist=true`,
        )
        .then(json => {
          if (
            json.data == 'User Has Not Registered!'
            //  ||
            // (json.data !== null &&
            //   json.data !== false &&
            //   json.data !== undefined)
          ) {
            contacts[i].isUser = false;
            // final.push(contacts[i]);
          } else {
            contacts[i].isUser = json.data;
            // final.push(contacts[i]);
            console.log('push', json.data, i );
          }
        })
        .catch(err => console.log(err.message));

      // let json = axios.get(
      //   `http://${API_URL}:8000/user/login?contact_no=${v.phoneNumbers
      //     .length !== 0 && v.phoneNumbers[0].number}&contact_exist=true`,
      // );
      // if (
      //   json.data == 'User Has Not Registered!' ||
      //   (json.data !== null &&
      //     json.data !== false &&
      //     json.data !== undefined)
      // ) {
      //   contacts[i].isUser = false;
      //   final.push(contacts[i]);
      // } else {
      //   consol.log("push", json.data)
      //   contacts[i].isUser = json.data;
      //   final.push(contacts[i]);
      // }
    });
    // if (final.length === contacts) {
    // console.log('hi');
    return contacts.sort((a, b) => a.isUser - b.isUser);
    // }
  }
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
            // setLoading(true);

            // if (fetchData(contacts).length === contacts.length) {
              setAllMobileUsers(fetchData(contacts));
              // setLoading(false);
            // }
          }
        });
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  function renderItem({item}) {
    // const [user, setUser] = React.useState(null);
    var defaultImage = 'https://bootdey.com/img/Content/avatar/avatar4.png';
    if (item.video == true) {
      callIcon = 'https://img.icons8.com/color/48/000000/video-call.png';
    }

    // React.useEffect(() => {

    // });

    if (
      item.isUser !== null &&
      item.isUser !== false &&
      item.isUser !== undefined
    ) {
      // console.log(
      //   item.isUser !== null,
      //   item.isUser !== false,
      //   item.displayName,
      //   item.isUser,
      // );
      return (
        <TouchableOpacity onPress={() => navigation.navigate('ChatRoom')}>
          <View style={styles.row}>
            <View style={styles.avatarBackground}>
              <Image source={{uri: defaultImage}} style={styles.pic} />
            </View>
            <View>
              <View style={styles.nameContainer}>
                <Text style={styles.nameTxt}>{item.displayName}</Text>
                {/* <View style={styles.activeCircle} /> */}
              </View>
              <View style={styles.end}>
                <Text style={styles.nameTxt}>
                  {item.phoneNumbers.length !== 0 &&
                    item.phoneNumbers[0].number}{' '}
                  {item.isUser !== null && item.isUser === false
                    ? 'invite'
                    : ''}
                </Text>
              </View>
              {/* <View style={styles.end}>
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
            </View> */}
            </View>
          </View>
        </TouchableOpacity>
      );
    } else {
      return <View />;
    }
  }

  return (
    <CustomComponents.Footer
      navigation={navigation}
      screen="New Chat"
      tab="Home">
      <View style={{flex: 1}}>
        {/* <Text>{loading + 'desu' + allMobileUsers.length}</Text> */}
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

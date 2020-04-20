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

function format_number(number) {
  let num = ``;

  function fetchData(contacts) {
    let final = [];
    // contacts.map((v, i) => {
    // +92 344 2382054
    console.log('object');
    axios
      .get(`http://192.168.1.101:8000/user/contact_list?contact_no=923172142662`)
      // , {
      // contact_no: '923172142662',
      // })
      .then(s => console.log(s.data))
      .catch(err => console.log(err));

    // if (v.phoneNumbers[0]?.number.indexOf('+92')) {
    //   let a = v.phoneNumbers[0]?.number.replace('0', '+92');
    //   final.push(a);
    // } else {
    //   final.push(v.phoneNumbers[0]?.number);
    // }

    // console.log(final && final , '::');

    // axios
    //   .get(
    //     `http://${API_URL}:8000/user/login?contact_no=${v.phoneNumbers
    //       .length !== 0 && v.phoneNumbers[0].number}&contact_exist=true`,
    //   )
    //   .then(json => {
    //     console.log(json ,"c")

    //     // if (
    //     //   json.data == 'User Has Not Registered!'
    //     //   //  ||
    //     //   // (json.data !== null &&
    //     //   //   json.data !== false &&
    //     //   //   json.data !== undefined)
    //     // ) {
    //     //   contacts[i].isUser = false;
    //     //   // final.push(contacts[i]);
    //     // } else {
    //     //   contacts[i].isUser = json.data;
    //     //   // final.push(contacts[i]);
    //     //   console.log('push', json.data, i);
    //     // }
    //   })
    //   .catch(err => console.log(err));

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
    // });
    // if (final.length === contacts) {
    // console.log('hi');
    return contacts.sort((a, b) => a.isUser - b.isUser);
    // }
  }
  return out;
}
function Home({navigation}) {
  const [allMobileUsers, setAllMobileUsers] = useState({
    arr_exists: [],
    arr_not_exists: [],
  });
  const [loading, setLoading] = useState(false);
  console.log('contact list');
  function fetchData(contacts) {}
  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(e => {
      console.log(format_number('0334 3762430'));
      try {
        Contacts.getAll((err, contacts) => {
          if (err === 'denied') {
          } else {
            let request_arr = [];
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

    return (
      <TouchableOpacity
        onPress={() =>
          item._id
            ? navigation.navigate('ChatRoom', {
                participant_1: item._id,
              })
            : alert('User is not part of the app')
        }>
        <View style={styles.row}>
          <View
            style={[
              styles.avatarBackground,
              {borderColor: item._id ? 'blue' : 'orange'},
            ]}>
            <Image source={{uri: defaultImage}} style={styles.pic} />
          </View>
          <View>
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt}>{item.name}</Text>
            </View>
            <View style={styles.end}>
              <Text style={styles.nameTxt}>{item.raw_no}</Text>
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
      <View>
        {/* <Text>{loading + 'desu' + allMobileUsers.length}</Text> */}
        <FlatList
          extraData={[
            ...allMobileUsers.arr_exists,
            ...allMobileUsers.arr_not_exists,
          ]}
          data={[
            ...allMobileUsers.arr_exists,
            ...allMobileUsers.arr_not_exists,
          ]}
          keyExtractor={item => {
            return item._id;
          }}
          renderItem={renderItem}
        />
        {/* <FlatList
          extraData={allMobileUsers.arr_not_exists}
          data={allMobileUsers.arr_not_exists}
          keyExtractor={item => {
            return item._id;
          }}
          renderItem={renderItem}
        /> */}
      </View>
    </CustomComponents.Footer>
  );
}

export default Home;

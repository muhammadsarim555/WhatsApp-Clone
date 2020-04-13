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

  let splitNumberDash = number.split('-');
  splitNumberDash.map(v => {
    num += v;
  });
  let splitNumberPlusZero = num.split('+0');
  num = ``;
  splitNumberPlusZero.map(v => {
    num += v;
  });
  let splitNumberPlus = num.split('+');

  num = ``;
  splitNumberPlus.map(v => {
    num += v;
  });
  let splitNumberPlus92 = num.split('+92');

  num = ``;
  splitNumberPlus92.map(v => {
    num += v;
  });
  let splitNumberSpace = num.split(' ');

  number = `+92`;
  splitNumberSpace.map(v => {
    number += v;
  });
  var lastFive = '+92' + number.substr(number.length - 10); // => "Tabs1"

  return lastFive;
}

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for (var i = 0; i < len; i++) {
    var item = a[i];
    if (seen[item.phoneNumbers] !== 1) {
      seen[item.phoneNumbers] = 1;
      out[j++] = item;
    }
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

            contacts.map(v => {
              if (v.phoneNumbers[0]) {
                let contact = {
                  phoneNumbers: format_number(v.phoneNumbers[0].number),
                  name: v.displayName,
                  raw_no: v.phoneNumbers[0].number,
                };
                request_arr.push(contact);
              }
            });
            // console.log(uniq_fast(request_arr), request_arr.length, uniq_fast(request_arr).length)

            axios
              .post('http://' + API_URL + ':8000/user/if_contact_is_user', {
                contacts: uniq_fast(request_arr),
              })
              .then(contacts => {
                console.log(Object.keys(contacts.data));
                setAllMobileUsers(contacts.data);
              });
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
            ? navigation.navigate('ChatRoom')
            : alert('User is not part of the app')
        }>
        <View style={styles.row}>
          <View style={[styles.avatarBackground, {borderColor: item._id ? "blue": "orange"}]}>
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

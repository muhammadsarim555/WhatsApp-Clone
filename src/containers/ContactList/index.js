import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
export default function ContactList() {
  useEffect(() => {
      console.log("useeffect working")
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then((e) => {
        console.log(e)
        // try {
        //     Contacts.getAll((err, contacts) => {
        //         if (err === 'denied') {
        //           // error
        //           console.log("denide")
        //         } else {
        //           // contacts returned in Array
        //           console.log(contacts)
        //         }
        //       });
        // }
        // catch(err) {
        //     console.log(err)
        // }
    });
  }, []);

  return (
    <View>
      <Text>Select A Contact Number</Text>
    </View>
  );
}

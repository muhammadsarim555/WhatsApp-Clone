import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import AddIcon from 'react-native-vector-icons/MaterialIcons';
import {TextInput} from 'react-native-paper';

import styles from './style';
import {CustomComponents} from '../../components/index';

const {width, height} = Dimensions.get('window');

function Login({navigation}) {
  const [countryName, setcountryName] = useState('');
  const [callingCode, setcallingCode] = useState('');
  const [phoneNo, setphoneNo] = useState('');

  function PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
    setcountryName(country.name);
    setcallingCode(callingCode);
    setphoneNo(phoneNumber);
  }

  return (
    // **showfooter** prop is using to show footer
    <CustomComponents.HeaderFooter showFooter={false} navigation={navigation}>
      <ScrollView style={{flex: 1}} topBounceColor="white">
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <TouchableOpacity style={styles.userImageContainer}>
              <Image
                source={require('../../assets/icons/appIcon.png')}
                resizeMode="cover"
                style={{
                  flexDirection: 'row',
                  width: 90,
                  height: 90,
                  borderRadius: 45,
                  alignSelf: 'center',
                }}
              />
              <View style={styles.addIconContainer}>
                <AddIcon
                  name="add"
                  size={18}
                  color={'white'}
                  style={{alignSelf: 'center'}}
                />
              </View>
            </TouchableOpacity>

            <View style={styles.headingContainer}>
              <Text style={{fontSize: 24, fontFamily: 'LexendDeca-Regular'}}>
                Here we go !
              </Text>
              <Text style={styles.headingSubContainer}>
                Please provide your name and profile photo.
              </Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                label="User Name"
                style={{backgroundColor: 'transparent'}}
                selectionColor={'black'}
                underlineColor={'rgb(224,229,233)'}
                mode={'flat'}
                theme={'green'}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CustomComponents.HeaderFooter>
  );
}

export default Login;

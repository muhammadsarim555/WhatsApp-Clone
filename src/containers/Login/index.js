import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import PhoneNumberPicker from 'react-native-country-code-telephone-input';

import styles from './style';
import {CustomComponents} from '../../components/index';
import {color} from 'react-native-reanimated';

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
  console.log({countryName, callingCode, phoneNo});
  return (
    // **showfooter** prop is using to show footer
    <CustomComponents.HeaderFooter showFooter={false}>
      <ScrollView style={{flex: 1}} topBounceColor="white">
        <View style={styles.container}>
          <Image
            source={require('../../assets/icons/appIcon.png')}
            style={styles.iconStyle}
            resizeMode={'contain'}
          />
          <View style={styles.headingContainer}>
            <Text style={{fontSize: 24, fontFamily: 'LexendDeca-Regular'}}>
              Welcome to WhatsApp
            </Text>
            <Text style={styles.headingSubContainer}>
              Provide your phone number, so we can to able to send you
              confirmation code.
            </Text>
          </View>

          <PhoneNumberPicker
            countryHint={{name: 'United States', cca2: 'US', callingCode: '1'}}
            onChange={PhoneNumberPickerChanged.bind(this)}
          />

          <View style={styles.headingContainer}>
            <Text style={styles.headingSubContainer}>
              By continuing, you are indicating that you agree to the Privacy
              Policy and Terms.
            </Text>
          </View>
          <TouchableOpacity style={styles.btnContainer}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CustomComponents.HeaderFooter>
  );
}

export default Login;

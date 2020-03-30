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
import firebase from 'react-native-firebase';

import styles from './style';
import {CustomComponents} from '../../components/index';
import {addNumber} from '../../store/Action';
import {store} from '../../store';

import LottieView from 'lottie-react-native';

import {onUserLogin} from '../../store/Action';

function Login({navigation}) {
  const [countryName, setcountryName] = useState('');
  const [callingCode, setcallingCode] = useState('');
  const [phoneNo, setphoneNo] = useState('');

  function PhoneNumberPickerChanged(country, callingCode, phoneNumber) {
    setcountryName(country.name);
    setcallingCode(callingCode);
    setphoneNo(phoneNumber);
  }

  function onLoginButtonPress(props, number, code) {
    firebase
      .auth()
      .signInWithPhoneNumber(`+${callingCode}${phoneNo}`)
      .then(confirmResult => {
        //
        navigation.navigate('Verification', {confirmResult});

        firebase
          .auth()
          .verifyPhoneNumber(`+${callingCode}${phoneNo}`, 120)
          .on(
            'state_changed',
            phoneAuthSnapshot => {
              phoneAuthSnapshot.error &&
                // Alert.alert(
                //   phoneAuthSnapshot.error.code,
                //   phoneAuthSnapshot.error.nativeErrorMessage,
                // );
                console.log(phoneAuthSnapshot.error, 'error');

              // How you handle these state events is entirely up to your ui flow and whether
              // you need to support both ios and android. In short: not all of them need to
              // be handled - it's entirely up to you, your ui and supported platforms.

              switch (phoneAuthSnapshot.state) {
                // ------------------------
                //  IOS AND ANDROID EVENTS
                // ------------------------
                case firebase.auth.PhoneAuthState.CODE_SENT: // or 'sent'
                  // this.props.navigation.navigate('Verification', {
                  //   confirmResult: confirmResult,
                  // });

                  break;
                case firebase.auth.PhoneAuthState.ERROR: // or 'error'
                  console.log('verification error');
                  console.log(phoneAuthSnapshot.error);
                  break;

                // ---------------------
                // ANDROID ONLY EVENTS
                // ---------------------
                case firebase.auth.PhoneAuthState.AUTO_VERIFY_TIMEOUT: // or 'timeout'
                  console.log('auto verify on android timed out');
                  break;
                case firebase.auth.PhoneAuthState.AUTO_VERIFIED: // or 'verified'
                  console.log('auto verified on android');
                  // navigation.navigate('Verification');

                  setTimeout(() => {
                    onUserLogin({phone_no: `+${callingCode}${phoneNo}`});
                  }, 3000);
                  break;
              }
            },
            error => {
              console.log(error, 'fromerror');
              console.log(error.verificationId);
            },
            phoneAuthSnapshot => {
            },
          );

        store.dispatch(addNumber({phone_no: `+${callingCode}${phoneNo}`}));
      })
      .catch(e => {
        console.log('error =>', e);
      });
  }

  return (
    // **showfooter** prop is using to show footer
    <ScrollView keyboardShouldPersistTaps="always">
      <CustomComponents.HeaderFooter showFooter={false} navigation={navigation}>
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
          <TouchableOpacity
            style={styles.btnContainer}
            // onPress={() => onLoginButtonPress()}
            onPress={() => onUserLogin({phone_no: `+923172142662`})}
          >
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </CustomComponents.HeaderFooter>
    </ScrollView>
  );
}

export default Login;

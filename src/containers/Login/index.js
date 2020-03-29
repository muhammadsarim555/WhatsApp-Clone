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
import {onUserRegister} from '../../store/Action';
import {store} from '../../store';

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

  function changeRoute(navigation) {
    store.dispatch(onUserRegister({info: `+${callingCode}${phoneNo}`}));
    navigation.navigate('Verification');
  }

  function onLoginButtonPress(props, number, code) {
    console.log(`+${callingCode}${phoneNo}`);

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
                  console.log('code sent');
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
                  navigation.navigate('Verification');

                  // setTimeout(() => {
                  //   axios
                  //     .post(
                  //       `http://deaplearning.com/admin/app/api/t/user/login`,
                  //       {
                  //         u_id: number,
                  //         phone: number,
                  //         push_token: this.state.pushToken,
                  //       },
                  //     )
                  //     .then(response => {
                  //       if (response.data.status === 'login successfuly') {
                  //         store.dispatch(
                  //           onGoogleLoginSuccess(response.data.current_user[0]),
                  //         );
                  //         props.navigation.navigate('AuthLoading');
                  //       } else {
                  //         store.dispatch(
                  //           onGoogleLoginSuccess({
                  //             phone: number,
                  //           }),
                  //         );
                  //         props.navigation.navigate('AddDetail');
                  //       }
                  //     })

                  //     .catch(error => {
                  //       console.log(error, 'errpr');

                  //       // Alert.alert(JSON.stringify(error)) &&
                  //       this.dropdown.alertWithType('error', 'Error', error) &&
                  //         this.setState({
                  //           message: `Code Confirm Error: ${error.message}`,
                  //         });
                  //     });
                  // }, 3000);

                  break;
              }
            },
            error => {
              console.log(error, 'fromerror');
              console.log(error.verificationId);
            },
            phoneAuthSnapshot => {
              console.log(phoneAuthSnapshot, 'working auto verified');
              navigation.navigate('SignUp');
            },
          );

        // store.dispatch(onGoogleLoginSuccess({phone: number}));
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
            // onPress={() => store.dispatch(onUserRegister(1223))}
            onPress={() => changeRoute(navigation)}>
            <Text style={styles.btnText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </CustomComponents.HeaderFooter>
    </ScrollView>
  );
}

export default Login;

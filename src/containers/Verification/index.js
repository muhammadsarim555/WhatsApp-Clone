import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import CodeInput from 'react-native-confirmation-code-input';
import {useRoute} from '@react-navigation/native';
import axios from 'react-native-axios';
import {useSelector} from 'react-redux';

import {API_URL} from '../../config/apiConfig';
import styles from './style';
import {store} from '../../store';
import {onUserLogin} from '../../store/Action';
import {CustomComponents} from '../../components/index';

const {width, height} = Dimensions.get('window');

function Verification({route, navigation}) {
  const [number, setNumber] = useState('');

  // const getUpdateProps = useSelector(prop => prop.auth);

  // console.log(getUpdateProps?.user?.phone_no, 'free1');
  // console.log(getUpdateProps?.verifiedUser, 'free2');

  // getUpdateProps?.user?.contact_no
  //   ? navigation.navigate('Home')
  //   : (getUpdateProps?.user?.phone_no && getUpdateProps?.verifiedUser) ||
  //     getUpdateProps?.message == 'User Has Not Registered!'
  //   ? navigation.navigate('SignUp', {phone_no: number})
  //   : null;

  useEffect(() => {
    // getUpdateProps?.user?.phone_no && setNumber(getUpdateProps?.user?.phone_no);

    store.subscribe(() => {
      const {phone_no, verifiedUser} = store.getState().auth?.testUser;

      // phone_no &&
      // verifiedUser &&
      // store.dispatch(onUserLogin(store.getState().auth?.testUser));
      // console.log(store.getState().auth.message, "workingfh")
      // store.getState().auth?.testUser?.phone_no &&
      //   store.getState().auth?.testUser?.verifiedUser &&
      // navigation.navigate('SignUp');
    });
  });

  function _onFulfill(code) {
    const {confirmResult} = route.params;
    let otp = code;

    console.log(store.getState().auth?.testUser?.phone_no, 'verify');

    const userNumber = store.getState().auth?.testUser?.phone_no;

    console.log("userNumber",userNumber)

    if (confirmResult && otp) {
      confirmResult
        .confirm(otp)
        .then(user => {
          axios
            .get(`http://${API_URL}:8000/user/login?contact_no=${userNumber}`)
            .then(json => {
              if (json.data == 'User Has Not Registered!') {
                navigation.navigate('SignUp');
              } else {
                navigation.navigate('Home');
                store.dispatch(onUserLoginSuccess(json.data));
                store.dispatch(verifyUser({verifiedUser: true}));
              }
            })
            .catch(e => console.log(e, 'something'));
        })

        .catch(error => {
          console.log(error, 'while logigin');
        });
    } else {
      alert('Please Correct Right Code!');
    }

    console.log(code, '><><><><');
  }

  return (
    // **showfooter** prop is using to show footer
    <CustomComponents.HeaderFooter showFooter={false} navigation={navigation}>
      <View style={styles.container}>
        <View style={{height: height * 0.6, justifyContent: 'space-around'}}>
          <Image
            source={require('../../assets/icons/appIcon.png')}
            style={styles.iconStyle}
            resizeMode={'contain'}
          />
          <View style={styles.headingContainer}>
            <Text style={{fontSize: 26, fontFamily: 'LexendDeca-Regular'}}>
              Verification
            </Text>
            <Text style={styles.headingSubContainer}>
              We have sent you SMS with a code to the number that you provided.
            </Text>
          </View>
          <View
            style={{
              width: width,
              height: 20,
              justifyContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}
          />
          <CodeInput
            activeColor={'black'}
            inactiveColor={'gray'}
            codeLength={6}
            keyboardType={'numeric'}
            className={'border-b'}
            space={6}
            size={30}
            inputPosition="center"
            onFulfill={code => _onFulfill(code)}
          />
        </View>
      </View>
    </CustomComponents.HeaderFooter>
  );
}

export default Verification;

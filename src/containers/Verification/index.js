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
import {useSelector} from 'react-redux';

import styles from './style';
import {store} from '../../store';
import {onUserLogin} from '../../store/Action';
import {CustomComponents} from '../../components/index';

const {width, height} = Dimensions.get('window');

function Verification({route, navigation}) {
  const getUpdateProps = useSelector(prop => prop.auth);

  if (getUpdateProps?.user?.contact_no) {
    navigation.navigate('Home');
    console.log(JSON.stringify(getUpdateProps) , "from verirification");
  } else {
    console.log(JSON.stringify(getUpdateProps) , "else v");
  }

  function _onFulfill(code) {
    const {confirmResult} = route.params;
    let otp = code;

    if (confirmResult && otp) {
      confirmResult
        .confirm(otp)
        .then(user => {
          console.log('User Has Logged In!', getUpdateProps);

          // store.dispatch(verifyUser({verifiedUser: true}));
          // store.dispatch(onUserLogin({phone_no: `+${callingCode}${phoneNo}`}));
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

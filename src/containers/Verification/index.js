import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';

import CodeInput from 'react-native-confirmation-code-input';

import styles from './style';
import {CustomComponents} from '../../components/index';

const {width, height} = Dimensions.get('window');

function Login({navigation}) {
  const [countryName, setcountryName] = useState('');

  _onFulfill = code => {
    console.log(code, '><><><><');
  };

  return (
    // **showfooter** prop is using to show footer
    <CustomComponents.HeaderFooter showFooter={false}>
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
            secureTextEntry
            codeLength={6}
            className={'border-b'}
            space={6}
            size={60}
            inputPosition="center"
          />
        </View>
      </View>
    </CustomComponents.HeaderFooter>
  );
}

export default Login;

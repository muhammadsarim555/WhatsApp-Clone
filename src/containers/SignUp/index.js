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

function SignUp({navigation}) {
  const [phoneNo, setphoneNo] = useState('');

  return (
    // **showfooter** prop is using to show footer
    <CustomComponents.HeaderFooter showFooter={false} navigation={navigation}>
      <ScrollView style={{flex: 1}} topBounceColor="white">
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <TouchableOpacity style={styles.userImageContainer}>
              <Image
                source={{uri:"https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png"}}
                resizeMode="cover"
                style={styles.userAvatar}
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
                style={{
                  fontFamily: 'LexendDeca-Regular',
                  backgroundColor: 'transparent',
                  fontSize: 16,
                }}
                underlineColor={'rgb(224,229,233)'}
                mode={'flat'}
                theme={{
                  colors: {
                    placeholder: 'black',
                    text: 'black',
                    primary: 'black',
                    underlineColor: 'transparent',
                    background: 'transparent',
                  },
                }}
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

export default SignUp;

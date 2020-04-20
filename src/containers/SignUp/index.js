import React, {useState, useEffect} from 'react';
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
import ImagePicker from 'react-native-image-crop-picker';
import {useSelector} from 'react-redux';
import {API_URL} from '../../config/apiConfig';

import axios from 'react-native-axios';

import styles from './style';
import {CustomComponents} from '../../components/index';
import {store} from '../../store';
import {onUserRegister, onUserLoginSuccess} from '../../store/Action';

function SignUp({route, navigation}) {
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  // const getUpdateProps = useSelector(prop => prop.auth);

  useEffect(() => {
    store.subscribe(() => {
      navigation.navigate('Loader');
    });
  });

  function onSignUp() {
    // store.dispatch(
    //   onUserRegister({
    //     userName,
    //     userAvatar,
    //     phone_no: store.getState().auth?.testUser.phone_no,
    //   }),
    // );

    let formData = new FormData();

    formData.append('first_name', userName);
    formData.append('contact_no', store.getState().auth?.testUser.phone_no);
    formData.append('avatar', userAvatar);

    axios
      .post(
        `http://${API_URL}:8000/user/add_user`,
        formData,

        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(json => {
        store.dispatch(onUserLoginSuccess(json.data));
        navigation.navigate('Home');
      })
      .catch(e => console.log(e));
  }

  function addAvatar() {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then(images => {
        setUserAvatar(images[0].path);
      })
      .catch(e => console.log(e, 'Getting Issue while upload Images!'));
  }

  return (
    // **showfooter** prop is using to show footer
    <CustomComponents.HeaderFooter showFooter={false} navigation={navigation}>
      <ScrollView style={{flex: 1}} topBounceColor="white">
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <TouchableOpacity
              style={styles.userImageContainer}
              onPress={() => addAvatar()}>
              <Image
                source={
                  !userAvatar
                    ? require('../../assets/icons/profile_thumbnail.png')
                    : {uri: userAvatar}
                }
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
                value={userName}
                onChangeText={e => setUserName(e)}
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
          <TouchableOpacity
            style={styles.btnContainer}
            onPress={() => onSignUp()}>
            <Text style={styles.btnText}>Finish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </CustomComponents.HeaderFooter>
  );
}

export default SignUp;

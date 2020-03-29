import * as actionTypes from './actionTypes';
import {API_URL} from '../../config/apiConfig';

import axios from 'react-native-axios';

const onUserRegister = info => {
  return dispatch => {
    let formData = new FormData();

    formData.append('first_name', info.userName);
    // formData.append('contact_no', info.phone_no);
    formData.append('contact_no', '923172142662');
    formData.append('avatar', info.userAvatar);

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
        console.log(json.data, 'afrom acton');
        dispatch({
          type: actionTypes.CURRENTUSER,
          payload: json.data,
          networkRequest: true,
        });
      })
      .catch(e => console.log(e, 'from action'));
  };
};

const onUserLogin = info => {
  // .get(`http://${API_URL}/user/login?contact_no=${info.phone_no}`)
  return dispatch => {
    axios
      .get(`http://192.168.1.106:8000/user/login?contact_no=923172142662`)
      .then(json => {
        console.log(json.data, 'afrom acton');
        dispatch({
          type: actionTypes.CURRENTUSER,
          payload: json.data,
          networkRequest: true,
        });
      })
      .catch(e => console.log(e, 'from action'));
  };
};

const addNumber = info => {
  return dispatch => {
    dispatch({
      type: actionTypes.CURRENTUSER,
      payload: info,
    });
  };
};

export {onUserRegister, onUserLogin, addNumber};

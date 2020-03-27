import * as actionTypes from './actionTypes';

import {API_URL} from '../../config/apiConfig';

const onUserRegister = info => {
  console.log(info, 'info');
  return dispatch => {
    dispatch({
      type: actionTypes.CURRENTUSER,
      payload: 'sarim',
      fetchLoading: false,
    });
    // fetch(`http://${API_URL}:8000/user/add_user`)
    //   .then(response => response.json())
    //   .then(json => {
    //     dispatch({
    //       type: actionTypes.BOOKSINFO,
    //       payload: json,
    //       fetchLoading: false,
    //     });
    //   });
  };
};

export {onUserRegister};

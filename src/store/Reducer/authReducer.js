import {CURRENTUSER} from '../Action/actionTypes';

const INITIAL_STATE = {
  user: [],
  networkRequest: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENTUSER:
      return {
        ...INITIAL_STATE,
        user: action.payload,
        networkRequest: action.networkRequest,
      };

    default:
      return state;
  }
};

export default AuthReducer;

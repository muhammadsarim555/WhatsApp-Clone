import * as actionTypes from '../Action/actionTypes';


const INITIAL_STATE = {
  user: [],
  networkRequest: false,
  verifiedUser: false,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CURRENTUSER:
      return {
        ...INITIAL_STATE,
        user: action.payload,
        networkRequest: action.networkRequest,
      };
    case actionTypes.VERIFIEDUSER:
      return {
        ...INITIAL_STATE,
        verifiedUser: action.payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;

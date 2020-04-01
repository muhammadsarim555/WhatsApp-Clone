import * as actionTypes from '../Action/actionTypes';

const INITIAL_STATE = {
  user: [],
  testUser: [],
  networkRequest: false,
  verifiedUser: false,
  message: '',
  userNumber: '',
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.CURRENTUSER:
      return {
        ...INITIAL_STATE,
        user: action.payload,
        networkRequest: action.networkRequest,
      };
    case 'TESTUSER':
      return {
        ...INITIAL_STATE,
        testUser: action.payload,
        networkRequest: action.networkRequest,
      };
    case actionTypes.VERIFYUSER:
      return {
        ...INITIAL_STATE,
        verifiedUser: action.verifiedUser,
      };
    case actionTypes.LOGOUTUSER:
      return {
        ...INITIAL_STATE,
        user: [],
        networkRequest: false,
        verifiedUser: false,
        message: '',
      };
    case actionTypes.MEESSAGEFROMSERVER:
      return {
        ...INITIAL_STATE,
        message: action.payload,
      };
    case actionTypes.USERNUMBER:
      return {
        ...INITIAL_STATE,
        userNumber: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;

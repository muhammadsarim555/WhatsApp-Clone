import {CURRENTUSER} from '../Action/actionTypes';

const INITIAL_STATE = {
  user: [],
  fetchingUser: true,
};

const AuthReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CURRENTUSER:
      return {
        ...INITIAL_STATE,
        user: action.payload,
        fetchingUser: action.fetchLoading,
      };

    default:
      return state;
  }
};

export default AuthReducer;

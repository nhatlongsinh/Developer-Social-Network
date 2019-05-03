import { GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_PROFILES } from '../actions/types';

const initiateState = {
  profile: {},
  profiles: []
};

export default (state = initiateState, action) => {
  switch (action.type) {
    case CLEAR_CURRENT_PROFILE:
      return { ...state, profile: null };
    case GET_PROFILES:
      return { ...state, profiles: action.payload };
    case GET_PROFILE:
      return { ...state, profile: action.payload };
    default:
      return state;
  }
};

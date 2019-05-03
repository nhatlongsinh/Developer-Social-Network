import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER, CLEAR_CURRENT_PROFILE } from './types';
import history from '../../ultils/history';
import { saveLocalToken, clearLocalToken } from '../../ultils/localStorage';
import { setAuthToken } from '../../ultils/privateApi';
import { thunkErrorHandler } from '../../ultils/thunkHelper';

// register
export const registerUser = newUser => async (dispatch) => {
  try {
    await axios.post('/api/users/register', newUser);
    // redirect
    history.push('/login');
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

// Set logged user
export const setCurrentUser = decoded => ({
  type: SET_CURRENT_USER,
  payload: decoded
});

// login
export const loginUser = user => async (dispatch) => {
  try {
    const res = await axios.post('/api/users/login', user);
    // save to local store
    const { token } = res.data;
    saveLocalToken(token);
    // set token to auth header
    setAuthToken(token);
    // decode token
    const decodedUser = jwtDecode(token);
    // set current use
    dispatch(setCurrentUser(decodedUser));
    // redirect
    history.push('/dashboard');
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const clearCurrentProfile = () => ({ type: CLEAR_CURRENT_PROFILE });

// log user our
export const logoutUser = () => (dispatch) => {
  try {
    clearLocalToken();
    // remove axios token header
    setAuthToken('');
    // dispatch
    dispatch(setCurrentUser({}));
    dispatch(clearCurrentProfile());
    // redirect
    history.push('/login');
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

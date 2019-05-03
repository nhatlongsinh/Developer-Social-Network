import api from '../../ultils/privateApi';
import { GET_PROFILE, GET_PROFILES } from './types';
import { thunkErrorHandler } from '../../ultils/thunkHelper';
import { logoutUser } from './authActions';
import history from '../../ultils/history';

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/profile');
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: {} });
  }
};

export const createProfile = profile => async (dispatch) => {
  try {
    await api.post('/api/profile', profile);
    history.push('/dashboard');
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await api.delete('/api/profile');
      // log out
      dispatch(logoutUser());
      history.push('/login');
    } catch (error) {
      thunkErrorHandler(error, dispatch);
    }
  }
};

export const addExperience = experience => async (dispatch) => {
  try {
    await api.post('/api/profile/experience', experience);
    history.push('/dashboard');
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const deleteExperience = id => async (dispatch) => {
  try {
    const { data } = await api.delete(`/api/profile/experience/${id}`);
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const addEducation = education => async (dispatch) => {
  try {
    await api.post('/api/profile/education', education);
    history.push('/dashboard');
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const deleteEducation = id => async (dispatch) => {
  try {
    const { data } = await api.delete(`/api/profile/education/${id}`);
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const getProfiles = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/profile/all');
    dispatch({ type: GET_PROFILES, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILES, payload: null });
  }
};

export const getProfileByHandle = handle => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/profile/handle/${handle}`);
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: null });
  }
};

export const getProfileByUserId = id => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/profile/user/${id}`);
    dispatch({ type: GET_PROFILE, payload: data });
  } catch (error) {
    dispatch({ type: GET_PROFILE, payload: null });
  }
};

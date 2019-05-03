import api from '../../ultils/privateApi';
import { thunkErrorHandler } from '../../ultils/thunkHelper';
import {
  ADD_POST,
  GET_POSTS,
  DELETE_POST,
  UPDATE_POST_LIKE,
  GET_POST,
  CLEAR_ERRORS
} from './types';

export const addPost = post => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
    const { data } = await api.post('/api/posts', post);
    dispatch({ type: ADD_POST, payload: data });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.get('/api/posts');
    dispatch({ type: GET_POSTS, payload: data });
  } catch (error) {
    dispatch({ type: GET_POSTS, payload: null });
  }
};

export const getPost = id => async (dispatch) => {
  try {
    const { data } = await api.get(`/api/posts/${id}`);
    dispatch({ type: GET_POST, payload: data });
  } catch (error) {
    dispatch({ type: GET_POST, payload: null });
  }
};

export const deletePost = id => async (dispatch) => {
  try {
    await api.delete(`/api/posts/${id}`);
    dispatch({ type: DELETE_POST, payload: id });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const addLike = id => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/like/${id}`);
    dispatch({ type: UPDATE_POST_LIKE, payload: data });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const removeLike = id => async (dispatch) => {
  try {
    const { data } = await api.post(`/api/posts/unlike/${id}`);
    dispatch({ type: UPDATE_POST_LIKE, payload: data });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const addComment = (postId, comment) => async (dispatch) => {
  try {
    dispatch({ type: CLEAR_ERRORS });
    const { data } = await api.post(`/api/posts/comment/${postId}`, comment);
    dispatch({ type: GET_POST, payload: data });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

export const deleteComment = (postId, commentId) => async (dispatch) => {
  try {
    const { data } = await api.delete(`/api/posts/comment/${postId}/${commentId}`);
    dispatch({ type: GET_POST, payload: data });
  } catch (error) {
    thunkErrorHandler(error, dispatch);
  }
};

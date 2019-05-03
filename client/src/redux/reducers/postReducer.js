import {
  ADD_POST, GET_POSTS, DELETE_POST, UPDATE_POST_LIKE, GET_POST
} from '../actions/types';

const initialState = {
  posts: [],
  post: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return { ...state, posts: [action.payload, ...state.posts] };
    case GET_POST:
      return { ...state, post: action.payload };
    case GET_POSTS:
      return { ...state, posts: action.payload };
    case DELETE_POST:
      return { ...state, posts: state.posts.filter(p => p._id !== action.payload), post: null };
    case UPDATE_POST_LIKE:
      return {
        ...state,
        posts: state.posts.map(p => (p._id === action.payload._id ? action.payload : p)),
        post: action.payload
      };
    default:
      return state;
  }
};

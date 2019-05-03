import { GET_ERRORS, APP_API_COMPLETED, APP_API_REQUESTING } from '../redux/actions/types';

export const thunkErrorHandler = (err, dispatch) => dispatch({ type: GET_ERRORS, payload: err });

// export const apiRequesting = dispatch => dispatch({ type: APP_API_REQUESTING });
// export const apiCompleted = dispatch => dispatch({ type: APP_API_COMPLETED });

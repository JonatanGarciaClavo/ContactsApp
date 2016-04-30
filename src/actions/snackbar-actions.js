import { CLOSE_ERROR_MESSAGE, SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';
import _ from 'lodash';

export default {
  closeSnackbar() {
    return dispatch => dispatch({
      type: CLOSE_ERROR_MESSAGE,
    });
  },
  displayError(error) {
    let message = 'Unknown error';
    if (error.message) {
      message = error.message;
    } else if (_.isString(error)) {
      message = error;
    }
    return dispatch => dispatch({
      type: SET_ERROR_MESSAGE,
      message,
    });
  },
};

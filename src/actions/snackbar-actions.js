import _ from 'lodash';
import { CLOSE_ERROR_MESSAGE, SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';

export default {
  closeSnackbar() {
    return {
      type: CLOSE_ERROR_MESSAGE,
    };
  },
  displayError(error) {
    let message = 'Unknown error';
    if (error && error.message) {
      message = error.message;
    } else if (_.isString(error)) {
      message = error;
    }
    return {
      type: SET_ERROR_MESSAGE,
      message,
    };
  },
};

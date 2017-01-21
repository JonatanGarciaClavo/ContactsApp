import { Record } from 'immutable';
import { CLOSE_ERROR_MESSAGE, SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';

export const Snackbar = new Record({
  open: false,
  message: 'Unknown error',
});

const snackbar = (state = new Snackbar(), action) => {
  switch (action.type) {
    case (CLOSE_ERROR_MESSAGE):
      return new Snackbar();
    case (SET_ERROR_MESSAGE):
      return state
        .set('open', true)
        .set('message', action.message);
    default:
      return state;
  }
};

export default snackbar;

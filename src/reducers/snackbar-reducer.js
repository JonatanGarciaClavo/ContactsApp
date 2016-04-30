import { CLOSE_ERROR_MESSAGE, SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';

const initialState = {
  open: false,
  message: 'Unknown error',
};

const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case (CLOSE_ERROR_MESSAGE):
      return Object.assign({}, initialState);
    case (SET_ERROR_MESSAGE):
      return Object.assign({}, state, { open: true, message: action.message });
    default:
      return state;
  }
};

export default snackbar;

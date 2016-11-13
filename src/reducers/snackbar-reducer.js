import { CLOSE_ERROR_MESSAGE, SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';

export const initialState = {
  open: false,
  message: 'Unknown error',
};

const snackbar = (state = initialState, action) => {
  switch (action.type) {
    case (CLOSE_ERROR_MESSAGE):
      return { ...initialState };
    case (SET_ERROR_MESSAGE):
      return { ...state, open: true, message: action.message };
    default:
      return state;
  }
};

export default snackbar;

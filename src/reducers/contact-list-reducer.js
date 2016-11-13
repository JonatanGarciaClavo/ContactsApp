import { REQUEST_CONTACT_LIST, REQUEST_CONTACT_LIST_SUCCESS, CHANGE_LIST_MODE, RESET_CONTACT_LIST }
  from '../constants/contact-list-actions-constants';
import { SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';
import { LIST_MODE } from '../constants/contact-list-mode-constants';

export const initialState = {
  loading: false,
  contacts: [],
  orderBy: 'name',
  mode: LIST_MODE,
};

const contactList = (state = initialState, action) => {
  switch (action.type) {
    case (REQUEST_CONTACT_LIST):
      return { ...state, loading: true };
    case (SET_ERROR_MESSAGE):
      return { ...state, loading: false };
    case (REQUEST_CONTACT_LIST_SUCCESS):
      return {
        ...state,
        contacts: action.contacts,
        loading: false,
      };
    case (CHANGE_LIST_MODE):
      if (action.mode === state.mode) {
        return state;
      }
      return {
        ...state,
        mode: action.mode || LIST_MODE,
      };
    case (RESET_CONTACT_LIST):
      return { ...initialState };
    default:
      return state;
  }
};

export default contactList;

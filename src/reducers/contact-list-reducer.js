import { Record, List } from 'immutable';
import { REQUEST_CONTACT_LIST, REQUEST_CONTACT_LIST_SUCCESS, CHANGE_LIST_MODE, RESET_CONTACT_LIST }
  from '../constants/contact-list-actions-constants';
import { SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';
import { LIST_MODE } from '../constants/contact-list-mode-constants';

export const ContactList = new Record({
  loading: false,
  contacts: new List(),
  orderBy: 'name',
  mode: LIST_MODE,
});

const contactList = (state = new ContactList(), action) => {
  switch (action.type) {
    case (REQUEST_CONTACT_LIST):
      return state.set('loading', true);
    case (SET_ERROR_MESSAGE):
      return state.set('loading', false);
    case (REQUEST_CONTACT_LIST_SUCCESS):
      return state
        .set('contacts', action.contacts)
        .set('loading', false);
    case (CHANGE_LIST_MODE):
      if (action.mode === state.get('mode')) {
        return state;
      }
      return state.set('mode', action.mode || LIST_MODE);
    case (RESET_CONTACT_LIST):
      return new ContactList();
    default:
      return state;
  }
};

export default contactList;

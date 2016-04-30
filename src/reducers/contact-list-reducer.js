import { LOADING_CONTACT_LIST, INITIALIZE_CONTACT_LIST, CHANGE_LIST_MODE }
  from '../constants/contact-list-actions-constants';
import { LIST_MODE } from '../constants/contact-list-mode-constants';

const initialState = {
  loading: false,
  contacts: [],
  orderBy: 'name',
  mode: LIST_MODE,
};

const contactList = (state = initialState, action) => {
  switch (action.type) {
    case (LOADING_CONTACT_LIST):
      return Object.assign({}, state, { loading: true });
    case (INITIALIZE_CONTACT_LIST):
      return Object.assign({}, state, { contacts: action.contacts, loading: false });
    case (CHANGE_LIST_MODE):
      return Object.assign({}, state, { mode: action.mode || LIST_MODE });
    default:
      return state;
  }
};

export default contactList;

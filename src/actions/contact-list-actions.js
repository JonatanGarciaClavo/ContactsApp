import { RESET_CONTACT_LIST, REQUEST_CONTACT_LIST_SUCCESS, CHANGE_LIST_MODE, REQUEST_CONTACT_LIST,
  DELETE_CONTACT } from '../constants/contact-list-actions-constants';
import { TRANSTION_TO_EDIT_CONTACT_CARD } from '../constants/contact-card-actions-constants';
import { TRANSTION_TO_EDIT_CONTACT } from '../constants/contact-actions-constants';

export default {
  initialize() {
    return {
      type: RESET_CONTACT_LIST,
    };
  },
  loadData() {
    return {
      type: REQUEST_CONTACT_LIST,
    };
  },
  recieveContactList(contacts) {
    return {
      type: REQUEST_CONTACT_LIST_SUCCESS,
      contacts,
    }
  },
  deleteContact(id) {
    return {
      type: DELETE_CONTACT,
      id,
    };
  },
  transitionToEditContact(contact) {
    return {
      type: TRANSTION_TO_EDIT_CONTACT,
      contact,
    };
  },
  transitionToContactCard(contact) {
    return {
      type: TRANSTION_TO_EDIT_CONTACT_CARD,
      contact,
    };
  },
  changeListMode(mode) {
    return {
      type: CHANGE_LIST_MODE,
      mode,
    };
  },
}

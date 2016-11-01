import { LOADING_CONTACT_LIST, INITIALIZE_CONTACT_LIST, CHANGE_LIST_MODE, REQUEST_CONTACT_LIST,
  DELETE_CONTACT } from '../constants/contact-list-actions-constants';
import { INITILIZE_CONTACT_CARD_FROM_OTHER_VIEW,
  } from '../constants/contact-card-actions-constants';
import { INITILIZE_CONTACT_FROM_OTHER_VIEW } from '../constants/contact-actions-constants';
import Promise from 'bluebird';

export default {
  requestContactList() {
    return {
      type: REQUEST_CONTACT_LIST,
    };
  },
  loadingContactList() {
    return {
      type: LOADING_CONTACT_LIST,
    };
  },
  recieveContactList(contacts) {
    return {
      type: INITIALIZE_CONTACT_LIST,
      contacts,
    }
  },
  deleteContact(id) {
    return {
      type: DELETE_CONTACT,
      id,
    };
  },
  editContact(contact) {
    return {
      type: INITILIZE_CONTACT_FROM_OTHER_VIEW,
      contact,
    };
  },
  loadContactCard(contact) {
    return {
      type: INITILIZE_CONTACT_CARD_FROM_OTHER_VIEW,
      contact,
    };
  },
  changeListMode(mode) {
    return (dispatch, getState) => {
      if (getState().contactList.mode === mode) {
        return Promise.resolve();
      }
      return dispatch({
        type: CHANGE_LIST_MODE,
        mode,
      });
    }
  },
}

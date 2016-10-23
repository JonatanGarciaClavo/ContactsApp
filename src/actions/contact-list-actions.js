import { LOADING_CONTACT_LIST, INITIALIZE_CONTACT_LIST, CHANGE_LIST_MODE, REQUEST_CONTACT_LIST,
  DELETE_CONTACT } from '../constants/contact-list-actions-constants';
import { INITIALIZE_CONTACT_CARD } from '../constants/contact-card-actions-constants';
import { INITIALIZE_CONTACT } from '../constants/contact-actions-constants';
import { browserHistory } from 'react-router';
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
    return (dispatch) => {
      dispatch({
        type: INITIALIZE_CONTACT,
        contact,
      });
      browserHistory.push(`/edit/${contact.id}`);
      return Promise.resolve();
    };
  },
  loadContactCard(contact) {
    return (dispatch) => {
      dispatch({
        type: INITIALIZE_CONTACT_CARD,
        contact,
      });
      browserHistory.push(`/contact/${contact.id}`);
      return Promise.resolve();
    }
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

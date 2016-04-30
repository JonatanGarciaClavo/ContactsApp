import { LOADING_CONTACT_LIST, INITIALIZE_CONTACT_LIST, CHANGE_LIST_MODE }
  from '../constants/contact-list-actions-constants';
import { INITIALIZE_CONTACT_CARD } from '../constants/contact-card-actions-constants';
import { INITIALIZE_CONTACT } from '../constants/contact-actions-constants';
import ContactsServices from '../services/contacts-services';
import SnackbarActions from './snackbar-actions';
import { browserHistory } from 'react-router'

export default {
  initializeContactList() {
    return (dispatch) => {
      dispatch({
        type: LOADING_CONTACT_LIST,
      });
      return ContactsServices.list()
        .then((contacts) => {
          dispatch({
            type: INITIALIZE_CONTACT_LIST,
            contacts,
          })
          return Promise.resolve(contacts);
        })
        .catch((err) => dispatch(SnackbarActions.displayError(err)));
    }
  },
  deleteContact(id) {
    return (dispatch) =>
      ContactsServices.delete(id).then(() => {
        dispatch({
          type: LOADING_CONTACT_LIST,
        });
        return ContactsServices.list().then((contacts) =>
          dispatch({
            type: INITIALIZE_CONTACT_LIST,
            contacts,
          })
        ).catch((err) => dispatch(SnackbarActions.displayError(err)));
      })
      .catch((err) => dispatch(SnackbarActions.displayError(err)))
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

import { LOADING_CONTACT, INITIALIZE_CONTACT, UPDATE_CONTACT_ATTRIBUTE,
VALIDATE_CONTACT, VALIDATE_CONTACT_ATTRIBUTE } from '../constants/contact-actions-constants';
import ContactsServices from '../services/contacts-services';
import SnackbarActions from './snackbar-actions';
import _ from 'lodash';
import Promise from 'bluebird';

const initializeContact = (contact) => ({
  type: INITIALIZE_CONTACT,
  contact,
});

export default {
  initializeCreateOrEditContact(params) {
    return (dispatch, getState) => {
      const contact = getState().contact.contact;
      if (params.id && params.id === contact.id) {
        return Promise.resolve();
      } else if (params.id) {
        dispatch({ type: LOADING_CONTACT });
        return ContactsServices.get(params.id)
          .then((contactDB) =>
            dispatch(initializeContact(contactDB))
          )
          .catch((err) =>
            dispatch(SnackbarActions.displayError(err))
          );
      }
      dispatch({ type: LOADING_CONTACT });
      return dispatch(initializeContact());
    }
  },
  saveContact() {
    return (dispatch, getState) => {
      dispatch({ type: VALIDATE_CONTACT });
      const errors = getState().contact.errors;
      if (_.isEmpty(errors)) {
        const contact = getState().contact.contact;
        if (contact.id) {
          return ContactsServices.update(contact)
            .then(result => result)
            .catch(err => Promise.reject(err));
        }
        return ContactsServices.create(contact)
          .then(result => result)
          .catch(err => Promise.reject(err));
      }
      return Promise.reject('Contact has errors');
    }
  },
  onContactAttributeChange(name, value) {
    return {
      type: UPDATE_CONTACT_ATTRIBUTE,
      name,
      value,
    };
  },
  onContactAttributeBlur(name, value) {
    return {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name,
      value,
    };
  },
}

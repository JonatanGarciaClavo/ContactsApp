import { LOADING_CONTACT, INITIALIZE_CONTACT, UPDATE_CONTACT_ATTRIBUTE, REQUEST_CONTACT,
  VALIDATE_CONTACT, VALIDATE_CONTACT_ATTRIBUTE, REQUEST_SAVE_CONTACT,
  } from '../constants/contact-actions-constants';
import Promise from 'bluebird';

const initializeContact = (contact) => ({
  type: INITIALIZE_CONTACT,
  contact,
});

export default {
  loadingContact() {
    return {
      type: LOADING_CONTACT,
    };
  },
  recieveContact(contact) {
    return initializeContact(contact);
  },
  initializeCreateOrEditContact(params) {
    return (dispatch, getState) => {
      const contact = getState().contact.contact;
      if (params.id && params.id === contact.id) {
        return Promise.resolve();
      } else if (params.id) {
        return dispatch({ type: REQUEST_CONTACT, id: params.id });
      }
      dispatch({ type: LOADING_CONTACT });
      return dispatch(initializeContact());
    }
  },
  saveContact() {
    return (dispatch, getState) => {
      dispatch({ type: VALIDATE_CONTACT });
      const errors = getState().contact.errors;
      const contact = getState().contact.contact;
      return dispatch({ type: REQUEST_SAVE_CONTACT, errors, contact });
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

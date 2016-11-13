import { REQUEST_CONTACT_SUCCESS, UPDATE_CONTACT_ATTRIBUTE, REQUEST_CONTACT,
  VALIDATE_CONTACT, VALIDATE_CONTACT_ATTRIBUTE, REQUEST_SAVE_CONTACT, RESET_CONTACT,
  } from '../constants/contact-actions-constants';

export default {
  initialize() {
    return {
      type: RESET_CONTACT,
    };
  },
  recieveContact(contact) {
    return {
      type: REQUEST_CONTACT_SUCCESS,
      contact,
    };
  },
  loadData(params = {}) {
    return {
      type: REQUEST_CONTACT,
      id: params.id,
    };
  },
  saveContact() {
    return {
      type: REQUEST_SAVE_CONTACT,
    };
  },
  validateContact() {
    return {
      type: VALIDATE_CONTACT,
    };
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

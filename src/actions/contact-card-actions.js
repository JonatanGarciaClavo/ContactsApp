import { RESET_CONTACT_CARD, REQUEST_CONTACT_CARD_SUCCESS, REQUEST_CONTACT_CARD,
  REQUEST_DELETE_CONTACT_CARD } from '../constants/contact-card-actions-constants';
import { TRANSTION_TO_EDIT_CONTACT } from '../constants/contact-actions-constants';

export default {
  initialize() {
    return {
      type: RESET_CONTACT_CARD,
    };
  },
  loadData(params) {
    return {
      type: REQUEST_CONTACT_CARD,
      id: params.id,
    };
  },
  recieveContactCard(contact) {
    return {
      type: REQUEST_CONTACT_CARD_SUCCESS,
      contact,
    };
  },
  deleteContact(id) {
    return {
      type: REQUEST_DELETE_CONTACT_CARD,
      id,
    };
  },
  transtionToEditContact(contact) {
    return {
      type: TRANSTION_TO_EDIT_CONTACT,
      contact,
    };
  },
}

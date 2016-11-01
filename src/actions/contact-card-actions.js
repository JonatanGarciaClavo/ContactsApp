import { LOADING_CONTACT_CARD, INITIALIZE_CONTACT_CARD, REQUEST_CONTACT_CARD,
  REQUEST_DELETE_CONTACT_CARD } from '../constants/contact-card-actions-constants';
import { INITILIZE_CONTACT_FROM_OTHER_VIEW } from '../constants/contact-actions-constants';
import Promise from 'bluebird';

export default {
  requestContactCard(params) {
    return (dispatch, getState) => {
      const contact = getState().contactCard.contact;
      if (params.id === contact.id) {
        return Promise.resolve();
      }
      return dispatch({
        type: REQUEST_CONTACT_CARD,
        id: params.id,
      });
    }
  },
  loadingContactCard() {
    return {
      type: LOADING_CONTACT_CARD,
    };
  },
  recieveContactCard(contact) {
    return {
      type: INITIALIZE_CONTACT_CARD,
      contact,
    };
  },
  deleteContact(id) {
    return {
      type: REQUEST_DELETE_CONTACT_CARD,
      id,
    };
  },
  editContact(contact) {
    return {
      type: INITILIZE_CONTACT_FROM_OTHER_VIEW,
      contact,
    };
  },
}

import { Record, Map } from 'immutable';
import { REQUEST_CONTACT_CARD, REQUEST_DELETE_CONTACT_CARD, REQUEST_CONTACT_CARD_SUCCESS,
  RESET_CONTACT_CARD } from '../constants/contact-card-actions-constants';
import { SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';

export const ContactCard = new Record({
  loading: false,
  contact: new Map(),
});

const contactCard = (state = new ContactCard(), action) => {
  switch (action.type) {
    case (REQUEST_CONTACT_CARD):
    case (REQUEST_DELETE_CONTACT_CARD):
      return state.set('loading', true);
    case (SET_ERROR_MESSAGE):
      return state.set('loading', false);
    case (REQUEST_CONTACT_CARD_SUCCESS):
      return state
        .set('contact', action.contact)
        .set('loading', false);
    case (RESET_CONTACT_CARD):
      return new ContactCard();
    default:
      return state;
  }
};

export default contactCard;

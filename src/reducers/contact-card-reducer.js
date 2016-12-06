import Immutable from 'immutable';
import { REQUEST_CONTACT_CARD, REQUEST_DELETE_CONTACT_CARD, REQUEST_CONTACT_CARD_SUCCESS,
  RESET_CONTACT_CARD } from '../constants/contact-card-actions-constants';
import { SET_ERROR_MESSAGE } from '../constants/snackbar-actions-constants';

export const initialState = new Immutable.Map({
  loading: false,
  contact: new Immutable.Map(),
});

const contactCard = (state = initialState, action) => {
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
      return initialState;
    default:
      return state;
  }
};

export default contactCard;

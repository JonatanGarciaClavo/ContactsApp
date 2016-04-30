import { LOADING_CONTACT_CARD, INITIALIZE_CONTACT_CARD }
  from '../constants/contact-card-actions-constants';

const initialState = {
  loading: false,
  contact: {},
};

const contactCard = (state = initialState, action) => {
  switch (action.type) {
    case (LOADING_CONTACT_CARD):
      return Object.assign({}, state, { loading: true });
    case (INITIALIZE_CONTACT_CARD):
      return Object.assign({}, state, { contact: action.contact, loading: false });
    default:
      return state;
  }
};

export default contactCard;

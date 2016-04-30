import { LOADING_CONTACT_CARD, INITIALIZE_CONTACT_CARD }
  from '../constants/contact-card-actions-constants';
import { INITIALIZE_CONTACT } from '../constants/contact-actions-constants';
import ContactsServices from '../services/contacts-services';
import SnackbarActions from './snackbar-actions';
import { browserHistory } from 'react-router'

export default {
  initializeContactCard(params) {
    return (dispatch, getState) => {
      const contact = getState().contactCard.contact;
      if (params.id === contact.id) {
        return Promise.resolve();
      }
      dispatch({
        type: LOADING_CONTACT_CARD,
      });
      return ContactsServices.get(params.id)
        .then((contactDB) =>
          dispatch({
            type: INITIALIZE_CONTACT_CARD,
            contact: contactDB,
          })
        )
        .catch((err) => dispatch(SnackbarActions.displayError(err)));
    }
  },
  deleteContact(id) {
    return (dispatch) =>
      ContactsServices.delete(id).then((message) => {
        browserHistory.push('/list');
        return Promise.resolve(message);
      }).catch((err) => dispatch(SnackbarActions.displayError(err)));
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
}

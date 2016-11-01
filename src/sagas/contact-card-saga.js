import { take, call, put } from 'redux-saga/effects';
import { REQUEST_CONTACT_CARD, REQUEST_DELETE_CONTACT_CARD, INITILIZE_CONTACT_CARD_FROM_OTHER_VIEW,
  } from '../constants/contact-card-actions-constants';
import ContactCardActions from '../actions/contact-card-actions';
import SnackbarActions from '../actions/snackbar-actions';
import ContactsServices from '../services/contacts-services';
import { browserHistory } from 'react-router'

export function* fetchContactCard(id) {
  try {
    yield put(ContactCardActions.loadingContactCard());
    const contact = yield call(ContactsServices.get, id)
    yield put(ContactCardActions.recieveContactCard(contact));
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestContactCard() {
  while (true) {
    const { id } = yield take(REQUEST_CONTACT_CARD);
    yield call(fetchContactCard, id);
  }
}

export function* fetchDeleteContactCard(id) {
  try {
    yield put(ContactCardActions.loadingContactCard());
    yield call(ContactsServices.delete, id)
    yield call(browserHistory.push, '/list');
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestDeleteContactCard() {
  while (true) {
    const { id } = yield take(REQUEST_DELETE_CONTACT_CARD);
    yield call(fetchDeleteContactCard, id);
  }
}

export function* initilizeContactCardFromOtherView(contact) {
  yield put(ContactCardActions.recieveContactCard(contact));
  yield call(browserHistory.push, `/card/${contact.id}`);
}


export function* requestInitilizeContactCardFromOtherView() {
  while (true) {
    const { contact } = yield take(INITILIZE_CONTACT_CARD_FROM_OTHER_VIEW);
    yield call(initilizeContactCardFromOtherView, contact);
  }
}

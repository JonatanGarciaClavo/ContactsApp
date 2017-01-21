import { take, call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router'
import Immutable from 'immutable';
import { REQUEST_CONTACT_CARD, REQUEST_DELETE_CONTACT_CARD, TRANSTION_TO_EDIT_CONTACT_CARD,
  } from '../constants/contact-card-actions-constants';
import { contactCardSelector } from './selectors';
import ContactCardActions from '../actions/contact-card-actions';
import SnackbarActions from '../actions/snackbar-actions';
import ContactsServices from '../services/contacts-services';

export function* fetchContactCard(id) {
  try {
    const { contact } = yield select(contactCardSelector);
    if (id === contact.get('id')) {
      yield put(ContactCardActions.recieveContactCard(contact));
    } else {
      const contactDB = yield call(ContactsServices.get, id)
      yield put(ContactCardActions.recieveContactCard(
        new Immutable.Map(Immutable.fromJS(contactDB)),
      ));
    }
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestContactCard() {
  while (true) {// eslint-disable-line
    const { id } = yield take(REQUEST_CONTACT_CARD);
    yield call(fetchContactCard, id);
  }
}

export function* fetchDeleteContactCard(id) {
  try {
    yield call(ContactsServices.delete, id)
    yield call(browserHistory.push, '/list');
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestDeleteContactCard() {
  while (true) {// eslint-disable-line
    const { id } = yield take(REQUEST_DELETE_CONTACT_CARD);
    yield call(fetchDeleteContactCard, id);
  }
}


export function* requestTransitionToEditContactCard() {
  while (true) {// eslint-disable-line
    const { contact } = yield take(TRANSTION_TO_EDIT_CONTACT_CARD);
    yield call(browserHistory.push, `/card/${contact.get('id')}`);
  }
}

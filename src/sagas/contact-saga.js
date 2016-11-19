import { take, call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { REQUEST_CONTACT, REQUEST_SAVE_CONTACT, TRANSTION_TO_EDIT_CONTACT }
  from '../constants/contact-actions-constants';
import { contactSelector, contactListSelector } from './selectors';
import ContactActions from '../actions/contact-actions';
import SnackbarActions from '../actions/snackbar-actions';
import ContactsServices from '../services/contacts-services';

export function* fetchContact(id) {
  try {
    const { contacts } = yield select(contactListSelector);
    const contactsFilteredById = contacts.filter((c) => c.id === id)
    if (contactsFilteredById && contactsFilteredById.length > 0) {
      yield put(ContactActions.recieveContact(contactsFilteredById[0]));
    } else if (id) {
      const contactDB = yield call(ContactsServices.get, id)
      yield put(ContactActions.recieveContact(contactDB));
    } else {
      yield put(ContactActions.recieveContact());
    }
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestContact() {
  while (true) {// eslint-disable-line
    const { id } = yield take(REQUEST_CONTACT);
    yield call(fetchContact, id);
  }
}

export function* saveContact() {
  try {
    yield put(ContactActions.validateContact());
    const { errors, contact } = yield select(contactSelector);
    if (_.isEmpty(errors)) {
      const save = contact.id ? 'update' : 'create';
      yield call(ContactsServices[save], contact)
      yield call(browserHistory.push, '/list');
    } else {
      yield put(SnackbarActions.displayError('Contact has errors'));
    }
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestSaveContact() {
  while (true) {// eslint-disable-line
    yield take(REQUEST_SAVE_CONTACT);
    yield call(saveContact);
  }
}

export function* requestTransitionToEditContact() {
  while (true) {// eslint-disable-line
    const { contact } = yield take(TRANSTION_TO_EDIT_CONTACT);
    yield call(browserHistory.push, `/edit/${contact.id}`);
  }
}

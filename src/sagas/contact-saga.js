import { take, call, put } from 'redux-saga/effects';
import { REQUEST_CONTACT, REQUEST_SAVE_CONTACT, INITILIZE_CONTACT_FROM_OTHER_VIEW }
  from '../constants/contact-actions-constants';
import ContactActions from '../actions/contact-actions';
import SnackbarActions from '../actions/snackbar-actions';
import ContactsServices from '../services/contacts-services';
import { browserHistory } from 'react-router';
import _ from 'lodash';

export function* fetchContact(id) {
  try {
    yield put(ContactActions.loadingContact());
    const contact = yield call(ContactsServices.get, id)
    yield put(ContactActions.recieveContact(contact));
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestContact() {
  while (true) {
    const { id } = yield take(REQUEST_CONTACT);
    yield call(fetchContact, id);
  }
}

export function* saveContact(errors, contact) {
  try {
    if (_.isEmpty(errors)) {
      const save = contact.id ? 'update' : 'create';
      yield put(ContactActions.loadingContact());
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
  while (true) {
    const { errors, contact } = yield take(REQUEST_SAVE_CONTACT);
    yield call(saveContact, errors, contact);
  }
}

export function* initilizeContactFromOtherView(contact) {
  yield put(ContactActions.recieveContact(contact));
  yield call(browserHistory.push, `/edit/${contact.id}`);
}


export function* requestInitilizeContactFromOtherView() {
  while (true) {
    const { contact } = yield take(INITILIZE_CONTACT_FROM_OTHER_VIEW);
    yield call(initilizeContactFromOtherView, contact);
  }
}

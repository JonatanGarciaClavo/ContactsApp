import { take, call, put } from 'redux-saga/effects';
import { REQUEST_CONTACT_LIST, DELETE_CONTACT }
  from '../constants/contact-list-actions-constants';
import ContactListActions from '../actions/contact-list-actions';
import SnackbarActions from '../actions/snackbar-actions';
import ContactsServices from '../services/contacts-services';

export function* fetchContacts() {
  try {
    yield put(ContactListActions.loadingContactList());
    const contacts = yield call(ContactsServices.list)
    yield put(ContactListActions.recieveContactList(contacts));
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestContactList() {
  while (true) {
    yield take(REQUEST_CONTACT_LIST);
    yield call(fetchContacts);
  }
}

export function* fetchDeleteContact(id) {
  try {
    yield put(ContactListActions.loadingContactList());
    yield call(ContactsServices.delete, id)
    yield call(fetchContacts);
  } catch (err) {
    yield put(SnackbarActions.displayError(err));
  }
}

export function* requestDeleteContact() {
  while (true) {
    const { id } = yield take(DELETE_CONTACT);
    yield call(fetchDeleteContact, id);
  }
}

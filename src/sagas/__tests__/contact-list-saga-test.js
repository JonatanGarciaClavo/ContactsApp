import sagaHelper from 'redux-saga-testing';
import { take, call, put } from 'redux-saga/effects';
import { REQUEST_CONTACT_LIST, DELETE_CONTACT,
  } from '../../constants/contact-list-actions-constants';
import { requestContactList, fetchContacts, requestDeleteContact, fetchDeleteContact,
  } from '../contact-list-saga';
import ContactListActions from '../../actions/contact-list-actions';
import SnackbarActions from '../../actions/snackbar-actions';
import ContactsServices from '../../services/contacts-services';
import { id, contacts } from '../../../config/jest/mock-data';

const serverError = new Error('Error from server');

describe('Testing requestContactList', () => {
  const it = sagaHelper(requestContactList());
  it('intercept request contact', result => {
    expect(result).toEqual(take(REQUEST_CONTACT_LIST));
    return { id };
  });
  it('call fetchContact', result => {
    expect(result).toEqual(call(fetchContacts));
  });
});

describe('Testing fetchContacts', () => {
  describe('Success flow', () => {
    const it = sagaHelper(fetchContacts());
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.list));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return contacts;
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(put(ContactListActions.recieveContactList(contacts)));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error flow', () => {
    const it = sagaHelper(fetchContacts(id));
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.list));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return serverError;
    });
    it('and then trigger an action error', result => {
      expect(result).toEqual(put(SnackbarActions.displayError(serverError)));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
});

describe('Testing requestDeleteContact', () => {
  const it = sagaHelper(requestDeleteContact());
  it('intercept request contact', result => {
    expect(result).toEqual(take(DELETE_CONTACT));
    return { id };
  });
  it('call fetchContact', result => {
    expect(result).toEqual(call(fetchDeleteContact, id));
  });
});

describe('Testing fetchDeleteContact', () => {
  describe('Success flow', () => {
    const it = sagaHelper(fetchDeleteContact(id));
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.delete, id));
    });
    it('and then trigger update of contact list', result => {
      expect(result).toEqual(call(fetchContacts));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error flow', () => {
    const it = sagaHelper(fetchDeleteContact(id));
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.delete, id));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return serverError;
    });
    it('and then trigger an action error', result => {
      expect(result).toEqual(put(SnackbarActions.displayError(serverError)));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
});
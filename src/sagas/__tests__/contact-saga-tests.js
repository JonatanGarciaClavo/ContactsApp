import sagaHelper from 'redux-saga-testing';
import { call, put } from 'redux-saga/effects';
import { saveContact, fetchContact } from '../contact-saga';
import ContactActions from '../../actions/contact-actions';
import SnackbarActions from '../../actions/snackbar-actions';
import ContactsServices from '../../services/contacts-services';
import { browserHistory } from 'react-router';
import _ from 'lodash';

const id = '-1';
const contact = {
  id,
  email: 'test@test.es',
  imgUrl: '',
  name: 'test',
  phoneNumber: '123123123',
};

const serverError = new Error('Error from server');

describe('Testing requesContact', () => {
  describe('Success flow', () => {
    const it = sagaHelper(fetchContact(id));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactActions.loadingContact()));
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.get, id));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return contact;
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(put(ContactActions.recieveContact(contact)));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error flow', () => {
    const it = sagaHelper(fetchContact(id));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactActions.loadingContact()));
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.get, id));

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


describe('Testing requesContact', () => {
  describe('Success update flow', () => {
    const it = sagaHelper(saveContact({}, contact));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactActions.loadingContact()));
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.update, contact));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return contact;
    });
    it('redirect to /list', result => {
      expect(result).toEqual(call(browserHistory.push, '/list'));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Success create flow', () => {
    const createContact = _.omit(contact, 'id');
    const it = sagaHelper(saveContact({}, createContact));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactActions.loadingContact()));
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.create, createContact));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return contact;
    });
    it('redirect to /list', result => {
      expect(result).toEqual(call(browserHistory.push, '/list'));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error not all values are valid flow', () => {
    const it = sagaHelper(saveContact({ name: 'not valid' }, contact));
    it('and then trigger an action error', result => {
      expect(result).toEqual(put(SnackbarActions.displayError('Contact has errors')));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error server flow', () => {
    const it = sagaHelper(saveContact({}, contact));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactActions.loadingContact()));
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.update, contact));

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
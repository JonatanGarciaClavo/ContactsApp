import sagaHelper from 'redux-saga-testing';
import Immutable from 'immutable';
import { take, call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import { REQUEST_CONTACT, REQUEST_SAVE_CONTACT, TRANSTION_TO_EDIT_CONTACT }
  from '../../constants/contact-actions-constants';
import { requestSaveContact, saveContact, requestContact, fetchContact,
  requestTransitionToEditContact } from '../contact-saga';
import { contactSelector, contactListSelector } from '../selectors';
import ContactActions from '../../actions/contact-actions';
import SnackbarActions from '../../actions/snackbar-actions';
import ContactsServices from '../../services/contacts-services';
import { id, contact, contacts } from '../../../config/jest/mock-data';

const serverError = new Error('Error from server');

describe('Testing requestContact', () => {
  const it = sagaHelper(requestContact());
  it('intercept request contact', result => {
    expect(result).toEqual(take(REQUEST_CONTACT));
    return { id };
  });
  it('call fetchContact', result => {
    expect(result).toEqual(call(fetchContact, id));
  });
});

describe('Testing fetchContact', () => {
  describe('Success flow contact exists in state', () => {
    const it = sagaHelper(fetchContact(id));
    it('should select contacts from contactList reducer', result => {
      expect(result).toEqual(select(contactListSelector));
      return {
        contacts: new Immutable.List(Immutable.fromJS(contacts)),
      };
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(put(ContactActions.recieveContact(
        new Immutable.Map(Immutable.fromJS(contact))
      )));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Success flow request contact to service ', () => {
    const it = sagaHelper(fetchContact(id));
    it('should select contacts from contactList reducer', result => {
      expect(result).toEqual(select(contactListSelector));
      return {
        contacts: new Immutable.List(),
      };
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.get, id));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return contact;
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(put(ContactActions.recieveContact(
        new Immutable.Map(Immutable.fromJS(contact))
      )));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Success flow create contact ', () => {
    const it = sagaHelper(fetchContact());
    it('should select contacts from contactList reducer', result => {
      expect(result).toEqual(select(contactListSelector));
      return {
        contacts: new Immutable.List(Immutable.fromJS(contacts)),
      };
    });
    it('and then trigger an action with the initialState contact', result => {
      expect(result).toEqual(put(ContactActions.recieveContact()));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error flow request contact to service', () => {
    const it = sagaHelper(fetchContact(id));
    it('should select contacts from contactList reducer', result => {
      expect(result).toEqual(select(contactListSelector));
      return {
        contacts: new Immutable.List(),
      };
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

describe('Testing requestSaveContact', () => {
  const it = sagaHelper(requestSaveContact());
  it('intercept request save contact', result => {
    expect(result).toEqual(take(REQUEST_SAVE_CONTACT));
  });
  it('call saveContact', result => {
    expect(result).toEqual(call(saveContact));
  });
});

describe('Testing saveContact', () => {
  describe('Success update flow', () => {
    const it = sagaHelper(saveContact());
    it('should trigger and validate action', result => {
      expect(result).toEqual(put(ContactActions.validateContact()));
    });
    it('should select errors and contact to be saved', result => {
      expect(result).toEqual(select(contactSelector));
      return {
        errors: new Immutable.Map(),
        contact: new Immutable.Map(Immutable.fromJS(contact)),
      };
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
    const it = sagaHelper(saveContact());
    it('should trigger and validate action', result => {
      expect(result).toEqual(put(ContactActions.validateContact()));
    });
    it('should select errors and contact to be saved', result => {
      expect(result).toEqual(select(contactSelector));
      return {
        errors: new Immutable.Map(),
        contact: new Immutable.Map(Immutable.fromJS(createContact)),
      };
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
    const it = sagaHelper(saveContact());
    it('should trigger and validate action', result => {
      expect(result).toEqual(put(ContactActions.validateContact()));
    });
    it('should select errors and contact to be saved', result => {
      expect(result).toEqual(select(contactSelector));
      return {
        errors: new Immutable.Map({ name: 'not valid' }),
        contact: new Immutable.Map(Immutable.fromJS(contact)),
      };
    });
    it('and then trigger an action error', result => {
      expect(result).toEqual(put(SnackbarActions.displayError('Contact has errors')));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error server flow', () => {
    const it = sagaHelper(saveContact());
    it('should trigger and validate action', result => {
      expect(result).toEqual(put(ContactActions.validateContact()));
    });
    it('should select errors and contact to be saved', result => {
      expect(result).toEqual(select(contactSelector));
      return {
        errors: new Immutable.Map(),
        contact: new Immutable.Map(Immutable.fromJS(contact)),
      };
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
describe('Testing requestTransitionToEditContact', () => {
  const it = sagaHelper(requestTransitionToEditContact());
  it('intercept request contact', result => {
    expect(result).toEqual(take(TRANSTION_TO_EDIT_CONTACT));
    return { contact: new Immutable.Map(Immutable.fromJS(contact)) };
  });
  it('call browserHistory push to redirect to edit user pathname', result => {
    expect(result).toEqual(call(browserHistory.push, `/edit/${contact.id}`));
  });
});

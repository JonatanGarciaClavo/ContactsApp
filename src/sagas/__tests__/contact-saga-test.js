import sagaHelper from 'redux-saga-testing';
import { take, call, put } from 'redux-saga/effects';
import { REQUEST_CONTACT, REQUEST_SAVE_CONTACT, INITILIZE_CONTACT_FROM_OTHER_VIEW }
  from '../../constants/contact-actions-constants';
import { requestSaveContact, saveContact, requestContact, fetchContact,
  requestInitilizeContactFromOtherView, initilizeContactFromOtherView,
  } from '../contact-saga';
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

describe('Testing requestSaveContact', () => {
  const it = sagaHelper(requestSaveContact());
  it('intercept request save contact', result => {
    expect(result).toEqual(take(REQUEST_SAVE_CONTACT));
    return { errors: {}, contact };
  });
  it('call saveContact', result => {
    expect(result).toEqual(call(saveContact, {}, contact));
  });
});

describe('Testing saveContact', () => {
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
describe('Testing requestInitilizeContactFromOtherView', () => {
  const it = sagaHelper(requestInitilizeContactFromOtherView());
  it('intercept request contact', result => {
    expect(result).toEqual(take(INITILIZE_CONTACT_FROM_OTHER_VIEW));
    return { contact };
  });
  it('call initilizeContactFromOtherView', result => {
    expect(result).toEqual(call(initilizeContactFromOtherView, contact));
  });
});

describe('Testing initilizeContactFromOtherView', () => {
  const it = sagaHelper(initilizeContactFromOtherView(contact));
  it('initialize contact info before redirect', result => {
    expect(result).toEqual(put(ContactActions.recieveContact(contact)));
  });
  it('call browserHistory push to redirect to edit user pathname', result => {
    expect(result).toEqual(call(browserHistory.push, `/edit/${contact.id}`));
  });
});


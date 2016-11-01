import sagaHelper from 'redux-saga-testing';
import { take, call, put } from 'redux-saga/effects';
import { REQUEST_CONTACT_CARD, REQUEST_DELETE_CONTACT_CARD, INITILIZE_CONTACT_CARD_FROM_OTHER_VIEW,
  } from '../../constants/contact-card-actions-constants';
import { requestContactCard, fetchContactCard, requestDeleteContactCard, fetchDeleteContactCard,
  requestInitilizeContactCardFromOtherView, initilizeContactCardFromOtherView,
  } from '../contact-card-saga';
import ContactCardActions from '../../actions/contact-card-actions';
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

describe('Testing requestContactCard', () => {
  const it = sagaHelper(requestContactCard());
  it('intercept request contact', result => {
    expect(result).toEqual(take(REQUEST_CONTACT_CARD));
    return { id };
  });
  it('call fetchContact', result => {
    expect(result).toEqual(call(fetchContactCard, id));
  });
});

describe('Testing fetchContactCard', () => {
  describe('Success flow', () => {
    const it = sagaHelper(fetchContactCard(id));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactCardActions.loadingContactCard()));
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.get, id));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return contact;
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(put(ContactCardActions.recieveContactCard(contact)));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error flow', () => {
    const it = sagaHelper(fetchContactCard(id));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactCardActions.loadingContactCard()));
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

describe('Testing requestDeleteContactCard', () => {
  const it = sagaHelper(requestDeleteContactCard());
  it('intercept request contact', result => {
    expect(result).toEqual(take(REQUEST_DELETE_CONTACT_CARD));
    return { id };
  });
  it('call fetchContact', result => {
    expect(result).toEqual(call(fetchDeleteContactCard, id));
  });
});

describe('Testing fetchDeleteContactCard', () => {
  describe('Success flow', () => {
    const it = sagaHelper(fetchDeleteContactCard(id));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactCardActions.loadingContactCard()));
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.delete, id));
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(call(browserHistory.push, '/list'));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error flow', () => {
    const it = sagaHelper(fetchDeleteContactCard(id));
    it('should trigger and loading action', result => {
      expect(result).toEqual(put(ContactCardActions.loadingContactCard()));
    });
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

describe('Testing requestInitilizeContactCardFromOtherView', () => {
  const it = sagaHelper(requestInitilizeContactCardFromOtherView());
  it('intercept request contact card', result => {
    expect(result).toEqual(take(INITILIZE_CONTACT_CARD_FROM_OTHER_VIEW));
    return { contact };
  });
  it('call initilizeContactCardFromOtherView', result => {
    expect(result).toEqual(call(initilizeContactCardFromOtherView, contact));
  });
});

describe('Testing initilizeContactCardFromOtherView', () => {
  const it = sagaHelper(initilizeContactCardFromOtherView(contact));
  it('initialize contact card info before redirect', result => {
    expect(result).toEqual(put(ContactCardActions.recieveContactCard(contact)));
  });
  it('call browserHistory push to redirect to edit user pathname', result => {
    expect(result).toEqual(call(browserHistory.push, `/card/${contact.id}`));
  });
});

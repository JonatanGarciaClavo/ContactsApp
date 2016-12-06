import sagaHelper from 'redux-saga-testing';
import Immutable from 'immutable';
import { take, call, put, select } from 'redux-saga/effects';
import { browserHistory } from 'react-router';
import { REQUEST_CONTACT_CARD, REQUEST_DELETE_CONTACT_CARD, TRANSTION_TO_EDIT_CONTACT_CARD,
  } from '../../constants/contact-card-actions-constants';
import { requestContactCard, fetchContactCard, requestDeleteContactCard, fetchDeleteContactCard,
  requestTransitionToEditContactCard } from '../contact-card-saga';
import { contactCardSelector } from '../selectors';
import { initialState } from '../../reducers/contact-card-reducer';
import ContactCardActions from '../../actions/contact-card-actions';
import SnackbarActions from '../../actions/snackbar-actions';
import ContactsServices from '../../services/contacts-services';
import { id, contact } from '../../../config/jest/mock-data';

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
  describe('Success flow contact stored', () => {
    const it = sagaHelper(fetchContactCard(id));
    it('should select contactCard', result => {
      expect(result).toEqual(select(contactCardSelector));
      return {
        contact: new Immutable.Map(Immutable.fromJS(contact)),
      };
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(put(ContactCardActions.recieveContactCard(
        new Immutable.Map(Immutable.fromJS(contact))
      )));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Success flow request contact to service', () => {
    const it = sagaHelper(fetchContactCard(id));
    it('should select contactCard', result => {
      expect(result).toEqual(select(contactCardSelector));
      return {
        contact: initialState,
      };
    });
    it('should have called the mock API first, which we are going to specify the results of', result => {
      expect(result).toEqual(call(ContactsServices.get, id));

      // Here we specify what the API should have returned.
      // Again, the API is not called so we have to give its expected response.
      return contact;
    });
    it('and then trigger an action with the transformed data we got from the API', result => {
      expect(result).toEqual(put(ContactCardActions.recieveContactCard(
        new Immutable.Map(Immutable.fromJS(contact))
      )));
    });
    it('and then nothing', result => {
      expect(result).toBeUndefined();
    });
  });
  describe('Error flow', () => {
    const it = sagaHelper(fetchContactCard(id));
    it('should select contactCard', result => {
      expect(result).toEqual(select(contactCardSelector));
      return {
        contact: initialState,
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

describe('Testing requestTransitionToEditContactCard', () => {
  const it = sagaHelper(requestTransitionToEditContactCard());
  it('intercept request contact card', result => {
    expect(result).toEqual(take(TRANSTION_TO_EDIT_CONTACT_CARD));
    return { contact: new Immutable.Map(Immutable.fromJS(contact)) };
  });
  it('call browserHistory push to redirect to edit user pathname', result => {
    expect(result).toEqual(call(browserHistory.push, `/card/${contact.id}`));
  });
});


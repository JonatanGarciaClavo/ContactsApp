import Immutable from 'immutable';
import { initialState, default as contact } from '../contact-reducer';
import { REQUEST_CONTACT, REQUEST_SAVE_CONTACT, REQUEST_CONTACT_SUCCESS, UPDATE_CONTACT_ATTRIBUTE,
  VALIDATE_CONTACT, VALIDATE_CONTACT_ATTRIBUTE, RESET_CONTACT,
  } from '../../constants/contact-actions-constants';
import { SET_ERROR_MESSAGE } from '../../constants/snackbar-actions-constants';
import { contact as mockContact } from '../../../config/jest/mock-data';

const testContact = new Immutable.Map(Immutable.fromJS(mockContact));

describe('Test contact reducer', () => {
  it('returns the initialState state on an undefined state', () => {
    expect(contact(undefined, { type: '_NULL' })).toMatchSnapshot();
  });
  it('returns the same state on an unhandled action', () => {
    expect(contact(initialState, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles REQUEST_CONTACT action', () => {
    expect(contact(initialState, { type: REQUEST_CONTACT })).toMatchSnapshot();
  });
  it('handles REQUEST_SAVE_CONTACT action', () => {
    expect(contact(initialState, { type: REQUEST_SAVE_CONTACT })).toMatchSnapshot();
  });
  it('handles SET_ERROR_MESSAGE action', () => {
    expect(contact(initialState, { type: SET_ERROR_MESSAGE })).toMatchSnapshot();
  });

  it('handles REQUEST_CONTACT_SUCCESS action', () => {
    expect(contact(initialState, { type: REQUEST_CONTACT_SUCCESS, contact: testContact }))
      .toMatchSnapshot();
  });

  it('handles UPDATE_CONTACT_ATTRIBUTE action', () => {
    const newState = contact(initialState, { type: REQUEST_CONTACT_SUCCESS, contact: testContact });
    expect(contact(newState, {
      type: UPDATE_CONTACT_ATTRIBUTE,
      name: 'email',
      value: 'test2@test.com',
    })).toMatchSnapshot();
    expect(contact(newState, {
      type: UPDATE_CONTACT_ATTRIBUTE,
      name: 'imgUrl',
      value: 'http://www.test.image.com/2.png',
    })).toMatchSnapshot();
    expect(contact(newState, {
      type: UPDATE_CONTACT_ATTRIBUTE,
      name: 'name',
      value: 'Tester pro',
    })).toMatchSnapshot();
    expect(contact(newState, {
      type: UPDATE_CONTACT_ATTRIBUTE,
      name: 'phoneNumber',
      value: '777777777',
    })).toMatchSnapshot();
  });

  it('handles VALIDATE_CONTACT_ATTRIBUTE email action', () => {
    expect(contact(initialState, {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name: 'email',
      value: 'test@test.com',
    })).toMatchSnapshot();
    expect(contact(initialState, {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name: 'email',
      value: '',
    })).toMatchSnapshot();
    expect(contact(initialState, {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name: 'email',
      value: 'test@test',
    })).toMatchSnapshot();
  });

  it('handles VALIDATE_CONTACT_ATTRIBUTE imgUrl action', () => {
    expect(contact(initialState, {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name: 'imgUrl',
      value: 'http://www.test.image.com',
    })).toMatchSnapshot();
    expect(contact(initialState, {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name: 'imgUrl',
      value: 'invalidURL',
    })).toMatchSnapshot();
  });

  it('handles VALIDATE_CONTACT_ATTRIBUTE name action', () => {
    expect(contact(initialState, {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name: 'name',
      value: 'Tester',
    })).toMatchSnapshot();
    expect(contact(initialState, {
      type: VALIDATE_CONTACT_ATTRIBUTE,
      name: 'name',
      value: '',
    })).toMatchSnapshot();
  });

  it('handles VALIDATE_CONTACT success action', () => {
    const newState = contact(initialState, { type: REQUEST_CONTACT_SUCCESS, contact: testContact });
    expect(contact(newState, { type: VALIDATE_CONTACT })).toMatchSnapshot();
  });

  it('handles RESET_CONTACT action', () => {
    const newState = contact(initialState, { type: REQUEST_CONTACT_SUCCESS, contact: testContact });
    expect(contact(newState, { type: RESET_CONTACT }))
      .toMatchSnapshot();
  });
});

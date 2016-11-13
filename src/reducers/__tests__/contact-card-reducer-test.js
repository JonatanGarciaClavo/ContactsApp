import contactCard from '../contact-card-reducer';
import { initialState } from '../contact-reducer';
import { REQUEST_CONTACT_CARD, REQUEST_DELETE_CONTACT_CARD, REQUEST_CONTACT_CARD_SUCCESS,
  RESET_CONTACT_CARD } from '../../constants/contact-card-actions-constants';
import { SET_ERROR_MESSAGE } from '../../constants/snackbar-actions-constants';

const testContact = {
  id: '-1',
  email: 'test@test.com',
  imgUrl: 'http://www.test.image.com',
  name: 'Tester',
  phoneNumber: '666666666',
};

describe('Test contact card reducer', () => {
  it('returns the initialState state on an undefined state', () => {
    expect(contactCard(undefined, { type: '_NULL' })).toMatchSnapshot();
  });
  it('returns the same state on an unhandled action', () => {
    expect(contactCard(initialState, { type: '_NULL' })).toMatchSnapshot();
  });

  it('handles REQUEST_CONTACT_CARD action', () => {
    expect(contactCard(initialState, { type: REQUEST_CONTACT_CARD })).toMatchSnapshot();
  });
  it('handles REQUEST_DELETE_CONTACT_CARD action', () => {
    expect(contactCard(initialState, { type: REQUEST_DELETE_CONTACT_CARD })).toMatchSnapshot();
  });
  it('handles SET_ERROR_MESSAGE action', () => {
    expect(contactCard(initialState, { type: SET_ERROR_MESSAGE })).toMatchSnapshot();
  });

  it('handles REQUEST_CONTACT_CARD_SUCCESS action', () => {
    expect(contactCard(initialState, { type: REQUEST_CONTACT_CARD_SUCCESS, contact: testContact }))
      .toMatchSnapshot();
  });
  it('handles RESET_CONTACT_CARD action', () => {
    expect(contactCard(initialState, { type: RESET_CONTACT_CARD, contact: testContact }))
      .toMatchSnapshot();
  });
});

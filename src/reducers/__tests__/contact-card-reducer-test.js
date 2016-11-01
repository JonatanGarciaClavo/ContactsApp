import contactCard from '../contact-card-reducer';
import { initialState } from '../contact-reducer';
import { LOADING_CONTACT_CARD, INITIALIZE_CONTACT_CARD }
  from '../../constants/contact-card-actions-constants';

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

  it('handles LOADING_CONTACT action', () => {
    expect(contactCard(initialState, { type: LOADING_CONTACT_CARD })).toMatchSnapshot();
  });

  it('handles INITIALIZE_CONTACT action', () => {
    expect(contactCard(initialState, { type: INITIALIZE_CONTACT_CARD, contact: testContact }))
      .toMatchSnapshot();
  });
});

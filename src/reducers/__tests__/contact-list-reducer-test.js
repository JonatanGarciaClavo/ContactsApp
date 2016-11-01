import contactList from '../contact-list-reducer';
import { initialState } from '../contact-list-reducer';
import { LOADING_CONTACT_LIST, INITIALIZE_CONTACT_LIST, CHANGE_LIST_MODE,
   } from '../../constants/contact-list-actions-constants';
import { CARD_MODE } from '../../constants/contact-list-mode-constants';

const contacts = [
  {
    id: '-1',
    email: 'test@test.com',
    imgUrl: 'http://www.test.image.com',
    name: 'Tester',
    phoneNumber: '666666666',
  },
  {
    id: '-2',
    email: 'test2@test.com',
    imgUrl: 'http://www.test2.image.com',
    name: 'Tester2',
    phoneNumber: '766666666',
  },
];

describe('Test contact list reducer', () => {
  it('returns the initialState state on an undefined state', () => {
    expect(contactList(undefined, { type: '_NULL' })).toMatchSnapshot();
  });
  it('returns the same state on an unhandled action', () => {
    expect(contactList(initialState, { type: '_NULL' })).toMatchSnapshot();
  });
  it('handles LOADING_CONTACT_LIST action', () => {
    expect(contactList(initialState, { type: LOADING_CONTACT_LIST })).toMatchSnapshot();
  });
  it('handles INITIALIZE_CONTACT_LIST action', () => {
    expect(contactList(initialState, { type: INITIALIZE_CONTACT_LIST, contacts }))
      .toMatchSnapshot();
  });
  it('handles CHANGE_LIST_MODE action', () => {
    expect(contactList(initialState, { type: CHANGE_LIST_MODE, mode: CARD_MODE }))
      .toMatchSnapshot();
  });
  it('handles CHANGE_LIST_MODE without send new mode action', () => {
    expect(contactList(initialState, { type: CHANGE_LIST_MODE }))
      .toMatchSnapshot();
  });
});

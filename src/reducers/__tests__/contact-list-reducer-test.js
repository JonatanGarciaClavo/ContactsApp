import contactList from '../contact-list-reducer';
import { initialState } from '../contact-list-reducer';
import { REQUEST_CONTACT_LIST, REQUEST_CONTACT_LIST_SUCCESS, CHANGE_LIST_MODE, RESET_CONTACT_LIST,
  } from '../../constants/contact-list-actions-constants';
import { SET_ERROR_MESSAGE } from '../../constants/snackbar-actions-constants';
import { CARD_MODE, LIST_MODE } from '../../constants/contact-list-mode-constants';

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
  it('handles REQUEST_CONTACT_LIST action', () => {
    expect(contactList(initialState, { type: REQUEST_CONTACT_LIST })).toMatchSnapshot();
  });
  it('handles REQUEST_CONTACT_LIST_SUCCESS action', () => {
    expect(contactList(initialState, { type: REQUEST_CONTACT_LIST_SUCCESS, contacts }))
      .toMatchSnapshot();
  });
  it('handles SET_ERROR_MESSAGE action', () => {
    expect(contactList(initialState, { type: SET_ERROR_MESSAGE }))
      .toMatchSnapshot();
  });
  it('handles CHANGE_LIST_MODE sending same mode as it is stored', () => {
    expect(contactList(initialState, { type: CHANGE_LIST_MODE, mode: LIST_MODE }))
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
  it('handles RESET_CONTACT_LIST action', () => {
    expect(contactList(initialState, { type: RESET_CONTACT_LIST }))
      .toMatchSnapshot();
  });
});

import contact from '../contact-reducer';
import { initialState } from '../contact-reducer';
import { LOADING_CONTACT, INITIALIZE_CONTACT, UPDATE_CONTACT_ATTRIBUTE,
VALIDATE_CONTACT, VALIDATE_CONTACT_ATTRIBUTE } from '../../constants/contact-actions-constants';

const testContact = {
  email: 'test@test.com',
  imgUrl: 'http://www.test.image.com',
  name: 'Tester',
  phoneNumber: '666666666',
};

it('returns the same state on an unhandled action', () => {
  expect(contact(initialState, { type: '_NULL' })).toMatchSnapshot();
});

it('handles LOADING_CONTACT action', () => {
  expect(contact(initialState, { type: LOADING_CONTACT })).toMatchSnapshot();
});

it('handles INITIALIZE_CONTACT action', () => {
  expect(contact(initialState, { type: INITIALIZE_CONTACT, contact: testContact }))
    .toMatchSnapshot();
});

it('handles UPDATE_CONTACT_ATTRIBUTE action', () => {
  const newState = contact(initialState, { type: INITIALIZE_CONTACT, contact: testContact });
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
  const newState = contact(initialState, { type: INITIALIZE_CONTACT, contact: testContact });
  expect(contact(initialState, { type: VALIDATE_CONTACT })).toMatchSnapshot();
});

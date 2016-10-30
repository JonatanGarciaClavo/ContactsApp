import mockStore from 'redux-mock-store';
import { saveContact, onContactAttributeChange, onContactAttributeBlur, loadingContact,
  recieveContact, initializeCreateOrEditContact } from '../contact-actions';
import { initialState } from '../../reducers/contact-reducer';

const store = mockStore({ contact: initialState });

beforeEach(() => {
  store.clearActions();
});

it('should handle onContactAttributeChange action', () => {
  store.dispatch(onContactAttributeChange('email', 'new@email.com'));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle onContactAttributeBlur action', () => {
  store.dispatch(onContactAttributeBlur('email', 'new@email.com'));
  expect(store.getActions()).toMatchSnapshot();
});

it('should handle saveContact with errors action', () => {
  store.dispatch(saveContact());
  expect(store.getActions()).toMatchSnapshot();
});

it('should handle loadingContact action', () => {
  store.dispatch(loadingContact())
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle recieveContact action', () => {
  store.dispatch(recieveContact({
    email: 'test@test.es',
    imgUrl: '',
    name: 'test',
    phoneNumber: '123123123',
  }));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle initializeCreateOrEditContact action', () => {
  store.dispatch(initializeCreateOrEditContact({}));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle initializeCreateOrEditContact action', () => {
  store.dispatch(initializeCreateOrEditContact({ id: '1' }));
  expect(store.getActions()).toMatchSnapshot();
});

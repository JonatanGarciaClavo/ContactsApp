import mockStore from 'redux-mock-store';
import { saveContact, onContactAttributeChange, onContactAttributeBlur, loadingContact,
  recieveContact, initializeCreateOrEditContact } from '../contact-actions';
import { initialState } from '../../reducers/contact-reducer';

const store = mockStore({ contact: initialState });

describe('Test contact actions', () => {
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
  it('should handle initializeCreateOrEditContact action with empty params', () => {
    store.dispatch(initializeCreateOrEditContact({}));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle initializeCreateOrEditContact action with id params', () => {
    store.dispatch(initializeCreateOrEditContact({ id: '1' }));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle initializeCreateOrEditContact action with id params already in store', () => {
    const prefilledStore = mockStore({ contact: { ...initialState, contact: { id: '-1' } } });
    prefilledStore.dispatch(initializeCreateOrEditContact({ id: '-1' }));
    expect(prefilledStore.getActions()).toMatchSnapshot();
  });
});

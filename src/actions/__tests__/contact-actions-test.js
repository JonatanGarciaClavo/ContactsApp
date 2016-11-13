import mockStore from 'redux-mock-store';
import { saveContact, onContactAttributeChange, onContactAttributeBlur,
  recieveContact, loadData, validateContact, initialize } from '../contact-actions';
import { initialState } from '../../reducers/contact-reducer';

const store = mockStore({ contact: initialState });

describe('Test contact actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  it('should handle initialize action', () => {
    store.dispatch(initialize());
    expect(store.getActions()).toMatchSnapshot();
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

  it('should handle validateContact action', () => {
    store.dispatch(validateContact())
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
  it('should handle loadData action with empty params', () => {
    store.dispatch(loadData());
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle loadData action with id params', () => {
    store.dispatch(loadData({ id: '1' }));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle loadData action with id params already in store', () => {
    const prefilledStore = mockStore({ contact: { ...initialState, contact: { id: '-1' } } });
    prefilledStore.dispatch(loadData({ id: '-1' }));
    expect(prefilledStore.getActions()).toMatchSnapshot();
  });
});

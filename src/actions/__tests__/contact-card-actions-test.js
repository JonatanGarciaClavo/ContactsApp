import mockStore from 'redux-mock-store';
import { loadData, initialize, recieveContactCard, deleteContact, transtionToEditContact,
  } from '../contact-card-actions';
import { initialState } from '../../reducers/contact-card-reducer';

const store = mockStore({ contactCard: initialState });

describe('Test contact card actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('should handle loadData action when contanct it is not stored', () => {
    store.dispatch(loadData({ id: -1 }));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle loadData action when contanct it is stored', () => {
    const prefilledStore = mockStore({ contactCard: { ...initialState, contact: { id: '-1' } } });
    prefilledStore.dispatch(loadData({ id: '-1' }));
    expect(prefilledStore.getActions()).toMatchSnapshot();
  });
  it('should handle initialize action', () => {
    store.dispatch(initialize());
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle recieveContactCard action', () => {
    store.dispatch(recieveContactCard({
      email: 'react@facebook.com',
      id: '-KG83Vl4C0o_mOYhZHyE',
      imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/React.js_logo.svg/2000px-React.js_logo.svg.png',
      name: 'React',
      phoneNumber: '',
    }));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle deleteContact action', () => {
    store.dispatch(deleteContact('-1'));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle transtionToEditContact action', () => {
    store.dispatch(transtionToEditContact({ id: '-1' }));
    expect(store.getActions()).toMatchSnapshot();
  });
});

import mockStore from 'redux-mock-store';
import { recieveContactList, initialize, loadData, deleteContact, transitionToEditContact,
  transitionToContactCard, changeListMode } from '../contact-list-actions';
import { initialState } from '../../reducers/contact-list-reducer';
import { CARD_MODE, LIST_MODE } from '../../constants/contact-list-mode-constants';

const store = mockStore({ contactList: initialState });

beforeEach(() => {
  store.clearActions();
});

it('should handle initialize action', () => {
  store.dispatch(initialize());
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle loadData action', () => {
  store.dispatch(loadData());
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle recieveContactList action', () => {
  store.dispatch(recieveContactList([]));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle deleteContact action', () => {
  store.dispatch(deleteContact('-1'));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle transitionToEditContact action', () => {
  store.dispatch(transitionToEditContact({
    id: '-1',
  }));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle transitionToContactCard action', () => {
  store.dispatch(transitionToContactCard({
    id: '-1',
  }));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle changeListMode action LIST_MODE', () => {
  store.dispatch(changeListMode(LIST_MODE));
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle changeListMode action CARD_MODE', () => {
  store.dispatch(changeListMode(CARD_MODE));
  expect(store.getActions()).toMatchSnapshot();
});

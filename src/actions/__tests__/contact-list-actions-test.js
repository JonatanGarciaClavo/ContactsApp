import mockStore from 'redux-mock-store';
import { recieveContactList, requestContactList, loadingContactList, deleteContact, editContact,
  loadContactCard, changeListMode } from '../contact-list-actions';
import { initialState } from '../../reducers/contact-list-reducer';
import { CARD_MODE } from '../../constants/contact-list-mode-constants';

const store = mockStore({ contactList: initialState });

beforeEach(() => {
  store.clearActions();
});

it('should handle requestContactList action', () => {
  store.dispatch(requestContactList());
  expect(store.getActions()).toMatchSnapshot();
});
it('should handle loadingContactList action', () => {
  store.dispatch(loadingContactList());
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
// it('should handle editContact action', () => {
//   store.dispatch(editContact({
//     email: 'test@test.com',
//     name: 'test',
//   }));
//   expect(store.getActions()).toMatchSnapshot();
// });
// it('should handle loadContactCard action', () => {
//   store.dispatch(loadContactCard({
//     email: 'test@test.com',
//     name: 'test',
//   }));
//   expect(store.getActions()).toMatchSnapshot();
// });
it('should handle changeListMode action', () => {
  store.dispatch(changeListMode(CARD_MODE));
  expect(store.getActions()).toMatchSnapshot();
});

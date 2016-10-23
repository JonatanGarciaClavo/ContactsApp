import mockStore from 'redux-mock-store';
import { saveContact, onContactAttributeChange, onContactAttributeBlur,
  } from '../contact-actions';
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
// it('should handle saveContact action', () => {
//   return store.dispatch(saveContact())
//     .then((result) => {
//       expect(store.getActions()).toMatchSnapshot();
//     })
//     .catch((err) => {
//       expect(store.getActions()).toMatchSnapshot();
//     })
// });

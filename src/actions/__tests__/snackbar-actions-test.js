import mockStore from 'redux-mock-store';
import { closeSnackbar, displayError } from '../snackbar-actions';
import { initialState } from '../../reducers/snackbar-reducer';

const store = mockStore({ snackbar: initialState });

describe('Test snackbar actions', () => {
  beforeEach(() => {
    store.clearActions();
  });
  it('should handle closeSnackbar action', () => {
    store.dispatch(closeSnackbar());
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle displayError no error action param action', () => {
    store.dispatch(displayError());
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle displayError js Error', () => {
    store.dispatch(displayError(new Error('Test error')));
    expect(store.getActions()).toMatchSnapshot();
  });
  it('should handle displayError string error', () => {
    store.dispatch(displayError('Test string error'));
    expect(store.getActions()).toMatchSnapshot();
  });
});

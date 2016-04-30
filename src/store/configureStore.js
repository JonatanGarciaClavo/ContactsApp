import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import contact from '../reducers/contact-reducer';
import contactList from '../reducers/contact-list-reducer';
import contactCard from '../reducers/contact-card-reducer';
import snackbar from '../reducers/snackbar-reducer';

const logger = createLogger();
const reducer = combineReducers(
  {
    contact,
    contactList,
    contactCard,
    snackbar,
  }
);

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(reducer, initialState);
}

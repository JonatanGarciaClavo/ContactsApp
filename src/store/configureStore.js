import { Iterable } from 'immutable';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import contact from '../reducers/contact-reducer';
import contactList from '../reducers/contact-list-reducer';
import contactCard from '../reducers/contact-card-reducer';
import snackbar from '../reducers/snackbar-reducer';

const logger = createLogger({
  stateTransformer: (state) => {
    const newState = {};

    Object.keys(state).forEach((i) => {
      if (Iterable.isIterable(state[i])) {
        newState[i] = state[i].toJS();
      } else {
        newState[i] = state[i];
      }
    });

    return newState;
  },
});
const sagaMiddleware = createSagaMiddleware();
const reducer = combineReducers({
  contact,
  contactList,
  contactCard,
  snackbar,
});

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  logger,
  sagaMiddleware,
);

export default function configureStore() {
  return {
    ...createStore(reducer, createStoreWithMiddleware),
    runSaga: sagaMiddleware.run,
  };
}

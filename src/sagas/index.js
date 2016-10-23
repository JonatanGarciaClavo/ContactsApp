import { fork } from 'redux-saga/effects';
import { requestContactList, requestDeleteContact } from './contact-list-saga';
import { requestContactCard, requestDeleteContactCard } from './contact-card-saga';

export default function* root() {
  yield[
    fork(requestContactList),
    fork(requestDeleteContact),
    fork(requestContactCard),
    fork(requestDeleteContactCard),
  ];
}

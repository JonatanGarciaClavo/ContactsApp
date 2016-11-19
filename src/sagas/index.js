import { fork } from 'redux-saga/effects';
import { requestContactList, requestDeleteContact } from './contact-list-saga';
import { requestContactCard, requestDeleteContactCard, requestTransitionToEditContactCard,
  } from './contact-card-saga';
import { requestSaveContact, requestContact, requestTransitionToEditContact,
	} from './contact-saga';

export default function* root() {
  yield [
    fork(requestContactList),
    fork(requestDeleteContact),
    fork(requestContactCard),
    fork(requestDeleteContactCard),
    fork(requestTransitionToEditContactCard),
    fork(requestSaveContact),
    fork(requestContact),
    fork(requestTransitionToEditContact),
  ];
}

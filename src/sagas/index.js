import { fork } from 'redux-saga/effects';
import { requestContactList, requestDeleteContact } from './contact-list-saga';
import { requestContactCard, requestDeleteContactCard, requestInitilizeContactCardFromOtherView,
  } from './contact-card-saga';
import { requestSaveContact, requestContact, requestInitilizeContactFromOtherView,
	} from './contact-saga';

export default function* root() {
  yield[
    fork(requestContactList),
    fork(requestDeleteContact),
    fork(requestContactCard),
    fork(requestDeleteContactCard),
    fork(requestInitilizeContactCardFromOtherView),
    fork(requestSaveContact),
    fork(requestContact),
    fork(requestInitilizeContactFromOtherView),
  ];
}

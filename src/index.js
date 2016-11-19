 /* eslint-disable */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { App, CreateOrEditContactPage, ListContactPage, ContactPage } from './containers';
import { About } from './components';
import rootSaga from './sagas/index';

import configureStore from './store/configureStore';

import './index.css';

injectTapEventPlugin();
const store = configureStore();
store.runSaga(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={About} />
        <Route path="/add" component={CreateOrEditContactPage} />
        <Route path="/list" component={ListContactPage} />
        <Route path="/edit/:id" component={CreateOrEditContactPage} />
        <Route path="/card/:id" component={ContactPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

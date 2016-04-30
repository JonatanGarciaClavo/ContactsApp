import Firebase from 'firebase';
import Promise from 'bluebird';
import _ from 'lodash';

const BASE_URL = 'change to firebase url';

export default {
  list() {
    const firebaseConnection = new Firebase(BASE_URL);
    return new Promise((resolve, reject) => {
      firebaseConnection.once('value', (contactsDB) => {
        const contactsDBValue = contactsDB.val();
        const contacts = [];
        _.each(contactsDBValue, (contact, id) => {
          contacts.push(Object.assign({}, contact, { id }));
        });
        return resolve(contacts);
      }, (err) => reject(err));
    });
  },
  get(id) {
    const firebaseConnection = new Firebase(`${BASE_URL}/${id}`);
    return new Promise((resolve, reject) => {
      firebaseConnection.once('value', (contactDB) => {
        const contactDBValue = contactDB.val();
        contactDBValue.id = id;
        return resolve(contactDBValue);
      }, (err) => reject(err));
    });
  },
  create(contact) {
    const firebaseConnection = new Firebase(BASE_URL);
    return new Promise((resolve, reject) => {
      firebaseConnection.push().set(contact, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve('Contact created');
      });
    });
  },
  update(contact) {
    const firebaseConnection = new Firebase(`${BASE_URL}/${contact.id}`);
    return new Promise((resolve, reject) => {
      firebaseConnection.set(_.omit(contact, 'id'), (err) => {
        if (err) {
          return reject(err);
        }
        return resolve('Contact updated');
      });
    });
  },
  delete(id) {
    const firebaseConnection = new Firebase(`${BASE_URL}/${id}`);
    return new Promise((resolve, reject) => {
      firebaseConnection.set(null, (err) => {
        if (err) {
          return reject(err);
        }
        return resolve('Contact deleted');
      });
    });
  },
}

import React from 'react';
import Immutable from 'immutable';
import ContactForm from '../ContactForm';
import { contact } from '../../../config/jest/mock-data';
import { Contact } from '../../reducers/contact-reducer';
import ContactModel from '../../models/ContactModel';

describe('Testing ContactForm component', () => {
  it('renders ContactForm using Snapshots', () => {
    const wrapper = shallow(
      <ContactForm
        contact={new Contact({
          contact: new ContactModel(contact),
          errors: new Immutable.Map(),
        })}
        onContactAttributeChange={jest.fn}
        onContactAttributeBlur={jest.fn}
        onSaveClick={jest.fn}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should summit form', () => {
    const onSave = jest.fn();
    const wrapper = shallow(
      <ContactForm
        loading={false}
        isModified
        contact={new Contact({
          contact: new ContactModel(contact),
          errors: new Immutable.Map(),
        })}
        onContactAttributeChange={jest.fn}
        onContactAttributeBlur={jest.fn}
        onSaveClick={onSave}
      />
    );
    wrapper.find({ label: 'Save contact' }).simulate('click', {
      preventDefault: jest.fn,
      stopPropagation: () => undefined,
    });
    expect(onSave).toHaveBeenCalled();
  });
});

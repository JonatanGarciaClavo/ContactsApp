import React from 'react';
import _ from 'lodash';
import ContactCard from '../ContactCard';
import { contact } from '../../../config/jest/mock-data';

describe('Testing ContactCard component', () => {
  it('renders ContactCard using Snapshots', () => {
    const wrapper = shallow(
      <ContactCard
        contact={contact}
        onEditClick={jest.fn}
        onDeleteClick={jest.fn}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders ContactCard omit phone using Snapshots', () => {
    const wrapper = shallow(
      <ContactCard
        contact={_.omit(contact, 'phoneNumber')}
        onEditClick={jest.fn}
        onDeleteClick={jest.fn}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders ContactCard omit imgUrl using Snapshots', () => {
    const wrapper = shallow(
      <ContactCard
        contact={_.omit(contact, 'imgUrl')}
        onEditClick={jest.fn}
        onDeleteClick={jest.fn}
      />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
